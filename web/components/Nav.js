import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{display:"flex",gap:16,padding:"14px 0",flexWrap:"wrap"}}>
      <Link href="/">Dashboard</Link>
      <Link href="/history">Históricos</Link>
      <Link href="/alerts">Alertas</Link>
      <Link href="/configuration">Configuración</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
