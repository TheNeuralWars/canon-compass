import { runAgent } from "@/lib/agent";
export async function POST(req: Request) {
  const { tastes } = await req.json();
  const list = String(tastes || "").split(/[,\n]/).map(s => s.trim()).filter(Boolean);
  if (!list.length) return Response.json({ error: "Enter at least one taste" }, { status: 400 });
  try { return Response.json(await runAgent(list)); }
  catch (e) { return Response.json({ error: (e as Error).message }, { status: 502 }); }
}
export async function GET() { return Response.json({ live: !!process.env.QLOO_API_KEY }); }
