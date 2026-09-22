import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

const plans = [
  {
    name: "Free",
    price: "$0",
    blurb: "Prove the agent before you embed it.",
    items: ["1 agent", "Playground with citations", "Coverage on suggested questions", "50 knowledge items"],
  },
  {
    name: "Studio",
    price: "$39",
    blurb: "Ship a grounded agent on a real page.",
    featured: true,
    items: [
      "5 agents",
      "Live widget + studio",
      "Inbox and lead capture",
      "Strict grounding",
      "200 knowledge items",
      "No message credits",
    ],
  },
  {
    name: "Company",
    price: "$129",
    blurb: "For teams who hand off and report.",
    items: [
      "Unlimited agents",
      "Analytics and topics",
      "Human handoff",
      "Custom palettes",
      "Remove the Cuve badge",
      "SSO-ready workspace",
    ],
  },
];

function PricingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav solid />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Pricing</p>
        <h1 className="font-display mt-3 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
          One visitor message. One answer. No multipliers.
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Cuve does not meter replies. Annual billing is 20% off. This demo uses the monthly numbers.
        </p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={cn(
                "flex flex-col rounded-2xl p-6",
                p.featured ? "bg-primary text-primary-foreground" : "bg-card shadow-[var(--shadow-border)]",
              )}
            >
              <p className="text-sm">{p.name}</p>
              <p className="font-display mt-4 text-5xl font-medium">{p.price}</p>
              <p className={cn("mt-2 text-sm", p.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {p.blurb}
              </p>
              <ul className="mt-8 flex-1 space-y-2.5 text-sm">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" variant={p.featured ? "secondary" : "default"} asChild>
                <Link to="/app">Start in the studio</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
