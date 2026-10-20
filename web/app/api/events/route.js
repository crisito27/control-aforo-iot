import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

function authorizeDevice(request) {
  const auth = request.headers.get("authorization") || "";
  const expected = process.env.DEVICE_TOKEN;
  return expected && auth === `Bearer ${expected}`;
}

export async function POST(request) {
  if (!authorizeDevice(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const event = await request.json();
  if (!event.eventId || !event.deviceId || !event.type) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const db = getAdminDb();
  const ref = db.collection("organizations").doc("default")
    .collection("events").doc(event.eventId);

  await ref.set({
    ...event,
    receivedAt: new Date().toISOString()
  }, { merge: true });

  const deviceRef = db.collection("organizations").doc("default")
    .collection("devices").doc(event.deviceId);

  await deviceRef.set({
    deviceId: event.deviceId,
    occupancy: event.occupancy ?? 0,
    capacity: event.capacity ?? 0,
    status: event.status ?? "AVAILABLE",
    lastSeen: event.timestamp ?? new Date().toISOString()
  }, { merge: true });

  return NextResponse.json({ ok: true, eventId: event.eventId });
}

export async function GET(request) {
  const db = getAdminDb();
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);

  const snap = await db.collection("organizations").doc("default")
    .collection("events")
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get();

  return NextResponse.json({
    events: snap.docs.map(d => ({ id: d.id, ...d.data() }))
  });
}
