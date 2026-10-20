import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

function deviceAuth(request) {
  const auth = request.headers.get("authorization") || "";
  const expected = process.env.DEVICE_TOKEN;
  return expected && auth === `Bearer ${expected}`;
}

export async function GET(request) {
  if (!deviceAuth(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const db = getAdminDb();
  const ref = db.collection("organizations").doc("default")
    .collection("configuration").doc("aforo-pi-01");
  const snap = await ref.get();
  return NextResponse.json(snap.exists ? snap.data() : {
    capacity: 20,
    detectionDistance: 60,
    sampleIntervalMs: 500
  });
}

export async function PUT(request) {
  const adminSecret = request.headers.get("x-admin-secret");
  if (!process.env.ADMIN_API_SECRET || adminSecret !== process.env.ADMIN_API_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const config = {
    capacity: Number(body.capacity ?? 20),
    detectionDistance: Number(body.detectionDistance ?? 60),
    sampleIntervalMs: Number(body.sampleIntervalMs ?? 500),
    updatedAt: new Date().toISOString()
  };
  const db = getAdminDb();
  await db.collection("organizations").doc("default")
    .collection("configuration").doc("aforo-pi-01")
    .set(config, { merge: true });
  return NextResponse.json({ ok: true, config });
}
