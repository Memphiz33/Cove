import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Inbox, Layers, Shield } from "lucide-react";
import { ChatPanel } from "@/components/chat-panel";
import { FakeSite } from "@/components/fake-site";
import { ReceiptDemo } from "@/components/receipt-demo";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { SEED_AGENTS } from "@/lib/seed";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const cove = SEED_AGENTS[0];
const northline = SEED_AGENTS[1];

function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Logos />
      <How />
      <ReceiptDemo />
      <StudioPreview />
      <WhenItStops />
      <PricingTeaser />
      <Close />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="paper-grid border-b border-border">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="stagger-in flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Grounded support agent
          </p>
          <h1 className="font-display mt-5 max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Answers with receipts.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Train Cove on FAQs, policies, products, and procedures. Every reply cites the passage it used. If it
            cannot cite, it hands off — the model is never asked to invent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/app">
                Open the studio
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Ask the live agent on the right. The Lisbon chip is a trap — it should hand off.
          </p>
        </div>
        <div className="h-[min(560px,70vh)] min-h-[420px]">
          <ChatPanel agent={cove} channel="playground" className="h-full" />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const names = ["Northline", "Lumen Cloud", "Harbor Goods", "Field Press", "Orchard"];
  return (
    <section className="border-b border-border py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Already answering for teams who care what they promised
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {names.map((n) => (
            <span key={n} className="font-display text-lg text-muted-foreground/80">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      n: "01",
      title: "Ground it",
      body: "FAQs, policies, products, procedures, and docs as first-class sources. Edit a sentence, test immediately.",
      icon: Layers,
    },
    {
      n: "02",
      title: "Prove coverage",
      body: "Citation preview and coverage checks on the questions visitors actually ask. Low score never ships as policy.",
      icon: BookOpen,
    },
    {
      n: "03",
      title: "Place the widget",
      body: "Design the bubble on a live page preview. Palette, position, greeting — then one embed snippet.",
      icon: Shield,
    },
    {
      n: "04",
      title: "Read the room",
      body: "Inbox, sentiment, captured emails, and handoff when the agent should stop talking.",
      icon: Inbox,
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">How it works</p>
      <h2 className="font-display mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
        Build once. Cite every time.
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {steps.map((s) => (
          <article key={s.n} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-border)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
              <s.icon className="size-4 text-accent" />
            </div>
            <h3 className="mt-6 font-display text-xl font-medium">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioPreview() {
  return (
    <section className="border-b border-border bg-sidebar py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Widget studio
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Design it on the page it will live on.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Preview the bubble on a customer layout while knowledge is still open. Northline is a live apparel
            agent — returns, sizing, late shipments.
          </p>
          <Button className="mt-8" asChild>
            <Link to="/app/$agentId" params={{ agentId: northline.id }} search={{ tab: "widget" }}>
              Open Northline
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <FakeSite agent={northline} />
      </div>
    </section>
  );
}

function WhenItStops() {
  const rows: [string, string][] = [
    ["No source", "No answer. Handoff line instead of a guess."],
    ["Strict mode", "The model is not called when retrieval is weak."],
    ["Receipts", "Every reply shows the passage and a grounded score."],
    ["Ship score", "Coverage, sources, and grounding have to clear before you embed."],
    ["Gaps", "Refused questions become drafts in Knowledge."],
    ["Pricing", "One visitor message equals one answer. No multipliers."],
  ];
  return (
    <section id="standard" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">When it stops</p>
      <h2 className="font-display mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
        A support agent that can admit it does not know.
      </h2>
      <div className="mt-10 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-border)]">
        {rows.map((row, i) => (
          <div
            key={row[0]}
            className={cn(
              "grid gap-2 px-4 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:px-6",
              i !== rows.length - 1 && "border-b border-border",
            )}
          >
            <span className="text-sm font-medium">{row[0]}</span>
            <span className="text-sm text-muted-foreground">{row[1]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingTeaser() {
  const plans = [
    { name: "Free", price: "$0", note: "1 agent, playground, citations" },
    { name: "Studio", price: "$39", note: "Inbox, widget, coverage — the one to ship", featured: true },
    { name: "Company", price: "$129", note: "Analytics, handoff, no badge" },
  ];
  return (
    <section className="border-t border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-medium tracking-tight">Flat plans. No multipliers.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={cn(
                "rounded-2xl p-6",
                p.featured ? "bg-primary text-primary-foreground" : "bg-background shadow-[var(--shadow-border)]",
              )}
            >
              <p className="text-sm">{p.name}</p>
              <p className="font-display mt-3 text-4xl font-medium">{p.price}</p>
              <p className={cn("mt-2 text-sm", p.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {p.note}
              </p>
            </article>
          ))}
        </div>
        <Button className="mt-8" variant="secondary" asChild>
          <Link to="/pricing">Full plans</Link>
        </Button>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="paper-grid mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h2 className="font-display mx-auto max-w-xl text-3xl font-medium tracking-tight sm:text-5xl">
        Only answer what you can stand behind.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Open a seeded agent — Northline apparel, Lumen Cloud, or Cove itself — and ask it something it should
        know. Then ask something it should not.
      </p>
      <Button size="lg" className="mt-8" asChild>
        <Link to="/app">
          Enter the studio
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      <p className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Check className="size-3.5" /> No account required in this demo
      </p>
    </section>
  );
}
