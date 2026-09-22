import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlankAgent, ROLE_BLURB, ROLE_LABEL } from "@/lib/new-agent";
import { pageHead } from "@/lib/site";
import { useStudio } from "@/lib/store";
import type { AgentRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/new")({
  head: () =>
    pageHead({
      title: "Create an agent",
      description: "Name the agent, pick a role, then add the sources it is allowed to cite.",
      path: "/app/new",
    }),
  component: NewAgent,
});

const ROLES: AgentRole[] = ["support", "sales", "guide"];

function NewAgent() {
  const navigate = useNavigate();
  const addAgent = useStudio((s) => s.addAgent);
  const startedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [tagline, setTagline] = useState("");
  const [role, setRole] = useState<AgentRole>("support");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const trap = String(form.get("company_website") ?? "").trim();
    const nextName = name.trim();
    const nextCompany = company.trim();
    const nextTagline = tagline.trim();

    if (trap || Date.now() - startedAt.current < 800) {
      setError("Could not create that agent. Try again.");
      return;
    }
    if (nextName.length < 2 || nextName.length > 60) {
      setError("Agent name needs 2 to 60 characters.");
      return;
    }
    if (nextCompany.length < 2 || nextCompany.length > 80) {
      setError("Company needs 2 to 80 characters.");
      return;
    }
    if (nextTagline.length > 140) {
      setError("Tagline needs to stay under 140 characters.");
      return;
    }

    setError(null);
    const agent = createBlankAgent({ name: nextName, company: nextCompany, role, tagline: nextTagline });
    addAgent(agent);
    toast.success(`${agent.name} is ready to train.`);
    void navigate({ to: "/app/$agentId", params: { agentId: agent.id } });
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <form onSubmit={submit} className="mx-auto max-w-xl px-4 py-8 sm:px-6" noValidate>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">New agent</p>
        <h1 className="font-display mt-2 text-3xl font-medium tracking-tight">Who is this for?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a role, then add knowledge. The playground will refuse anything that is not sourced.
        </p>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="company-website">Website</label>
          <input id="company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent name</Label>
            <Input
              id="agent-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Harbor"
              required
              minLength={2}
              maxLength={60}
              autoFocus
              aria-invalid={error?.startsWith("Agent name") ? true : undefined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Harbor Goods"
              required
              minLength={2}
              maxLength={80}
              aria-invalid={error?.startsWith("Company") ? true : undefined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Outdoor layers. Fair repairs."
              maxLength={140}
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
                      role === r ? "text-primary-foreground/85" : "text-muted-foreground",
                    )}
                  >
                    {ROLE_BLURB[r]}
                  </p>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {error ? (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="mt-8 w-full sm:w-auto" size="lg">
          Create agent
        </Button>
      </form>
    </div>
  );
}
