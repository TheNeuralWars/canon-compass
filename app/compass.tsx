"use client";
import { useState } from "react";
export default function Compass({ live }: { live: boolean }) {
  const [t, setT] = useState("Blade Runner, Neuromancer, Deus Ex"); const [r, setR] = useState<any>(null); const [busy, setBusy] = useState(false);
  async function go() { setBusy(true); const res = await fetch("/api/recommend", { method: "POST", body: JSON.stringify({ tastes: t }) }); setR(await res.json()); setBusy(false); }
  return <section style={{ marginTop: 20 }}>
    <textarea value={t} onChange={e => setT(e.target.value)} rows={3} style={{ width: "100%" }} />
    <button onClick={go} disabled={busy}>{busy ? "Consulting Qloo…" : "Find my entry point"}</button>
    {r?.error && <p style={{ color: "salmon" }}>{r.error}</p>}
    {r?.entries && <div>
      <h2>{r.mode === "STUB" ? "[STUB] " : ""}Your cluster: {r.cluster}</h2>
      {r.entries.map((e: any) => <p key={e.title}><a href={e.url} style={{ color: "#7cc4ff" }}>{e.title}</a> — {e.why}</p>)}
      <p>Themes: {r.themes.join(" · ")}</p>
      <h3>Cited signals ({r.mode})</h3>
      <ul>{r.signals.map((s: any, i: number) => <li key={i}><code>[{s.source}] {s.endpoint}</code> {s.detail}</li>)}</ul>
      {r.matchedOn.length > 0 && <p>Matched on: {r.matchedOn.join(", ")}</p>}
    </div>}
  </section>;
}
