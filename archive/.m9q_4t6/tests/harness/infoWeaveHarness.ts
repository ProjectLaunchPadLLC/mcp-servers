import InfoWeaveServer from "../../src/server";

export async function executePrompt(prompt: string) {
  const server = new InfoWeaveServer();
  const workflow = await server.execute(prompt);

  return {
    server,
    workflow,
    context: server.getContextSnapshot(),
    provenance: server.getProvenanceHistory(),
  };
}
