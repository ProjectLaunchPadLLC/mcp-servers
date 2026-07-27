import { describe, expect, it } from "vitest";
import { InfoWeaveParser } from "../../src/infoweave/parser";

describe("InfoWeaveParser", () => {
  it("classifies a broad delivery request as project-bootstrap", async () => {
    const parser = new InfoWeaveParser();

    const result = await parser.parse(
      "Create tests, docs, workflows, cloudflare worker integration, and deploy an ephemeral environment"
    );

    expect(result.intent).toBe("project-bootstrap");
    expect(result.confidence).toBeGreaterThanOrEqual(0.6);
    expect(result.entities).toMatchObject({
      tests: true,
      docs: true,
      workflows: true,
      workers: true,
      deploy: true,
    });
  });
});
