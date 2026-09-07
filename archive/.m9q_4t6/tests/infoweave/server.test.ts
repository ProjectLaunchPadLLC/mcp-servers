import { describe, expect, it } from "vitest";
import { executePrompt } from "../harness/infoWeaveHarness";

describe("InfoWeaveServer", () => {
  it("executes and records context/provenance", async () => {
    const result = await executePrompt(
      "Create tests, docs, workflows, cloudflare worker integration, and deploy an ephemeral environment"
    );

    expect(result.workflow.name).toBe("project-bootstrap");
    expect(result.context.lastPrompt).toContain("Create tests");
    expect(result.provenance).toHaveLength(1);
  });
});
