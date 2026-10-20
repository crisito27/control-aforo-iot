import Nav from "@/components/Nav";

async function getEvents() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const r = await fetch(`${base}/api/events?limit=200`, { cache: "no-store" });
    if (!r.ok) return [];
    return (await r.json()).events || [];
  } catch { return []; }
}

export default async function History() {
  const events = await getEvents();
  return (
    <main style={{fontFamily:"Arial",maxWidth:1000,margin:"0 auto",padding:24}}>
      <h1>Históricos</h1><Nav />
      <p>Eventos almacenados en Firestore.</p>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Timestamp</th><th align="left">Tipo</th><th>Aforo</th><th align="left">Estado</th></tr></thead>
        <tbody>{events.map(e=><tr key={e.id}><td>{e.timestamp}</td><td>{e.type}</td><td align="center">{e.occupancy}</td><td>{e.status}</td></tr>)}</tbody>
      </table>
    </main>
  );
}
