import { stubSearch, stubInsights } from "./fixtures";
const BASE = process.env.QLOO_BASE_URL || "https://hackathon.api.qloo.com";
export const hasKey = () => !!process.env.QLOO_API_KEY;
async function get(path: string, params: Record<string, string>) {
  const url = `${BASE}${path}?${new URLSearchParams(params)}`;
  const r = await fetch(url, { headers: { "X-Api-Key": process.env.QLOO_API_KEY! }, cache: "no-store" });
  if (!r.ok) throw new Error(`Qloo ${path} ${r.status}`);
  return r.json();
}
export async function searchEntity(query: string) {
  if (!hasKey()) return stubSearch(query);
  return get("/search", { query, take: "1" });
}
export async function insights(entityIds: string[], type = "urn:entity:book") {
  if (!hasKey()) return stubInsights(entityIds);
  return get("/v2/insights", { "filter.type": type, "signal.interests.entities": entityIds.join(","), take: "5" });
}
