import { NextResponse } from "next/server";

export async function POST(request){
  const auth=request.headers.get("authorization")||"";
  const expected=process.env.DEVICE_TOKEN;
  if(!expected || auth!==`Bearer ${expected}`) return NextResponse.json({error:"unauthorized"},{status:401});
  const event=await request.json();
  if(!event.eventId || !event.deviceId || !event.type) return NextResponse.json({error:"invalid payload"},{status:400});

  // TODO: inicializar firebase-admin y persistir usando eventId como ID
  // para que los reintentos desde SQLite sean idempotentes.
  return NextResponse.json({ok:true,eventId:event.eventId});
}
