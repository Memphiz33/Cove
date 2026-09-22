import { Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav solid />
      <main className="mx-auto flex max-w-xl flex-col px-4 py-24 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">404</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight">This page is not in the sources.</h1>
        <p className="mt-4 text-muted-foreground">The link is wrong, or the page was never published.</p>
        <Button className="mt-8 w-fit" asChild>
          <Link to="/app/new">Create an agent</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
