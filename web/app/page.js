import Nav from "@/components/Nav";

async function getEvents() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const r = await fetch(`${base}/api/events?limit=20`, { cache: "no-store" });
    if (!r.ok) return [];
    const data = await r.json();
    return data.events || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();
  const latest = events[0];
  const occupancy = latest?.occupancy ?? 0;
  const capacity = latest?.capacity ?? 20;
  const status = latest?.status ?? "SIN DATOS";

  return (
    <main style={{fontFamily:"Arial",maxWidth:1000,margin:"0 auto",padding:24}}>
      <h1>Control de Aforo IoT</h1>
      <Nav />
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
        <article style={{border:"1px solid #ddd",padding:16,borderRadius:12}}>
          <h2>Aforo actual</h2><strong>{occupancy} / {capacity}</strong>
        </article>
        <article style={{border:"1px solid #ddd",padding:16,borderRadius:12}}>
          <h2>Estado</h2><strong>{status}</strong>
        </article>
        <article style={{border:"1px solid #ddd",padding:16,borderRadius:12}}>
          <h2>Último evento</h2><strong>{latest?.type || "--"}</strong>
        </article>
      </section>

      <h2 style={{marginTop:32}}>Últimos eventos</h2>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Fecha</th><th align="left">Tipo</th><th>Aforo</th><th>Estado</th></tr></thead>
        <tbody>
          {events.map(e => (
            <tr key={e.id}>
              <td>{e.timestamp}</td><td>{e.type}</td><td align="center">{e.occupancy}/{e.capacity}</td><td>{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
