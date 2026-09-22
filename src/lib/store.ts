import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_AGENTS, SEED_CONVERSATIONS } from "./seed";
import type { Agent, ChatMessage, Conversation, KnowledgeItem } from "./types";
import { extractEmail, uid } from "./utils";

type StudioState = {
  agents: Agent[];
  conversations: Conversation[];
  hydrated: boolean;
  setHydrated: () => void;
  resetDemo: () => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, patch: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  addKnowledge: (agentId: string, item: KnowledgeItem) => void;
  updateKnowledge: (agentId: string, itemId: string, patch: Partial<KnowledgeItem>) => void;
  removeKnowledge: (agentId: string, itemId: string) => void;
  appendMessages: (
    conversationId: string | null,
    agentId: string,
    channel: "widget" | "playground",
    visitor: string,
    messages: ChatMessage[],
  ) => string;
  setConversationStatus: (id: string, status: Conversation["status"]) => void;
};

const empty = (): Pick<StudioState, "agents" | "conversations"> => ({
  agents: structuredClone(SEED_AGENTS),
  conversations: structuredClone(SEED_CONVERSATIONS),
});

export const useStudio = create<StudioState>()(
  persist(
    (set, get) => ({
      ...empty(),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      resetDemo: () => set({ ...empty(), hydrated: true }),
      addAgent: (agent) => set({ agents: [agent, ...get().agents] }),
      updateAgent: (id, patch) =>
        set({
          agents: get().agents.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        }),
      removeAgent: (id) =>
        set({
          agents: get().agents.filter((a) => a.id !== id),
          conversations: get().conversations.filter((c) => c.agentId !== id),
        }),
      addKnowledge: (agentId, item) =>
        set({
          agents: get().agents.map((a) =>
            a.id === agentId ? { ...a, knowledge: [item, ...a.knowledge] } : a,
          ),
        }),
      updateKnowledge: (agentId, itemId, patch) =>
        set({
          agents: get().agents.map((a) =>
            a.id === agentId
              ? {
                  ...a,
                  knowledge: a.knowledge.map((k) => (k.id === itemId ? { ...k, ...patch } : k)),
                }
              : a,
          ),
        }),
      removeKnowledge: (agentId, itemId) =>
        set({
          agents: get().agents.map((a) =>
            a.id === agentId ? { ...a, knowledge: a.knowledge.filter((k) => k.id !== itemId) } : a,
          ),
        }),
      appendMessages: (conversationId, agentId, channel, visitor, messages) => {
        const email = messages.map((m) => extractEmail(m.content)).find(Boolean);
        if (conversationId) {
          set({
            conversations: get().conversations.map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    messages: [...c.messages, ...messages],
                    updatedAt: Date.now(),
                    leadEmail: email ?? c.leadEmail,
                    status: "open",
                  }
                : c,
            ),
          });
          return conversationId;
        }
        const id = uid("conv");
        const conv: Conversation = {
          id,
          agentId,
          visitor,
          channel,
          status: "open",
          sentiment: "neutral",
          leadEmail: email ?? undefined,
          messages,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set({ conversations: [conv, ...get().conversations] });
        return id;
      },
      setConversationStatus: (id, status) =>
        set({
          conversations: get().conversations.map((c) => (c.id === id ? { ...c, status } : c)),
        }),
    }),
    {
      name: "cove-studio-v4",
      skipHydration: true,
      partialize: (s) => ({ agents: s.agents, conversations: s.conversations }),
    },
  ),
);

export function useAgent(id: string | undefined): Agent | undefined {
  return useStudio((s) => s.agents.find((a) => a.id === id));
}
