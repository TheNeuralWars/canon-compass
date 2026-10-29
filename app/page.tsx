import Compass from "./compass";
export const dynamic = "force-dynamic";
export default function Home() {
  const live = !!process.env.QLOO_API_KEY;
  return <main>
    <h1>🧭 <span>Canon Compass</span></h1>
    <p className="sub">Tell us the films, books, games and music you love. Qloo's cultural affinity graph finds what your taste connects to, and our agent maps it to the best way into <b>The Neural Wars / Fractured Code</b>. Chapter 1 is public, and there are no spoilers.</p>
    {live
      ? <div className="banner ok">● LIVE: every signal below comes from the Qloo Hackathon API, called just now.</div>
      : <div className="banner">⏳ <b>Waiting for the hackathon Qloo API key.</b> Running in STUB demo mode: every signal below is a FAKE fixture shaped like a Qloo response and labeled <code>STUB</code>. The live path is already built. Setting <code>QLOO_API_KEY</code> switches it on with no code change.</div>}
    <div className="steps">
      <div className="step"><b>1 · Resolve</b><code>GET /search</code> turns each taste into a Qloo entity</div>
      <div className="step"><b>2 · Affinities</b><code>GET /v2/insights</code> pulls cross-domain affinities</div>
      <div className="step"><b>3 · Map</b>The agent scores the signals against a curated canon map and cites each one</div>
    </div>
    <Compass live={live} />
    <footer>MIT · <a href="https://github.com/TheNeuralWars/canon-compass">source</a> · Built for the Qloo Agentic Hackathon · No personal data is stored</footer>
  </main>;
}
