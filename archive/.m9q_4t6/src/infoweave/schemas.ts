export interface Intent {
  prompt: string;
  intent: string;
  confidence: number;
  entities: Record<string, unknown>;
}

export interface Workflow {
  name: string;
  steps: string[];
  tools: string[];
}

export interface PolicyDecision {
  allowed: boolean;
  reason: string;
}
