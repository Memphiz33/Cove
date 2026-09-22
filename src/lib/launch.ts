import { coverageFor, coverageRate } from "./coverage";
import type { Agent, Conversation } from "./types";

export type LaunchCheck = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
};

export function launchChecks(agent: Agent, _conversations?: Conversation[]): LaunchCheck[] {
  const coverage = coverageFor(agent);
  const rate = coverageRate(coverage);
  const filled = agent.knowledge.filter((k) => k.content.trim().length >= 40);
  const types = new Set(filled.map((k) => k.type));
  const needsPolicy = agent.role !== "sales";
  const hasPolicyShape = needsPolicy
    ? types.has("policy") || types.has("procedure")
    : types.has("product") || types.has("faq");
  const grounding = agent.grounding ?? "strict";
  const handoff = (agent.handoffLine ?? "").trim().length >= 24;

  return [
    {
      id: "coverage",
      label: "Starter questions covered",
      ok: coverage.length > 0 && rate >= 0.8,
      detail:
        coverage.length === 0
          ? "Add suggested questions in Settings"
          : `${Math.round(rate * 100)}% retrieve a source above the bar`,
    },
    {
      id: "sources",
      label: "Enough real sources",
      ok: filled.length >= 3,
      detail: `${filled.length} passage${filled.length === 1 ? "" : "s"} with substance`,
    },
    {
      id: "shape",
      label: needsPolicy ? "Policy or procedure on file" : "Product or plan on file",
      ok: hasPolicyShape,
      detail: hasPolicyShape
        ? "The agent can cite something visitors will hold you to"
        : "Add the document people will quote back at you",
    },
    {
      id: "strict",
      label: "Strict grounding",
      ok: grounding === "strict",
      detail:
        grounding === "strict"
          ? "Weak retrieval never reaches the model"
          : "Assist still needs a source, but the bar is lower",
    },
    {
      id: "handoff",
      label: "Handoff line written",
      ok: handoff,
      detail: handoff ? "Used when nothing can be cited" : "Write the sentence the agent says when it stops",
    },
  ];
}

export function launchScore(checks: LaunchCheck[]): number {
  if (checks.length === 0) return 0;
  return Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);
}

export function isReadyToShip(checks: LaunchCheck[]): boolean {
  return checks.every((c) => c.ok);
}
