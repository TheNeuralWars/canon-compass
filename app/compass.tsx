"use client";
import { useState } from "react";
const EXAMPLES = ["Blade Runner, Neuromancer, Deus Ex", "Dune, Foundation, The Three-Body Problem", "Mass Effect, NieR: Automata, Halo", "The Matrix, Ghost in the Shell, Radiohead"];
export default function Compass({ live }: { live: boolean }) {
  const [t, setT] = useState(EXAMPLES[0]); const [r, setR] = useState<any>(null); const [busy, setBusy] = useState(false);
  async function go() { setBusy(true); setR(null);
    try { const res = await fetch("/api/recommend", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tastes: t }) }); setR(await res.json()); }
    catch (e) { setR({ error: String(e) }); } setBusy(false); }
  const stub = r?.mode === "STUB";
  return <>
    <section className="card">
      <label htmlFor="t" style={{ fontWeight: 600 }}>Your tastes (comma-separated)</label>
      <textarea id="t" value={t} onChange={e => setT(e.target.value)} rows={3} style={{ marginTop: 8 }} />
      <div className="chips">{EXAMPLES.map(x => <button key={x} className="chip" onClick={() => setT(x)}>{x}</button>)}</div>
      <button className="go" onClick={go} disabled={busy}>{busy ? (live ? "Consulting Qloo…" : "Running stub agent…") : "Find my entry point →"}</button>
    </section>
    {r?.error && <div className="card" style={{ color: "salmon" }}>{r.error}</div>}
    {r?.entries && <>
      <section className="card">
        <span className={`tag ${stub ? "stub" : "live"}`}>{stub ? "STUB fixtures" : "LIVE Qloo"}</span>
        <h2 style={{ margin: "10px 0 4px" }}>{stub ? "[STUB] " : ""}{r.cluster}</h2>
        {r.matchedOn.length > 0 && <p className="sub" style={{ margin: 0 }}>Matched on: {r.matchedOn.join(", ")}</p>}
        {r.entries.map((e: any, i: number) => <a key={e.title} className="entry" href={e.url} target="_blank" rel="noreferrer"><b>{i === 0 ? "Start here: " : "Then: "}{e.title}</b><br /><span className="sub">{e.why}</span></a>)}
        <p style={{ marginTop: 12 }}>{r.themes.map((x: string) => <span key={x} className="tag">{x}</span>)}</p>
      </section>
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Why: cited signals <span className={`tag ${stub ? "stub" : "live"}`}>{r.mode}</span></h3>
        <ul>{r.signals.map((s: any, i: number) => <li key={i}><code>[{s.source}] {s.endpoint}</code> {s.detail}</li>)}</ul>
        <h3>Agent trace (tool calls)</h3>
        <ol className="trace">{r.trace.map((s: any, i: number) => <li key={i}><code>{s.tool}({JSON.stringify(s.args)})</code></li>)}</ol>
      </section>
    </>}
  </>;
}
