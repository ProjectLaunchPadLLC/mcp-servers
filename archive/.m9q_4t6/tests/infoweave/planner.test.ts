import { describe, expect, it } from "vitest";
import { WorkflowPlanner } from "../../src/infoweave/planner";

describe("WorkflowPlanner", () => {
  it("builds a complete bootstrap workflow", async () => {
    const planner = new WorkflowPlanner();

    const workflow = await planner.plan({
      prompt: "bootstrap",
      intent: "project-bootstrap",
      confidence: 1,
      entities: {},
    });

    expect(workflow.name).toBe("project-bootstrap");
    expect(workflow.steps).toHaveLength(6);
    expect(workflow.tools).toEqual(["vitest", "github-actions", "wrangler"]);
  });
});
