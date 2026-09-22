import { Check, Minus } from "lucide-react";
import { launchChecks, launchScore } from "@/lib/launch";
import { useStudio } from "@/lib/store";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function LaunchCard({ agent }: { agent: Agent }) {
  const conversations = useStudio((s) => s.conversations);
  const checks = launchChecks(agent, conversations);
  const score = launchScore(checks);

  return (
    <div className="rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Ready to ship
          </p>
          <p className="font-display mt-1 text-2xl font-medium tabular-nums">{score}%</p>
        </div>
        <p className="pb-1 text-xs text-muted-foreground">
          {score === 100 ? "Embed when you can stand behind every starter question." : "Close the gaps before the widget goes live."}
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {checks.map((c) => (
          <li key={c.id} className="flex items-start gap-2 text-sm">
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                c.ok ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
              )}
            >
              {c.ok ? <Check className="size-3" /> : <Minus className="size-3" />}
            </span>
            <span>
              <span className="font-medium">{c.label}</span>
              <span className="block text-xs text-muted-foreground">{c.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LaunchChip({ agent }: { agent: Agent }) {
  const conversations = useStudio((s) => s.conversations);
  const checks = launchChecks(agent, conversations);
  const score = launchScore(checks);
  const ready = score === 100;
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-[11px] font-medium uppercase tracking-wider",
        ready ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
      )}
    >
      {ready ? "Ready to ship" : `Ship score ${score}%`}
    </span>
  );
}
