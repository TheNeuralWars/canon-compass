import Compass from "./compass";
export const dynamic = "force-dynamic";
export default function Home() {
  const live = !!process.env.QLOO_API_KEY;
  return <main>
    <h1>🧭 Canon Compass</h1>
    <p>Tell us your films, books, games and music. Qloo's taste graph finds your affinities; we map them to the best entry point into <b>The Neural Wars / Fractured Code</b> (public Chapter 1 only, no spoilers).</p>
    {!live && <div style={{ border: "1px solid #f5a524", padding: 12, borderRadius: 8, color: "#f5a524" }}>
      ⏳ Waiting for Qloo API key. Running in <b>STUB demo mode</b>: every signal below is a FAKE fixture labeled STUB. Without Qloo, there's no real recommendation.</div>}
    <Compass live={live} />
  </main>;
}
