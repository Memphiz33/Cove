import type { Agent, Conversation } from "./types";

export type KnowledgeGap = {
  question: string;
  count: number;
};

export function knowledgeGaps(agent: Agent, conversations: Conversation[]): KnowledgeGap[] {
  const mine = conversations.filter((c) => c.agentId === agent.id);
  const counts = new Map<string, number>();
  for (const conv of mine) {
    for (let i = 0; i < conv.messages.length; i++) {
      const msg = conv.messages[i];
      if (msg.role !== "assistant" || !msg.refused) continue;
      const prev = conv.messages[i - 1];
      if (prev?.role !== "user") continue;
      const question = prev.content.trim();
      if (!question) continue;
      counts.set(question, (counts.get(question) ?? 0) + 1);
    }
  }
  const existing = new Set(agent.knowledge.map((k) => k.title.trim().toLowerCase()));
  return [...counts.entries()]
    .map(([question, count]) => ({ question, count }))
    .filter((g) => !existing.has(g.question.toLowerCase()))
    .sort((a, b) => b.count - a.count);
}
