// STUB FIXTURES — FAKE data shaped like Qloo responses. Not real Qloo signals.
export const STUB = true;
export function stubSearch(q: string) {
  return { _stub: "STUB — FAKE fixture, not a Qloo response", results: [
    { entity_id: `STUB-${q.toLowerCase().replace(/\W+/g,"-")}`, name: q, types: ["urn:entity:movie"], tags: [{ name: "science fiction" }, { name: "cyberpunk" }] } ] };
}
export function stubInsights(ids: string[]) {
  return { _stub: "STUB — FAKE fixture, not a Qloo response", success: true, results: { entities: [
    { entity_id: "STUB-neuromancer", name: "Neuromancer", type: "urn:entity:book", query: { affinity: 0.91 } },
    { entity_id: "STUB-deus-ex", name: "Deus Ex", type: "urn:entity:videogame", query: { affinity: 0.84 } },
    { entity_id: "STUB-ghost-in-the-shell", name: "Ghost in the Shell", type: "urn:entity:movie", query: { affinity: 0.88 } } ] }, _seed: ids };
}
