# STATUS
- [x] Scaffold, stub mode, agent loop, canon map, build passing
- [ ] Add live key: `QLOO_API_KEY` in `.env.local`; verify `/search` response shape (`results[].entity_id`) and `/v2/insights` params (`filter.type`, `signal.interests.entities`) against the hackathon docs; adjust `lib/agent.ts` parsing if needed
- [ ] Query insights for several types (book, movie, videogame) and merge
- [ ] Optional LLM narration behind `OPENAI_API_KEY`
- [ ] Vercel: `vercel link && vercel env add QLOO_API_KEY production && vercel --prod`
- [ ] Confirm the real Ch.1 sample URL on goalworld.fun and update `data/canon-map.json`
