import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStudio } from "@/lib/store";
import type { Conversation, ConversationStatus } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

const FILTERS: { id: "all" | ConversationStatus | "leads"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "handoff", label: "Handoff" },
  { id: "resolved", label: "Resolved" },
  { id: "leads", label: "Leads" },
];

export function InboxView({ agentId }: { agentId: string }) {
  const conversations = useStudio((s) => s.conversations);
  const setStatus = useStudio((s) => s.setConversationStatus);
  const mine = useMemo(
    () => conversations.filter((c) => c.agentId === agentId).sort((a, b) => b.updatedAt - a.updatedAt),
    [conversations, agentId],
  );
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [activeId, setActiveId] = useState<string | null>(mine[0]?.id ?? null);

  const visible = mine.filter((c) => {
    if (filter === "all") return true;
    if (filter === "leads") return Boolean(c.leadEmail);
    return c.status === filter;
  });
  const active = mine.find((c) => c.id === activeId) ?? visible[0] ?? null;

  return (
    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="flex min-h-0 flex-col rounded-2xl bg-card shadow-[var(--shadow-border)]">
        <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-9 shrink-0 rounded-full px-3 text-xs font-medium",
                filter === f.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {visible.length === 0 ? (
            <p className="px-3 py-10 text-sm text-muted-foreground">Nothing in this filter.</p>
          ) : (
            visible.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "mb-1 w-full rounded-xl px-3 py-3 text-left",
                  active?.id === c.id ? "bg-muted" : "hover:bg-muted/50",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{c.visitor}</p>
                  <StatusChip status={c.status} />
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {c.messages[c.messages.length - 1]?.content}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {c.channel} · {formatTime(c.updatedAt)}
                  {c.leadEmail ? ` · ${c.leadEmail}` : ""}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-col rounded-2xl bg-card shadow-[var(--shadow-border)]">
        {active ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">{active.visitor}</p>
                <p className="text-xs text-muted-foreground">
                  {active.leadEmail ?? "No email captured"} · {active.sentiment}
                </p>
              </div>
              <div className="flex gap-2">
                {(["open", "handoff", "resolved"] as ConversationStatus[]).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={active.status === s ? "default" : "secondary"}
                    onClick={() => setStatus(active.id, s)}
                  >
                    {s === "open" ? "Open" : s === "handoff" ? "Handoff" : "Resolved"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {active.messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted",
                    )}
                  >
                    {m.content}
                    {m.role === "assistant" && m.refused ? (
                      <p className="mt-2 text-[11px] font-medium text-warning">Handoff, not in sources</p>
                    ) : null}
                    {m.citations?.length ? (
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        Cited {m.citations.map((c) => c.title).join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Conversations from the playground and widget land here, including captured emails.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: Conversation["status"] }) {
  const variant = status === "resolved" ? "success" : status === "handoff" ? "warn" : "accent";
  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}
