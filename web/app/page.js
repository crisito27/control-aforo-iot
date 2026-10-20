export default async function Home(){
  return (
    <main style={{fontFamily:"Arial",maxWidth:900,margin:"40px auto",padding:24}}>
      <h1>Control de Aforo IoT</h1>
      <p>Dashboard base para visualizar ocupación, capacidad, estado y eventos.</p>
      <section style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        <article><h2>Aforo actual</h2><strong>-- / --</strong></article>
        <article><h2>Estado</h2><strong>Sin conexión</strong></article>
        <article><h2>Último evento</h2><strong>--</strong></article>
      </section>
      <p style={{marginTop:32}}>Pendiente: conectar esta vista a Firestore y Firebase Authentication.</p>
    </main>
  )
}
