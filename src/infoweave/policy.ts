import { PolicyDecision, Workflow } from "./schemas";

export class PolicyEngine {
  async evaluate(_workflow: Workflow): Promise<PolicyDecision> {
    return {
      allowed: true,
      reason: "Approved",
    };
  }
}
