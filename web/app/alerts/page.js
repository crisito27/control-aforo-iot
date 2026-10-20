import Nav from "@/components/Nav";

async function getEvents() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const r = await fetch(`${base}/api/events?limit=200`, { cache:"no-store" });
    if (!r.ok) return [];
    return (await r.json()).events || [];
  } catch { return []; }
}

export default async function Alerts() {
  const alerts = (await getEvents()).filter(e => e.status === "WARNING" || e.status === "FULL");
  return (
    <main style={{fontFamily:"Arial",maxWidth:1000,margin:"0 auto",padding:24}}>
      <h1>Alertas</h1><Nav />
      {alerts.length===0 ? <p>No hay alertas registradas.</p> :
        <ul>{alerts.map(a=><li key={a.id}>{a.timestamp} — {a.status} — aforo {a.occupancy}/{a.capacity}</li>)}</ul>}
    </main>
  );
}
