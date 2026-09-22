import { useMemo, useState } from "react";
import { coverageFor, coverageRate } from "@/lib/coverage";
import { groundThreshold, retrieve } from "@/lib/retrieve";
import type { Agent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function RetrievalInspector({ agent }: { agent: Agent }) {
  const [query, setQuery] = useState("");
  const threshold = groundThreshold(agent.grounding);
  const hits = useMemo(() => (query.trim() ? retrieve(agent.knowledge, query, 4) : []), [agent.knowledge, query]);
  const top = hits[0]?.score ?? 0;
  const wouldRefuse = query.trim().length > 0 && (hits.length === 0 || top < threshold);
  const coverage = coverageFor(agent);
  const rate = coverageRate(coverage);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Citation preview</p>
      <p className="mt-1 text-sm text-muted-foreground">See what would be cited or refused before you ask.</p>
      <Input
        className="mt-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try “returns” or something it should not know"
      />
      <div className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto">
        {!query.trim() ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Suggested-question coverage{" "}
              <span className="font-mono tabular-nums">{Math.round(rate * 100)}%</span>
            </p>
            {coverage.map((h) => (
              <div key={h.question} className="rounded-xl bg-muted/70 px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm">{h.question}</p>
                  <span
                    className={cn(
                      "shrink-0 text-[11px] font-medium uppercase tracking-wider",
                      h.covered ? "text-success" : "text-warning",
                    )}
                  >
                    {h.covered ? "Covered" : "Gap"}
                  </span>
                </div>
                {h.title ? <p className="mt-1 text-xs text-muted-foreground">{h.title}</p> : null}
              </div>
            ))}
          </div>
        ) : wouldRefuse ? (
          <div className="rounded-xl bg-muted px-3 py-3 text-sm">
            <p className="font-medium">Would refuse, not invent.</p>
            <p className="mt-1 text-muted-foreground">
              Nothing in knowledge clears the {agent.grounding === "assist" ? "assist" : "strict"} bar.
              Cuve will send the handoff line
              {agent.grounding === "strict" ? " without calling the model" : ""}.
            </p>
          </div>
        ) : (
          hits.map((h) => (
            <div key={h.title} className="rounded-xl bg-muted/70 px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">{h.title}</p>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {Math.round(h.score * 100)}%
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                <div
                  className={cn("h-full rounded-full", h.score >= 0.7 ? "bg-success" : "bg-accent")}
                  style={{ width: `${Math.round(h.score * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{h.excerpt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
