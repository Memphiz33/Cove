import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FakeSite } from "@/components/fake-site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coverageFor, coverageRate } from "@/lib/coverage";
import { launchChecks, launchScore } from "@/lib/launch";
import { PALETTE_LABEL, PALETTE_SWATCH } from "@/lib/palette";
import { useStudio } from "@/lib/store";
import type { Agent, WidgetPalette, WidgetPosition } from "@/lib/types";
import { cn } from "@/lib/utils";

const PALETTES: WidgetPalette[] = ["ink", "slate", "forest", "sand"];

export function WidgetStudio({ agent }: { agent: Agent }) {
  const updateAgent = useStudio((s) => s.updateAgent);
  const conversations = useStudio((s) => s.conversations);
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="https://cuve.example/widget.js" data-agent="${agent.id}" async></script>`;
  const rate = coverageRate(coverageFor(agent));
  const score = launchScore(launchChecks(agent, conversations));
  const warn = score < 100;

  function patchWidget(patch: Partial<Agent["widget"]>) {
    updateAgent(agent.id, { widget: { ...agent.widget, ...patch } });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      toast.success("Embed snippet copied.");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy. Select the snippet instead.");
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="relative min-h-[560px] min-w-0 flex-1">
        <FakeSite agent={agent} className="h-full min-h-[560px]" />
      </div>
      <div className="flex w-full shrink-0 flex-col gap-5 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] lg:w-72">
        {warn ? (
          <div className="rounded-xl bg-warning/10 px-3 py-3 text-xs leading-relaxed text-warning">
            Ship score {score}%. Starter-question coverage is {Math.round(rate * 100)}%. Close gaps in Knowledge
            before this widget speaks for you.
          </div>
        ) : (
          <div className="rounded-xl bg-success/10 px-3 py-3 text-xs leading-relaxed text-success">
            Ready to ship. Starter questions retrieve a source. Strict grounding is on.
          </div>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Palette</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {PALETTES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => patchWidget({ palette: p })}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl border",
                  agent.widget.palette === p ? "border-foreground" : "border-transparent bg-muted",
                )}
              >
                <span className={cn("size-4 rounded-full", PALETTE_SWATCH[p])} />
                <span className="text-[10px] uppercase tracking-wider">{PALETTE_LABEL[p]}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Position</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["left", "right"] as WidgetPosition[]).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => patchWidget({ position: pos })}
                className={cn(
                  "h-11 rounded-xl text-sm capitalize",
                  agent.widget.position === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bubble-label">Bubble label</Label>
          <Input
            id="bubble-label"
            value={agent.widget.bubble}
            onChange={(e) => patchWidget({ bubble: e.target.value })}
          />
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={agent.widget.showBranding}
          onClick={() => patchWidget({ showBranding: !agent.widget.showBranding })}
          className="flex h-11 items-center justify-between rounded-xl bg-muted px-3 text-sm"
        >
          <span>Cuve badge</span>
          <span
            className={cn(
              "relative h-6 w-10 rounded-full transition-colors duration-150",
              agent.widget.showBranding ? "bg-primary" : "bg-border",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-5 rounded-full bg-card transition-transform duration-150",
                agent.widget.showBranding ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </span>
        </button>
        <div className="space-y-2">
          <Label>Embed</Label>
          <pre className="overflow-x-auto rounded-xl bg-muted px-3 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {snippet}
          </pre>
          <Button type="button" variant="secondary" className="w-full" onClick={() => void copy()}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy snippet"}
          </Button>
        </div>
      </div>
    </div>
  );
}
