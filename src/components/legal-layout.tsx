import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export function LegalLayout({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav solid />
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">{kicker}</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Updated {updated}</p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
