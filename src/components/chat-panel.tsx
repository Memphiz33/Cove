import { ArrowUp, BookOpen, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { askAgent, DEFAULT_HANDOFF, extractiveFallback } from "@/lib/ask-agent";
import { KNOWLEDGE_TYPE_LABEL } from "@/lib/knowledge";
import { isGrounded, passagesForPrompt, retrieve, groundThreshold } from "@/lib/retrieve";
import { useStudio } from "@/lib/store";
import type { Agent, ChatMessage } from "@/lib/types";
import { cn, uid } from "@/lib/utils";

type Props = {
  agent: Agent;
  channel: "widget" | "playground";
  variant?: "page" | "bubble";
  className?: string;
};

export function ChatPanel({ agent, channel, variant = "page", className }: Props) {
  const appendMessages = useStudio((s) => s.appendMessages);
  const setConversationStatus = useStudio((s) => s.setConversationStatus);
  const addKnowledge = useStudio((s) => s.addKnowledge);
  const knowledge = useStudio((s) => s.agents.find((a) => a.id === agent.id)?.knowledge ?? agent.knowledge);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const grounding = agent.grounding ?? "strict";
  const handoffLine = agent.handoffLine || DEFAULT_HANDOFF;
  const liveAgent = { ...agent, knowledge };

  useEffect(() => {
    setMessages([]);
    setConvId(null);
    setError(null);
  }, [agent.id]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  function draftSource(question: string) {
    const title = question.replace(/\?+$/, "").trim().slice(0, 80) || "Untitled source";
    const exists = knowledge.some((k) => k.title.toLowerCase() === title.toLowerCase());
    if (exists) {
      toast.message("That draft is already in Knowledge.");
      return;
    }
    addKnowledge(agent.id, {
      id: uid("k"),
      type: "faq",
      title,
      content: "",
    });
    toast.success("Drafted in Knowledge. Add the passage.");
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    setInput("");
    setError(null);

    const userMsg: ChatMessage = {
      id: uid("m"),
      role: "user",
      content: question,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPending(true);

    const citations = retrieve(liveAgent.knowledge, question);
    const grounded = isGrounded(citations, grounding);
    let assistantMsg: ChatMessage;

    if (!grounded && grounding === "strict") {
      assistantMsg = {
        id: uid("m"),
        role: "assistant",
        content: handoffLine,
        confidence: citations[0]?.score ?? 0,
        refused: true,
        createdAt: Date.now(),
      };
    } else {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const result = await askAgent({
        data: {
          agentName: agent.name,
          company: agent.company,
          role: agent.role,
          persona: agent.persona,
          passages: passagesForPrompt(citations, liveAgent.knowledge),
          history: history.slice(-6),
          question,
          grounding,
          handoffLine,
        },
      });
      const used = citations.filter((c) => c.score >= groundThreshold(grounding));
      const confidence = citations[0]?.score ?? 0.2;
      const content = result.ok && result.text ? result.text : extractiveFallback(question, citations, handoffLine);
      assistantMsg = {
        id: uid("m"),
        role: "assistant",
        content,
        citations: used.length
          ? used.map((c) => ({ title: c.title, excerpt: c.excerpt, type: c.type }))
          : undefined,
        confidence,
        refused: !grounded,
        createdAt: Date.now(),
      };
      if (!result.ok) setError(result.error);
    }

    setMessages((prev) => [...prev, assistantMsg]);
    setPending(false);
    const id = appendMessages(convId, agent.id, channel, "You", [userMsg, assistantMsg]);
    setConvId(id);
    if (assistantMsg.refused) setConversationStatus(id, "handoff");
  }

  const isBubble = variant === "bubble";

  return (
    <div
      className={cn(
        "cuve-widget flex min-h-0 flex-col overflow-hidden",
        isBubble ? "h-full" : "h-full rounded-2xl bg-card shadow-[var(--shadow-lift)]",
        className,
      )}
      data-palette={agent.widget.palette}
    >
      <header
        className={cn(
          "flex items-center gap-3 px-4 py-3",
          isBubble ? "bg-[var(--w-bg)] text-[var(--w-fg)]" : "border-b border-border",
        )}
      >
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm font-medium",
            isBubble ? "bg-[var(--w-fg)]/12" : "bg-muted",
          )}
        >
          {agent.name.slice(0, 1)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{agent.name}</p>
          <p className={cn("truncate text-xs", isBubble ? "text-[var(--w-muted)]" : "text-muted-foreground")}>
            {agent.company} · {grounding === "strict" ? "strict grounding" : "cites sources"}
          </p>
        </div>
      </header>

      <div ref={scroller} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className={cn("text-sm leading-relaxed", isBubble ? "text-[var(--w-bubble-fg)]" : "text-foreground")}>
              {agent.greeting}
            </p>
            <div className="flex flex-wrap gap-2">
              {agent.suggested.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className={cn(
                    "min-h-11 rounded-full px-3 py-1.5 text-left text-xs transition-colors duration-150",
                    isBubble
                      ? "bg-[var(--w-bg)]/8 text-[var(--w-bubble-fg)] hover:bg-[var(--w-bg)]/14"
                      : "bg-muted text-foreground hover:bg-chip",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((m, i) => (
          <MessageBubble
            key={m.id}
            message={m}
            isBubble={isBubble}
            question={m.role === "assistant" && m.refused ? messages[i - 1]?.content : undefined}
            onDraft={channel === "playground" && !isBubble ? draftSource : undefined}
          />
        ))}

        {pending ? (
          <div className="flex gap-1.5 px-1 py-2" aria-label="Thinking">
            <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
            <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
            <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="px-4 pb-1 text-[11px] text-muted-foreground">
          Live model unavailable. Answered from knowledge.
        </p>
      ) : null}

      {isBubble && agent.widget.showBranding ? (
        <p className="px-4 pb-1 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Powered by Cuve
        </p>
      ) : null}

      <form
        className="flex items-end gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder="Ask anything it should know…"
          className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform duration-150 active:scale-[0.96] disabled:opacity-40"
          aria-label="Send"
        >
          <ArrowUp className="size-4" />
        </button>
      </form>
    </div>
  );
}

function MessageBubble({
  message,
  isBubble,
  question,
  onDraft,
}: {
  message: ChatMessage;
  isBubble: boolean;
  question?: string;
  onDraft?: (question: string) => void;
}) {
  const mine = message.role === "user";
  const pct = typeof message.confidence === "number" ? Math.round(message.confidence * 100) : null;
  return (
    <div className={cn("flex flex-col gap-1.5", mine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          mine
            ? isBubble
              ? "rounded-br-md bg-[var(--w-user)] text-[var(--w-user-fg)]"
              : "rounded-br-md bg-primary text-primary-foreground"
            : isBubble
              ? "rounded-bl-md bg-[var(--w-bubble)] text-[var(--w-bubble-fg)] shadow-[var(--shadow-border)]"
              : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
      {!mine && (message.citations?.length || pct !== null || message.refused) ? (
        <div className="max-w-[92%] space-y-1.5">
          {message.refused ? (
            <p className="text-[11px] font-medium text-warning">Handoff, not in sources</p>
          ) : pct !== null ? (
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="h-1 w-16 overflow-hidden rounded-full bg-border">
                <span
                  className={cn("block h-full rounded-full", pct >= 70 ? "bg-success" : "bg-warning")}
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="tabular-nums">{pct}% grounded</span>
            </div>
          ) : null}
          {message.citations?.map((c) => (
            <div key={c.title} className="rounded-lg border border-border bg-card px-2.5 py-2 text-[11px] leading-snug">
              <p className="flex items-center gap-1 font-medium text-foreground">
                <BookOpen className="size-3" />
                {c.type ? `${KNOWLEDGE_TYPE_LABEL[c.type]} · ` : ""}
                {c.title}
              </p>
              <p className="mt-0.5 text-muted-foreground">{c.excerpt}</p>
            </div>
          ))}
          {message.refused && onDraft && question ? (
            <button
              type="button"
              onClick={() => onDraft(question)}
              className="inline-flex h-9 items-center gap-1 rounded-full bg-muted px-3 text-[11px] font-medium hover:bg-chip"
            >
              <Plus className="size-3" />
              Draft a source
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
