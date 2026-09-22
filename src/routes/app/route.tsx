import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Logo, LogoMark } from "@/components/logo";
import { useHydrated } from "@/hooks/use-hydrated";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({ component: AppShell });

function AppShell() {
  const hydrated = useHydrated();
  const agents = useStudio((s) => s.agents);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-14 items-center px-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="px-3 pb-2">
          <Link
            to="/app/new"
            className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-transform duration-150 active:scale-[0.96]"
          >
            <Plus className="size-4" />
            New agent
          </Link>
        </div>
        <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
          <Link
            to="/app"
            className={cn(
              "flex h-11 items-center rounded-md px-3 text-sm",
              pathname === "/app" ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/60",
            )}
          >
            All agents
          </Link>
          {hydrated
            ? agents.map((a) => (
                <Link
                  key={a.id}
                  to="/app/$agentId"
                  params={{ agentId: a.id }}
                  className={cn(
                    "flex h-11 items-center truncate rounded-md px-3 text-sm",
                    pathname.startsWith(`/app/${a.id}`)
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:bg-muted/60",
                  )}
                >
                  {a.name}
                </Link>
              ))
            : null}
        </nav>
        <div className="border-t border-border p-3 text-xs text-muted-foreground">
          <Link to="/app/pipeline" className="mt-2 block hover:text-foreground">
            Outreach
          </Link>
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
          <Link to="/app" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-base font-medium">Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/app/pipeline" className="text-sm font-medium">
              Outreach
            </Link>
            <Link to="/app/new" className="text-sm font-medium">
              New
            </Link>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
