import { groundThreshold, retrieve } from "./retrieve";
import type { Agent } from "./types";

export type CoverageHit = {
  question: string;
  score: number;
  covered: boolean;
  title?: string;
};

export function coverageFor(agent: Agent): CoverageHit[] {
  const threshold = groundThreshold(agent.grounding);
  return agent.suggested.map((question) => {
    const hits = retrieve(agent.knowledge, question, 1);
    const score = hits[0]?.score ?? 0;
    return {
      question,
      score,
      covered: score >= threshold,
      title: hits[0]?.title,
    };
  });
}

export function coverageRate(hits: CoverageHit[]): number {
  if (hits.length === 0) return 0;
  return hits.filter((h) => h.covered).length / hits.length;
}
