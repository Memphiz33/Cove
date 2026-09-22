import type { Conversation } from "./types";

export function agentStats(agentId: string, conversations: Conversation[]) {
  const convs = conversations.filter((c) => c.agentId === agentId);
  const confidences = convs
    .flatMap((c) => c.messages)
    .filter((m) => m.role === "assistant" && typeof m.confidence === "number")
    .map((m) => m.confidence ?? 0);
  const avg =
    confidences.length === 0
      ? 0
      : confidences.reduce((a, b) => a + b, 0) / confidences.length;
  return {
    total: convs.length,
    open: convs.filter((c) => c.status === "open").length,
    handoff: convs.filter((c) => c.status === "handoff").length,
    resolved: convs.filter((c) => c.status === "resolved").length,
    leads: convs.filter((c) => c.leadEmail).length,
    avgConfidence: avg,
  };
}

export function workspaceStats(conversations: Conversation[]) {
  return {
    total: conversations.length,
    open: conversations.filter((c) => c.status === "open").length,
    leads: conversations.filter((c) => c.leadEmail).length,
  };
}
