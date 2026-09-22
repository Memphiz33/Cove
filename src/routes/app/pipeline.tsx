import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PROSPECTS } from "@/lib/outreach";
import { isGrounded, retrieve } from "@/lib/retrieve";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/pipeline")({ component: PipelinePage });

function PipelinePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Outreach</p>
        <h1 className="font-display mt-2 text-3xl font-medium tracking-tight">Ten stores. One page each.</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Each note uses only that brand's public returns page. The first question has to cite. The second has
          to refuse. Nothing has been sent.
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {PROSPECTS.map((p) => (
          <ProspectCard key={p.id} prospect={p} />
        ))}
      </ul>
    </div>
  );
}

function ProspectCard({ prospect }: { prospect: (typeof PROSPECTS)[number] }) {
  const [copied, setCopied] = useState(false);
  const cite = retrieve(prospect.knowledge, prospect.citeQ, 1);
  const refuse = retrieve(prospect.knowledge, prospect.refuseQ, 1);
  const citeOk = isGrounded(cite, "strict");
  const refuseOk = !isGrounded(refuse, "strict");

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${prospect.email}\n\n${prospect.note}`);
      setCopied(true);
      toast.success(`Copied the note for ${prospect.company}.`);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy. Select the note instead.");
    }
  }

  return (
    <li className="rounded-2xl bg-card p-5 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-medium">{prospect.company}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{prospect.blurb}</p>
          <p className="mt-2 text-sm">
            <a className="underline decoration-border underline-offset-4" href={`mailto:${prospect.email}`}>
              {prospect.email}
            </a>
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy note
        </Button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Result
          label="Cites"
          ok={citeOk}
          question={prospect.citeQ}
          detail={cite[0] ? `${Math.round(cite[0].score * 100)}% · ${cite[0].excerpt}` : "No passage."}
        />
        <Result
          label="Refuses"
          ok={refuseOk}
          question={prospect.refuseQ}
          detail={
            refuseOk
              ? "Below the bar. Handoff, no guess."
              : refuse[0]
                ? `Would cite ${Math.round(refuse[0].score * 100)}%. Rewrite the question.`
                : "No passage."
          }
        />
      </div>
      <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-background p-4 font-sans text-sm leading-relaxed text-foreground">
        {prospect.note}
      </pre>
      <a
        href={prospect.site}
        className="mt-3 inline-block text-xs text-muted-foreground underline decoration-border underline-offset-4"
      >
        Source page
      </a>
    </li>
  );
}

function Result({
  label,
  ok,
  question,
  detail,
}: {
  label: string;
  ok: boolean;
  question: string;
  detail: string;
}) {
  return (
    <div className={cn("rounded-xl px-3 py-3 text-xs leading-relaxed", ok ? "bg-success/10" : "bg-warning/10")}>
      <p className={cn("font-medium", ok ? "text-success" : "text-warning")}>
        {label} {ok ? "clears" : "needs a look"}
      </p>
      <p className="mt-1 text-foreground">{question}</p>
      <p className="mt-1 text-muted-foreground">{detail}</p>
    </div>
  );
}
