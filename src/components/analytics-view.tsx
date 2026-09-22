import { coverageFor, coverageRate } from "@/lib/coverage";
import { knowledgeGaps } from "@/lib/gaps";
import { KNOWLEDGE_TYPE_LABEL } from "@/lib/knowledge";
import { agentStats } from "@/lib/stats";
import { useStudio } from "@/lib/store";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AnalyticsView({ agent }: { agent: Agent }) {
  const conversations = useStudio((s) => s.conversations);
  const mine = conversations.filter((c) => c.agentId === agent.id);
  const stats = agentStats(agent.id, conversations);
  const coverage = coverageFor(agent);
  const rate = coverageRate(coverage);
  const refused = mine.flatMap((c) => c.messages).filter((m) => m.refused).length;
  const gaps = knowledgeGaps(agent, conversations);
  const topics = new Map<string, number>();
  for (const c of mine) {
    for (const m of c.messages) {
      for (const cite of m.citations ?? []) {
        const key = cite.type ? `${KNOWLEDGE_TYPE_LABEL[cite.type]} · ${cite.title}` : cite.title;
        topics.set(key, (topics.get(key) ?? 0) + 1);
      }
    }
  }
  const topicList = [...topics.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  const cards = [
    { label: "Conversations", value: String(stats.total) },
    { label: "Handoffs", value: String(stats.handoff) },
    { label: "Leads", value: String(stats.leads) },
    {
      label: "Avg grounded",
      value: stats.avgConfidence ? `${Math.round(stats.avgConfidence * 100)}%` : "—",
    },
    { label: "Refused", value: String(refused) },
    { label: "Coverage", value: `${Math.round(rate * 100)}%` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{c.label}</p>
            <p className="font-display mt-2 text-3xl font-medium tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Cited sources</p>
          {topicList.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ask the playground to fill this.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {topicList.map(([title, n]) => (
                <li key={title} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate">{title}</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Suggested-question coverage
          </p>
          <ul className="mt-4 space-y-3">
            {coverage.map((h) => (
              <li key={h.question} className="text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span>{h.question}</span>
                  <span
                    className={cn(
                      "shrink-0 text-[11px] font-medium uppercase tracking-wider",
                      h.covered ? "text-success" : "text-warning",
                    )}
                  >
                    {h.covered ? "Covered" : "Gap"}
                  </span>
                </div>
                {h.title ? <p className="mt-0.5 text-xs text-muted-foreground">{h.title}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Unanswered</p>
          {gaps.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Refused questions show up here so you can write the missing passage.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {gaps.map((g) => (
                <li key={g.question} className="flex items-start justify-between gap-3 text-sm">
                  <span>{g.question}</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">×{g.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
