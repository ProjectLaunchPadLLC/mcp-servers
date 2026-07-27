import { Intent, Workflow } from "./schemas";

export class WorkflowPlanner {
  async plan(intent: Intent): Promise<Workflow> {
    return {
      name: intent.intent,
      steps: [],
      tools: [],
    };
  }
}
