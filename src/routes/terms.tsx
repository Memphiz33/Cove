import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms and conditions",
      description: "The rules for using the Cuve studio, the demo, and a grounded support agent.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout kicker="Terms" title="Terms and conditions" updated="September 22, 2026">
      <section className="space-y-3">
        <h2>The product</h2>
        <p>
          Cuve lets you train a support agent on sources you provide. A reply should cite those sources. If it
          cannot cite, it should hand off. You are responsible for checking an answer before you embed the
          widget on a real site.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Your content</h2>
        <p>
          You keep the knowledge you add. You confirm you have the right to use it. Do not upload secrets,
          customer lists, or anything you would not want quoted back to a visitor.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use the playground to probe, overload, or attack the service.</li>
          <li>Do not ask the agent to invent a policy and then present that guess as yours.</li>
          <li>Do not use Cuve for unlawful content.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2>Plans</h2>
        <p>
          Prices on the pricing page are the published offer: Free, Studio at $39 a month, and Company at $129
          a month. This demo does not charge a card. A paid plan starts only when a billing step exists and you
          choose it.
        </p>
      </section>
      <section className="space-y-3">
        <h2>No guarantee of a perfect answer</h2>
        <p>
          Citations reduce guessing. They do not make a model infallible. You review coverage before you ship.
          Cuve is not liable for a decision you make from an agent you trained.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Changes</h2>
        <p>
          The product and these terms can change. The date at the top is the version in force. Continued use
          after an update means you accept the new terms.
        </p>
      </section>
    </LegalLayout>
  );
}
