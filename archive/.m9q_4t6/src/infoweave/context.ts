export class ContextManager {
  private state = new Map<string, unknown>();

  set(key: string, value: unknown) {
    this.state.set(key, value);
  }

  get<T = unknown>(key: string): T | undefined {
    return this.state.get(key) as T | undefined;
  }

  clear() {
    this.state.clear();
  }

  snapshot() {
    return Object.fromEntries(this.state.entries());
  }
}
