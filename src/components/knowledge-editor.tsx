import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { LaunchCard } from "@/components/launch-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { knowledgeGaps } from "@/lib/gaps";
import { KNOWLEDGE_TYPE_LABEL, KNOWLEDGE_TYPES } from "@/lib/knowledge";
import { useStudio } from "@/lib/store";
import type { Agent, KnowledgeItem, KnowledgeType } from "@/lib/types";
import { cn, uid } from "@/lib/utils";

export function KnowledgeEditor({ agent }: { agent: Agent }) {
  const addKnowledge = useStudio((s) => s.addKnowledge);
  const updateKnowledge = useStudio((s) => s.updateKnowledge);
  const removeKnowledge = useStudio((s) => s.removeKnowledge);
  const conversations = useStudio((s) => s.conversations);
  const [filter, setFilter] = useState<KnowledgeType | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(agent.knowledge[0]?.id ?? null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const items = useMemo(
    () => (filter === "all" ? agent.knowledge : agent.knowledge.filter((k) => k.type === filter)),
    [agent.knowledge, filter],
  );
  const selected = agent.knowledge.find((k) => k.id === selectedId) ?? null;
  const gaps = useMemo(() => knowledgeGaps(agent, conversations).slice(0, 5), [agent, conversations]);

  function addNew(prefill?: { title: string }) {
    const item: KnowledgeItem = {
      id: uid("k"),
      type: filter === "all" ? "faq" : filter,
      title: prefill?.title ?? "Untitled source",
      content: "",
    };
    addKnowledge(agent.id, item);
    setSelectedId(item.id);
    if (prefill) toast.success("Drafted. Write the passage this agent is allowed to cite.");
  }

  function remove(id: string) {
    if (confirmId !== id) {
      setConfirmId(id);
      return;
    }
    removeKnowledge(agent.id, id);
    setConfirmId(null);
    if (selectedId === id) setSelectedId(agent.knowledge.find((k) => k.id !== id)?.id ?? null);
    toast.success("Source removed.");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <LaunchCard agent={agent} />
      {gaps.length > 0 ? (
        <div className="rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Gaps from refusals
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Questions the agent already refused. Draft a source so the next visitor gets a receipt.
          </p>
          <ul className="mt-3 space-y-2">
            {gaps.map((g) => (
              <li key={g.question} className="flex items-start justify-between gap-3">
                <span className="text-sm">
                  {g.question}
                  {g.count > 1 ? (
                    <span className="ml-2 font-mono text-[11px] text-muted-foreground">×{g.count}</span>
                  ) : null}
                </span>
                <Button type="button" size="sm" variant="secondary" onClick={() => addNew({ title: g.question.replace(/\?+$/, "").trim() })}>
                  <Plus className="size-3.5" />
                  Draft
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex min-h-0 flex-col rounded-2xl bg-card shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-3">
            {(["all", ...KNOWLEDGE_TYPES] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={cn(
                  "h-9 rounded-full px-3 text-xs font-medium",
                  filter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {t === "all" ? "All" : KNOWLEDGE_TYPE_LABEL[t]}
              </button>
            ))}
            <Button size="sm" className="ml-auto" onClick={() => addNew()}>
              <Plus className="size-3.5" />
              Add
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {items.length === 0 ? (
              <p className="px-3 py-8 text-sm text-muted-foreground">No sources in this filter.</p>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setConfirmId(null);
                  }}
                  className={cn(
                    "mb-1 w-full rounded-xl px-3 py-3 text-left",
                    selectedId === item.id ? "bg-muted" : "hover:bg-muted/50",
                  )}
                >
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {KNOWLEDGE_TYPE_LABEL[item.type]}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="min-h-0 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          {selected ? (
            <div className="flex h-full min-h-0 flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                <div className="space-y-2">
                  <Label htmlFor="k-title">Title</Label>
                  <Input
                    id="k-title"
                    value={selected.title}
                    onChange={(e) => updateKnowledge(agent.id, selected.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="k-type">Type</Label>
                  <select
                    id="k-type"
                    value={selected.type}
                    onChange={(e) =>
                      updateKnowledge(agent.id, selected.id, { type: e.target.value as KnowledgeType })
                    }
                    className="cuve-select"
                  >
                    {KNOWLEDGE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {KNOWLEDGE_TYPE_LABEL[t]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col space-y-2">
                <Label htmlFor="k-body">Passage</Label>
                <Textarea
                  id="k-body"
                  className="min-h-40 flex-1"
                  value={selected.content}
                  onChange={(e) => updateKnowledge(agent.id, selected.id, { content: e.target.value })}
                  placeholder="The exact policy, product fact, or answer this agent is allowed to use."
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs tabular-nums text-muted-foreground">{selected.content.length} characters</p>
                <Button
                  type="button"
                  variant={confirmId === selected.id ? "destructive" : "ghost"}
                  size="sm"
                  onClick={() => remove(selected.id)}
                >
                  <Trash2 className="size-3.5" />
                  {confirmId === selected.id ? "Delete forever" : "Delete"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-48 flex-col items-center justify-center text-center">
              <p className="font-display text-xl font-medium">Add a source</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                FAQs, policies, products, procedures, and docs. These are the sources this agent is allowed to cite.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
