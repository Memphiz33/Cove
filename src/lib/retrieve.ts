import type { Citation, GroundingMode, KnowledgeItem, KnowledgeType } from "./types";

export function groundThreshold(mode: GroundingMode = "strict"): number {
  return mode === "assist" ? 0.32 : 0.45;
}

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "is",
  "it",
  "do",
  "you",
  "we",
  "i",
  "my",
  "me",
  "your",
  "with",
  "at",
  "be",
  "this",
  "that",
  "are",
  "was",
  "can",
  "how",
  "what",
  "when",
  "who",
  "if",
  "does",
  "did",
  "have",
  "has",
  "will",
  "just",
  "about",
  "between",
  "from",
  "into",
  "than",
]);
function stem(token: string): string {
  if (token.endsWith("ing") && token.length > 6) return token.slice(0, -3);
  if (token.endsWith("ies") && token.length > 5) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ers") && token.length > 5) return token.slice(0, -1);
  if (token.endsWith("es") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 3 && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

export function retrieve(knowledge: KnowledgeItem[], query: string, k = 3): Citation[] {
  const q = tokenize(query);
  if (q.length === 0 || knowledge.length === 0) return [];

  const qLower = query.toLowerCase();
  const scored = knowledge.map((item) => {
    const titleToks = tokenize(item.title);
    const bodyToks = tokenize(item.content);
    const titleSet = new Set(titleToks);
    const bodySet = new Set(bodyToks);
    let raw = 0;
    let titleHits = 0;
    let bodyHits = 0;
    for (const t of q) {
      if (titleSet.has(t)) {
        raw += 3.5;
        titleHits += 1;
      }
      if (bodySet.has(t)) {
        raw += 1;
        bodyHits += 1;
      }
    }
    for (let i = 0; i < q.length - 1; i++) {
      const bigram = `${q[i]} ${q[i + 1]}`;
      if (item.title.toLowerCase().includes(bigram)) raw += 2;
      if (item.content.toLowerCase().includes(bigram)) raw += 1.2;
    }
    const titleLower = item.title.toLowerCase();
    if (titleLower && qLower.includes(titleLower)) raw += 4;
    if (item.type === "policy" && /(return|refund|ship|repair|sso|price|plan)/.test(qLower)) raw += 0.6;
    if (item.type === "procedure" && /(late|handle|step|order)/.test(qLower)) raw += 0.6;
    const excerpt = excerptAround(item.content, q);
    return {
      title: item.title,
      type: item.type,
      excerpt,
      raw,
      coverage: q.length === 0 ? 0 : (titleHits + bodyHits) / q.length,
    };
  });

  scored.sort((a, b) => b.raw - a.raw);
  const top = scored.filter((s) => s.raw > 0).slice(0, k);
  if (top.length === 0) return [];

  const max = Math.max(...top.map((t) => t.raw), 1);
  const queryWeight = q.length * 4.5;

  return top.map((t) => {
    const abs = Math.min(1, t.raw / Math.max(queryWeight, 1));
    const rel = t.raw / max;
    const score = Math.min(0.99, 0.08 + 0.72 * abs + 0.12 * rel + 0.08 * Math.min(1, t.coverage));
    return {
      title: t.title,
      excerpt: t.excerpt,
      score,
      type: t.type as KnowledgeType,
    };
  });
}

function excerptAround(content: string, queryTokens: string[]): string {
  const lower = content.toLowerCase();
  let idx = -1;
  for (const t of queryTokens) {
    const i = lower.indexOf(t);
    if (i >= 0) {
      idx = i;
      break;
    }
  }
  if (idx < 0) {
    return content.slice(0, 160).trim() + (content.length > 160 ? "…" : "");
  }
  const start = Math.max(0, idx - 40);
  const end = Math.min(content.length, idx + 140);
  const slice = content.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${slice}${end < content.length ? "…" : ""}`;
}

export function passagesForPrompt(citations: Citation[], knowledge: KnowledgeItem[]): string {
  return citations
    .map((c, i) => {
      const full = knowledge.find((k) => k.title === c.title)?.content ?? c.excerpt;
      const kind = c.type ? `${c.type} · ` : "";
      return `[${i + 1}] ${kind}${c.title}\n${full}`;
    })
    .join("\n\n");
}

export function isGrounded(citations: Citation[], mode: GroundingMode = "strict"): boolean {
  const top = citations[0]?.score ?? 0;
  return citations.length > 0 && top >= groundThreshold(mode);
}
