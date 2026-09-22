import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ROLE_BLURB, ROLE_LABEL } from "@/lib/new-agent";
import { useStudio } from "@/lib/store";
import type { Agent, AgentRole, GroundingMode, Persona } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLES: AgentRole[] = ["support", "sales", "guide"];

export function SettingsForm({ agent }: { agent: Agent }) {
  const updateAgent = useStudio((s) => s.updateAgent);
  const removeAgent = useStudio((s) => s.removeAgent);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const suggested = agent.suggested.join("\n");

  function patchPersona(key: keyof Persona, value: number) {
    updateAgent(agent.id, { persona: { ...agent.persona, [key]: value } });
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 pb-10">
      <div className="space-y-2">
        <Label htmlFor="set-name">Agent name</Label>
        <Input
          id="set-name"
          value={agent.name}
          maxLength={60}
          required
          onChange={(e) => {
            const value = e.target.value.slice(0, 60);
            if (!value.trim()) return;
            updateAgent(agent.id, { name: value });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="set-company">Company</Label>
        <Input
          id="set-company"
          value={agent.company}
          maxLength={80}
          required
          onChange={(e) => {
            const value = e.target.value.slice(0, 80);
            if (!value.trim()) return;
            updateAgent(agent.id, { company: value });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="set-tagline">Tagline</Label>
        <Input
          id="set-tagline"
          value={agent.tagline}
          maxLength={140}
          onChange={(e) => updateAgent(agent.id, { tagline: e.target.value.slice(0, 140) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="set-greeting">Greeting</Label>
        <Textarea
          id="set-greeting"
          className="min-h-24"
          value={agent.greeting}
          onChange={(e) => updateAgent(agent.id, { greeting: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="set-suggested">Suggested questions (one per line)</Label>
        <Textarea
          id="set-suggested"
          className="min-h-24"
          value={suggested}
          onChange={(e) =>
            updateAgent(agent.id, {
              suggested: e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 6),
            })
          }
        />
      </div>

      <fieldset className="space-y-2">
        <Label>Grounding</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {(["strict", "assist"] as GroundingMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => updateAgent(agent.id, { grounding: mode })}
              className={cn(
                "rounded-xl p-4 text-left",
                (agent.grounding ?? "strict") === mode ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <p className="text-sm font-medium">{mode === "strict" ? "Strict" : "Assist"}</p>
              <p
                className={cn(
                  "mt-1 text-[11px] leading-snug",
                  (agent.grounding ?? "strict") === mode ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {mode === "strict"
                  ? "Weak retrieval never reaches the model. Handoff line instead."
                  : "Still needs a source, with a slightly lower bar."}
              </p>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="space-y-2">
        <Label htmlFor="set-handoff">Handoff line</Label>
        <Textarea
          id="set-handoff"
          className="min-h-24"
          value={agent.handoffLine ?? ""}
          onChange={(e) => updateAgent(agent.id, { handoffLine: e.target.value })}
        />
      </div>

      <fieldset className="space-y-2">
        <Label>Role</Label>
        <div className="grid gap-2 sm:grid-cols-3">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => updateAgent(agent.id, { role: r })}
              className={cn(
                "rounded-xl p-3 text-left",
                agent.role === r ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <p className="text-sm font-medium">{ROLE_LABEL[r]}</p>
              <p
                className={cn(
                  "mt-1 text-[11px] leading-snug",
                  agent.role === r ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {ROLE_BLURB[r]}
              </p>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Voice</p>
        <Slider
          label="Formality"
          left="Casual"
          right="Formal"
          value={agent.persona.formality}
          onChange={(v) => patchPersona("formality", v)}
        />
        <Slider
          label="Brevity"
          left="Thorough"
          right="Terse"
          value={agent.persona.brevity}
          onChange={(v) => patchPersona("brevity", v)}
        />
        <Slider
          label="Empathy"
          left="Direct"
          right="Warm"
          value={agent.persona.empathy}
          onChange={(v) => patchPersona("empathy", v)}
        />
      </div>

      <div className="rounded-2xl border border-destructive/20 bg-card p-5">
        <p className="text-sm font-medium">Delete this agent</p>
        <p className="mt-1 text-sm text-muted-foreground">Removes knowledge and conversations from this workspace.</p>
        <Button
          className="mt-4"
          variant="destructive"
          onClick={() => {
            if (!confirm) {
              setConfirm(true);
              return;
            }
            removeAgent(agent.id);
            toast.success("Agent deleted.");
            void navigate({ to: "/app" });
          }}
        >
          {confirm ? "Delete forever" : "Delete agent"}
        </Button>
      </div>
    </div>
  );
}

function Slider({
  label,
  left,
  right,
  value,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}
