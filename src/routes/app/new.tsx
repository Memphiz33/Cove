import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlankAgent, ROLE_BLURB, ROLE_LABEL } from "@/lib/new-agent";
import { useStudio } from "@/lib/store";
import type { AgentRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/new")({ component: NewAgent });

const ROLES: AgentRole[] = ["support", "sales", "guide"];

function NewAgent() {
  const navigate = useNavigate();
  const addAgent = useStudio((s) => s.addAgent);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [tagline, setTagline] = useState("");
  const [role, setRole] = useState<AgentRole>("support");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      toast.error("Name and company are required.");
      return;
    }
    const agent = createBlankAgent({ name, company, role, tagline });
    addAgent(agent);
    toast.success(`${agent.name} is ready to train.`);
    void navigate({ to: "/app/$agentId", params: { agentId: agent.id } });
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <form onSubmit={submit} className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">New agent</p>
        <h1 className="font-display mt-2 text-3xl font-medium tracking-tight">Who is this for?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a role, then add knowledge. The playground will refuse anything that is not sourced.
        </p>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent name</Label>
            <Input
              id="agent-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Harbor"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Harbor Goods"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Outdoor layers. Fair repairs."
            />
          </div>
          <fieldset className="space-y-2">
            <Label>Role</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "rounded-xl p-4 text-left shadow-[var(--shadow-border)] transition-colors duration-150",
                    role === r ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted/60",
                  )}
                >
                  <p className="text-sm font-medium">{ROLE_LABEL[r]}</p>
                  <p
                    className={cn(
                      "mt-1 text-xs leading-snug",
                      role === r ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {ROLE_BLURB[r]}
                  </p>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <Button type="submit" className="mt-8 w-full sm:w-auto" size="lg">
          Create agent
        </Button>
      </form>
    </div>
  );
}
