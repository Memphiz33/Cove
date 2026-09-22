import { createFileRoute, Link } from "@tanstack/react-router";
import { AnalyticsView } from "@/components/analytics-view";
import { InboxView } from "@/components/inbox-view";
import { KnowledgeEditor } from "@/components/knowledge-editor";
import { ChatPanel } from "@/components/chat-panel";
import { LaunchChip } from "@/components/launch-card";
import { RetrievalInspector } from "@/components/retrieval-inspector";
import { SettingsForm } from "@/components/settings-form";
import { WidgetStudio } from "@/components/widget-studio";
import { useHydrated } from "@/hooks/use-hydrated";
import { ROLE_LABEL } from "@/lib/new-agent";
import { agentStats } from "@/lib/stats";
import { useAgent, useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = ["playground", "knowledge", "widget", "inbox", "analytics", "settings"] as const;
type Tab = (typeof TABS)[number];

function isTab(v: unknown): v is Tab {
  return typeof v === "string" && (TABS as readonly string[]).includes(v);
}

export const Route = createFileRoute("/app/$agentId")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => ({
    tab: isTab(search.tab) ? search.tab : undefined,
  }),
  component: AgentStudio,
});

const TAB_LABEL: Record<Tab, string> = {
  playground: "Playground",
  knowledge: "Knowledge",
  widget: "Widget",
  inbox: "Inbox",
  analytics: "Analytics",
  settings: "Settings",
};

function AgentStudio() {
  const { agentId } = Route.useParams();
  const { tab: tabParam } = Route.useSearch();
  const tab: Tab = tabParam ?? "playground";
  const hydrated = useHydrated();
  const agent = useAgent(agentId);
  const conversations = useStudio((s) => s.conversations);

  if (!hydrated) {
    return <div className="m-6 h-64 animate-pulse rounded-2xl bg-muted" />;
  }

  if (!agent) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl font-medium">Agent not found</p>
        <p className="mt-2 text-sm text-muted-foreground">It may have been deleted from this workspace.</p>
        <Link to="/app" className="mt-6 text-sm font-medium underline-offset-4 hover:underline">
          Back to studio
        </Link>
      </div>
    );
  }

  const stats = agentStats(agent.id, conversations);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-4 pt-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {agent.company} · {ROLE_LABEL[agent.role]} · {agent.grounding === "assist" ? "Assist" : "Strict"}
            </p>
            <h1 className="font-display mt-1 text-2xl font-medium tracking-tight">{agent.name}</h1>
            <p className="mt-1 text-xs tabular-nums text-muted-foreground">
              {agent.knowledge.length} sources · {stats.open} open · {stats.handoff} handoff · {stats.leads}{" "}
              leads
              {stats.avgConfidence > 0
                ? ` · ${Math.round(stats.avgConfidence * 100)}% avg grounded`
                : ""}
            </p>
          </div>
          <LaunchChip agent={agent} />
        </div>
        <nav className="-mb-px mt-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <Link
              key={t}
              to="/app/$agentId"
              params={{ agentId }}
              search={{ tab: t }}
              replace
              className={cn(
                "h-11 shrink-0 border-b-2 px-3 text-sm",
                tab === t
                  ? "border-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {TAB_LABEL[t]}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
        {tab === "playground" ? (
          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="min-h-[420px]">
              <ChatPanel agent={agent} channel="playground" className="h-full min-h-[420px]" />
            </div>
            <div className="min-h-[280px]">
              <RetrievalInspector agent={agent} />
            </div>
          </div>
        ) : null}
        {tab === "knowledge" ? <KnowledgeEditor agent={agent} /> : null}
        {tab === "widget" ? <WidgetStudio agent={agent} /> : null}
        {tab === "inbox" ? <InboxView agentId={agent.id} /> : null}
        {tab === "analytics" ? <AnalyticsView agent={agent} /> : null}
        {tab === "settings" ? <SettingsForm agent={agent} /> : null}
      </div>
    </div>
  );
}
