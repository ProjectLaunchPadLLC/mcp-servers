import { PolicyDecision, Workflow } from "./schemas";

export class PolicyEngine {
  async evaluate(workflow: Workflow): Promise<PolicyDecision> {
    const blocked = workflow.steps.some((step) =>
      step.toLowerCase().includes("delete production")
    );

    if (blocked) {
      return {
        allowed: false,
        reason: "Workflow contains a blocked destructive production action.",
      };
    }

    return {
      allowed: true,
      reason: "Approved",
    };
  }
}
