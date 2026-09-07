export class ProvenanceLogger {
  private history: unknown[] = [];

  record(event: unknown) {
    this.history.push({
      timestamp: new Date().toISOString(),
      event,
    });
  }

  all() {
    return this.history;
  }
}
