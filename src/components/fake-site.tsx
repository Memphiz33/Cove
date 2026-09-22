import { WidgetBubble } from "@/components/widget-bubble";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FakeSite({ agent, className }: { agent: Agent; className?: string }) {
  const products = agent.knowledge.filter((k) => k.type === "product").slice(0, 3);
  const extras = agent.knowledge.filter((k) => k.type !== "product").slice(0, 3);
  const cards = products.length ? products : extras;

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-card shadow-[var(--shadow-lift)]", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-muted" />
        <span className="size-2 rounded-full bg-muted" />
        <span className="size-2 rounded-full bg-muted" />
        <span className="ml-2 flex-1 truncate rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
          {agent.company.toLowerCase().replace(/\s+/g, "")}.example
        </span>
      </div>
      <div className="relative min-h-[520px] bg-background p-6 pb-24 sm:p-8 sm:pb-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{agent.company}</p>
        <h3 className="font-display mt-3 max-w-sm text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {agent.tagline}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Live preview of the widget on a customer page. Palette, position, and bubble label update here.
        </p>
        <div className="mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
          {cards.length
            ? cards.map((card) => (
                <article key={card.id} className="rounded-lg bg-muted p-3">
                  <p className="truncate text-xs font-medium">{card.title}</p>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-muted-foreground">
                    {card.content}
                  </p>
                </article>
              ))
            : [0, 1, 2].map((i) => (
                <article key={i} className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground">Source {i + 1}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Add knowledge to fill this page.</p>
                </article>
              ))}
        </div>
        <WidgetBubble agent={agent} />
      </div>
    </div>
  );
}
