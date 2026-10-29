import canon from "@/data/canon-map.json";
import { searchEntity, insights, hasKey } from "./qloo";
type Signal = { source: "QLOO" | "STUB"; endpoint: string; detail: string };
// Tool registry (tool-calling shape; an LLM planner can be plugged in behind env later)
const tools = {
  qloo_search: async (a: { query: string }) => searchEntity(a.query),
  qloo_insights: async (a: { ids: string[] }) => insights(a.ids),
};
export async function runAgent(tastes: string[]) {
  const src = hasKey() ? "QLOO" : "STUB";
  const trace: { tool: string; args: unknown }[] = [];
  const signals: Signal[] = [];
  const ids: string[] = []; const tagText: string[] = [];
  for (const t of tastes.slice(0, 5)) {
    trace.push({ tool: "qloo_search", args: { query: t } });
    const r: any = await tools.qloo_search({ query: t });
    const e = r?.results?.[0];
    if (e) { ids.push(e.entity_id); tagText.push(t, e.name, ...(e.types||[]), ...((e.tags||[]).map((x:any)=>x.name)));
      signals.push({ source: src, endpoint: "GET /search", detail: `"${t}" → ${e.name} (${e.entity_id})` }); }
  }
  let affinities: any[] = [];
  if (ids.length) {
    trace.push({ tool: "qloo_insights", args: { ids } });
    try { const r: any = await tools.qloo_insights({ ids }); affinities = r?.results?.entities || []; }
    catch (err) { signals.push({ source: src, endpoint: "GET /v2/insights", detail: `error: ${(err as Error).message}` }); }
    for (const a of affinities.slice(0, 5)) { tagText.push(a.name, a.type || "");
      signals.push({ source: src, endpoint: "GET /v2/insights", detail: `affinity → ${a.name}${a.query?.affinity ? ` (${a.query.affinity})` : ""}` }); }
  }
  const hay = tagText.join(" ").toLowerCase();
  const scored = canon.clusters.map(c => ({ c, hits: c.keywords.filter(k => hay.includes(k)) })).sort((a,b)=>b.hits.length-a.hits.length);
  const best = scored[0].hits.length ? scored[0] : null;
  const entryKeys = best ? best.c.entries : [canon.fallback];
  const entries = entryKeys.map(k => (canon.entryPoints as any)[k]);
  return { mode: src, cluster: best ? best.c.label : "General (no cluster match)", matchedOn: best?.hits || [],
    entries, themes: canon.themes, signals, trace };
}
