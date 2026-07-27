# mcp-servers

## Overview

This repository contains an InfoWeave orchestration server and a Cloudflare Worker wrapper that can plan and execute structured workflow intents.

## Project capabilities

- Test harness and automated unit/integration tests with Vitest
- Workflow planning for broad bootstrap requests (tests, docs, workflows, worker integration, deployment)
- Policy gate for destructive production actions
- Cloudflare Worker endpoint (`POST /execute`) for remote execution
- Ephemeral environment deployment script using Wrangler

## Setup

```bash
npm install
```

## Validation commands

```bash
npm run typecheck
npm run test
npm run build
```

## Test harness

The harness is implemented at `/home/runner/work/mcp-servers/mcp-servers/tests/harness/infoWeaveHarness.ts` and provides a single helper to execute prompts and inspect context/provenance.

## Cloudflare Worker usage

Run locally:

```bash
npm run worker:dev
```

Call execution endpoint:

```bash
curl -X POST http://127.0.0.1:8787/execute \
  -H 'content-type: application/json' \
  -d '{"prompt":"Create tests, docs, workflows, cloudflare workers, and ephemeral deployment"}'
```

## Ephemeral environment deployment

Deploy:

```bash
npm run deploy:ephemeral
```

Deploy with custom name:

```bash
npm run deploy:ephemeral -- --name infoweave-ephemeral-mybranch
```

Cleanup:

```bash
npm run deploy:ephemeral:cleanup -- --name infoweave-ephemeral-mybranch
```

## GitHub workflows

- `CI` (`/.github/workflows/ci.yml`): typecheck, test, and build on push and pull request
- `Ephemeral Worker Environment` (`/.github/workflows/ephemeral-env.yml`): manual deployment via workflow dispatch
