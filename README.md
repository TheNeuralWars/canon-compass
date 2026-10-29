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

## How it works (for judges)
1. **Resolve**: each taste goes to `GET /search` and comes back as a Qloo entity id.
2. **Affinities**: the resolved ids go to `GET /v2/insights` (`signal.interests.entities`) and return cross-domain affinities.
3. **Map**: the agent scores entity names, tags and affinities against `data/canon-map.json` clusters and returns the entry point, the reading order, the themes, **cited signals**, and the full **tool-call trace**.

### Modes
| Env | Behavior |
|---|---|
| no `QLOO_API_KEY` | STUB mode with an amber banner. Fixtures are labeled `STUB` and are never presented as Qloo data |
| `QLOO_API_KEY` (+ optional `QLOO_BASE_URL`) | LIVE mode with a green banner. Real Qloo calls; no code change needed |

`GET /api/recommend` returns `{live:boolean}` for a quick health check.
