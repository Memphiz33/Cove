import { BookOpen } from "lucide-react";

export function ReceiptDemo() {
  return (
    <section id="receipts" className="border-y border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Receipts</p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
          Two replies. Only one is allowed to exist.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Cove writes from a passage you uploaded, then shows that passage. If nothing clears the bar, the
          model is not called. Visitors get a handoff, not a confident guess.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl bg-background p-5 shadow-[var(--shadow-border)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-success">Cited</p>
            <p className="mt-4 text-sm text-muted-foreground">Visitor · Northline</p>
            <p className="mt-1 rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
              Do you take returns on the Drift Jacket if I haven’t worn it?
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Northline</p>
            <p className="mt-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed">
              Yes. 30 days from delivery, unworn, tags on. Start at northline.example/returns and we’ll email a
              prepaid label. Refunds land in 5–8 business days after we scan it in.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="h-1 w-16 overflow-hidden rounded-full bg-border">
                <span className="block h-full w-[94%] rounded-full bg-success" />
              </span>
              <span className="tabular-nums">94% grounded</span>
            </div>
            <div className="mt-2 rounded-lg border border-border bg-card px-2.5 py-2 text-[11px] leading-snug">
              <p className="flex items-center gap-1 font-medium text-foreground">
                <BookOpen className="size-3" />
                Policy · Returns
              </p>
              <p className="mt-0.5 text-muted-foreground">
                Northline accepts returns within 30 days of delivery. Items must be unworn, unwashed, with original
                tags.
              </p>
            </div>
          </article>
          <article className="rounded-2xl bg-background p-5 shadow-[var(--shadow-border)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-warning">Handoff</p>
            <p className="mt-4 text-sm text-muted-foreground">Visitor · Cove</p>
            <p className="mt-1 rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
              Do you have a store in Lisbon?
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Cove</p>
            <p className="mt-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed">
              That isn’t in my sources, so I won’t invent it. Ask something I can cite, or I can connect you with a
              person.
            </p>
            <p className="mt-3 text-[11px] font-medium text-warning">Handoff, not in sources</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Strict mode skipped the model. There was nothing to cite, so nothing was written.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
