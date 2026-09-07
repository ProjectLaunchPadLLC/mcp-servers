import { InfoWeaveParser } from "./infoweave/parser";
import { WorkflowPlanner } from "./infoweave/planner";
import { PolicyEngine } from "./infoweave/policy";
import { ProvenanceLogger } from "./infoweave/provenance";
import { ContextManager } from "./infoweave/context";

export class InfoWeaveServer {
  private parser = new InfoWeaveParser();
  private planner = new WorkflowPlanner();
  private policy = new PolicyEngine();
  private provenance = new ProvenanceLogger();
  private context = new ContextManager();

  async execute(prompt: string) {
    const intent = await this.parser.parse(prompt);
    const workflow = await this.planner.plan(intent);
    const decision = await this.policy.evaluate(workflow);

    if (!decision.allowed) {
      throw new Error(decision.reason);
    }

    this.context.set("lastPrompt", prompt);
    this.context.set("lastIntent", intent);
    this.context.set("lastWorkflow", workflow);

    this.provenance.record({
      prompt,
      intent,
      workflow,
    });

    return workflow;
  }

  getContextSnapshot() {
    return this.context.snapshot();
  }

  getProvenanceHistory() {
    return this.provenance.all();
  }
}

export default InfoWeaveServer;
