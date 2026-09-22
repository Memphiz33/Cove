import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        solid ? "border-border bg-background" : "border-transparent bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="how" className="hover:text-foreground">
            How it works
          </Link>
          <Link to="/" hash="receipts" className="hover:text-foreground">
            Receipts
          </Link>
          <Link to="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/app">Open studio</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/app/new">Create an agent</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo />
        <p className="text-sm text-muted-foreground">Answers with receipts. If it cannot cite, it hands off.</p>
      </div>
    </footer>
  );
}
