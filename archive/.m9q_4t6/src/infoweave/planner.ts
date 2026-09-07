import { Intent, Workflow } from "./schemas";

export class WorkflowPlanner {
  async plan(intent: Intent): Promise<Workflow> {
    if (intent.intent === "project-bootstrap") {
      return {
        name: "project-bootstrap",
        steps: [
          "Create and validate test harness",
          "Author unit and integration tests",
          "Compose implementation documentation",
          "Build CI/CD workflow automation",
          "Integrate Cloudflare Workers runtime",
          "Deploy ephemeral environment script",
        ],
        tools: ["vitest", "github-actions", "wrangler"],
      };
    }

    return {
      name: intent.intent,
      steps: ["Capture detailed requirements", "Propose implementation workflow"],
      tools: [],
    };
  }
}
