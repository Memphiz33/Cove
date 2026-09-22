# Cuve

The support agent that cites its sources. If it cannot cite, it hands off.

Train Cuve on FAQs, policies, products, and procedures. Every reply shows the passage it used. Strict grounding skips the language model when retrieval is weak.

## Studio

- Playground with citation receipts and grounded scores
- Knowledge editor (FAQ, policy, product, doc, procedure)
- Ship score before you embed
- Gaps from refused questions, drafted as sources
- Live widget studio, inbox, and analytics

Seeded agents: **Cuve**, **Northline** (apparel), **Lumen** (sales).

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

Auth and database are off in this demo. Conversations persist in the browser. Answers use Grok when `XAI_API_KEY` is set on the server.
