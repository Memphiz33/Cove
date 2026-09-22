import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy policy",
      description: "What Cuve stores on your device, what a live answer sends, and how analytics works.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout kicker="Privacy" title="Privacy policy" updated="September 22, 2026">
      <section className="space-y-3">
        <h2>What this covers</h2>
        <p>
          This policy describes the Cuve website and studio. Cuve is a support-agent studio. It does not sell
          personal information.
        </p>
      </section>
      <section className="space-y-3">
        <h2>What stays on your device</h2>
        <p>
          Agents, knowledge, conversations, and widget settings are saved in local storage in your browser. That
          data is not sent to a Cuve account database. Clearing site data removes it.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Live answers</h2>
        <p>
          If a question is grounded in your sources, the question, a short history, and the cited passages are
          sent to the model provider to draft the reply. The model key stays on the server. It is not shipped to
          the browser. If retrieval is too weak, the model is not called.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Cookies and measurement</h2>
        <p>
          A banner asks before any analytics runs. Decline means no analytics script is loaded. Accept loads
          Vercel Web Analytics and Speed Insights, which measure page views and load time. The choice itself is
          stored in local storage, not in an advertising cookie.
        </p>
      </section>
      <section className="space-y-3">
        <h2>What you should not paste</h2>
        <p>
          Do not put passwords, payment numbers, or private customer lists into knowledge. Anything you paste
          can appear in a cited answer, and a live question can send that passage to the model provider.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Questions</h2>
        <p>
          This site does not publish a postal address. Questions about this policy can be sent to the operator
          at the address you already use to reach Cuve.
        </p>
      </section>
    </LegalLayout>
  );
}
