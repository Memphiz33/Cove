import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, RotateCcw } from "lucide-react";
import { useHydrated } from "@/hooks/use-hydrated";
import { launchChecks, launchScore } from "@/lib/launch";
import { ROLE_LABEL } from "@/lib/new-agent";
import { PALETTE_SWATCH } from "@/lib/palette";
import { agentStats, workspaceStats } from "@/lib/stats";
import { useStudio } from "@/lib/store";
import { formatTime, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({ component: StudioHome });

function StudioHome() {
  const hydrated = useHydrated();
  const agents = useStudio((s) => s.agents);
  const conversations = useStudio((s) => s.conversations);
  const resetDemo = useStudio((s) => s.resetDemo);
  const ws = workspaceStats(conversations);

  if (!hydrated) {
    return (
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-44 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Studio</p>
            <h1 className="font-display mt-2 text-3xl font-medium tracking-tight">Agents</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="tabular-nums">{agents.length}</span>{" "}
              {agents.length === 1 ? "agent" : "agents"} ·{" "}
              <span className="tabular-nums">{ws.total}</span>{" "}
              {ws.total === 1 ? "conversation" : "conversations"} ·{" "}
              <span className="tabular-nums">{ws.leads}</span>{" "}
              {ws.leads === 1 ? "lead" : "leads"}
            </p>
          </div>
          <Button asChild>
            <Link to="/app/new">
              <Plus className="size-4" />
              New agent
            </Link>
          </Button>
        </div>

        {agents.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-card px-6 py-16 text-center shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl font-medium">No agents yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Create one, add a few sources, and test in the playground before the widget goes live.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/app/new">Create an agent</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => {
              const stats = agentStats(agent.id, conversations);
              const score = launchScore(launchChecks(agent, conversations));
              return (
                <Link
                  key={agent.id}
                  to="/app/$agentId"
                  params={{ agentId: agent.id }}
                  className="group flex flex-col rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-lift)] active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <span className={`size-2.5 rounded-full ${PALETTE_SWATCH[agent.widget.palette]}`} />
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {ROLE_LABEL[agent.role]}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-xl font-medium tracking-tight">{agent.name}</h2>
                  <p className="mt-1 truncate text-sm text-muted-foreground">{agent.company}</p>
                  <p className="mt-4 text-xs tabular-nums text-muted-foreground">
                    {agent.knowledge.length} sources · {stats.total} {stats.total === 1 ? "chat" : "chats"} · {stats.open} open
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{formatTime(agent.createdAt)}</p>
                  <p
                    className={cn(
                      "mt-3 text-[11px] font-medium uppercase tracking-wider",
                      score === 100 ? "text-success" : "text-warning",
                    )}
                  >
                    {score === 100 ? "Ready to ship" : `Ship score ${score}%`}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                    Open studio
                    <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => resetDemo()}
          className="mt-10 inline-flex h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          Reset demo data
        </button>
      </div>
    </div>
  );
}
