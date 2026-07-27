import { Intent } from "./schemas";

const KEYWORDS = {
  tests: ["test", "tests", "harness"],
  docs: ["doc", "docs", "documentation"],
  workflows: ["workflow", "workflows", "pipeline", "ci"],
  workers: ["cloudflare", "worker", "workers"],
  deploy: ["deploy", "deployment", "ephemeral", "environment"],
};

export class InfoWeaveParser {
  async parse(prompt: string): Promise<Intent> {
    const lowerPrompt = prompt.toLowerCase();

    const entities = {
      tests: containsKeyword(lowerPrompt, KEYWORDS.tests),
      docs: containsKeyword(lowerPrompt, KEYWORDS.docs),
      workflows: containsKeyword(lowerPrompt, KEYWORDS.workflows),
      workers: containsKeyword(lowerPrompt, KEYWORDS.workers),
      deploy: containsKeyword(lowerPrompt, KEYWORDS.deploy),
    };

    const matchCount = Object.values(entities).filter(Boolean).length;
    const confidence = Math.min(1, matchCount / Object.keys(KEYWORDS).length);

    return {
      prompt,
      intent: matchCount >= 3 ? "project-bootstrap" : "general-request",
      confidence,
      entities,
    };
  }
}

function containsKeyword(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}
