import { describe, expect, it } from "vitest";
import { PolicyEngine } from "../../src/infoweave/policy";

describe("PolicyEngine", () => {
  it("blocks destructive production actions", async () => {
    const policy = new PolicyEngine();

    const decision = await policy.evaluate({
      name: "danger",
      steps: ["Delete production data"],
      tools: [],
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toContain("blocked");
  });
});
