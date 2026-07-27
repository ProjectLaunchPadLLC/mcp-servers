import { Intent } from "./schemas";

export class InfoWeaveParser {
  async parse(prompt: string): Promise<Intent> {
    return {
      prompt,
      intent: "unknown",
      confidence: 0,
      entities: {},
    };
  }
}
