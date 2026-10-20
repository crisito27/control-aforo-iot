"use client";
import { useState } from "react";
import Nav from "@/components/Nav";

export default function Configuration() {
  const [capacity,setCapacity]=useState(20);
  const [distance,setDistance]=useState(60);
  const [interval,setInterval]=useState(500);
  const [message,setMessage]=useState("");

  async function save(e){
    e.preventDefault();
    const secret=prompt("Ingresa ADMIN_API_SECRET");
    const r=await fetch("/api/config",{method:"PUT",headers:{"Content-Type":"application/json","x-admin-secret":secret||""},
      body:JSON.stringify({capacity,detectionDistance:distance,sampleIntervalMs:interval})});
    setMessage(r.ok?"Configuración guardada":"No fue posible guardar");
  }

  return (
    <main style={{fontFamily:"Arial",maxWidth:700,margin:"0 auto",padding:24}}>
      <h1>Configuración</h1><Nav />
      <form onSubmit={save} style={{display:"grid",gap:12}}>
        <label>Capacidad máxima <input type="number" value={capacity} onChange={e=>setCapacity(Number(e.target.value))}/></label>
        <label>Distancia de detección (cm) <input type="number" value={distance} onChange={e=>setDistance(Number(e.target.value))}/></label>
        <label>Intervalo de muestreo (ms) <input type="number" value={interval} onChange={e=>setInterval(Number(e.target.value))}/></label>
        <button type="submit">Guardar</button>
        <p>{message}</p>
      </form>
    </main>
  );
}
