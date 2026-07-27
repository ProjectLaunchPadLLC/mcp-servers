import { describe, expect, it } from "vitest";
import worker from "../../src/worker";

describe("Cloudflare worker", () => {
  it("returns a workflow for valid execute requests", async () => {
    const request = new Request("https://example.com/execute", {
      method: "POST",
      body: JSON.stringify({
        prompt: "Create tests, docs, workflows, cloudflare workers, and ephemeral deployment",
      }),
    });

    const response = await worker.fetch(request);
    const body = (await response.json()) as { workflow: { name: string } };

    expect(response.status).toBe(200);
    expect(body.workflow.name).toBe("project-bootstrap");
  });

  it("rejects invalid requests", async () => {
    const request = new Request("https://example.com/execute", {
      method: "POST",
      body: JSON.stringify({ prompt: "" }),
    });

    const response = await worker.fetch(request);

    expect(response.status).toBe(400);
  });
});
