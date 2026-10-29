# Canon Compass

A taste-aware lore agent for the **Qloo Agentic Hackathon**. Enter cultural tastes → Qloo resolves entities (`GET /search`) and affinities (`GET /v2/insights`) → the agent maps them to the best public entry point in *The Neural Wars / Fractured Code* canon (Chapter 1 only, spoiler-free). Every recommendation cites its Qloo signal.

## Setup
```bash
npm install
cp .env.example .env.local   # set QLOO_API_KEY=...
npm run dev
```
- Hackathon base URL: `https://hackathon.api.qloo.com` (auth header `X-Api-Key`)
- No key → **STUB demo mode**: banner "Waiting for Qloo API key", all signals are FAKE fixtures labeled `STUB`.

## Structure
- `lib/qloo.ts`: Qloo client (live or stub)
- `lib/agent.ts`: tool-calling agent loop (`qloo_search`, `qloo_insights`) + canon mapping
- `data/canon-map.json`: public-safe entry points and taste clusters
- `app/api/recommend`: POST `{tastes}` endpoint

## Deploy
Import into Vercel and set `QLOO_API_KEY` as an env var. No secrets are committed.

MIT licensed.
