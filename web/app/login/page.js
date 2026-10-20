"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import Nav from "@/components/Nav";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [message,setMessage]=useState("");
  async function submit(e){
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,password);
      setMessage("Sesión iniciada correctamente");
    }catch(err){ setMessage("No fue posible iniciar sesión"); }
  }
  return (
    <main style={{fontFamily:"Arial",maxWidth:500,margin:"0 auto",padding:24}}>
      <h1>Login</h1><Nav />
      <form onSubmit={submit} style={{display:"grid",gap:12}}>
        <input placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Ingresar</button>
        <p>{message}</p>
      </form>
    </main>
  );
}
