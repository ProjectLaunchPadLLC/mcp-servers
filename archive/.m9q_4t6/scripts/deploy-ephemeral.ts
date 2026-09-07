import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const cleanup = args.includes("--cleanup");
const explicitName = readArgValue(args, "--name");
const envName = explicitName ?? `infoweave-ephemeral-${Date.now().toString(36)}`;
const compatibilityDate = new Date().toISOString().slice(0, 10);

if (cleanup) {
  runWrangler(["delete", "--name", envName]);
  console.log(`Deleted ephemeral environment: ${envName}`);
  process.exit(0);
}

runWrangler([
  "deploy",
  "src/worker.ts",
  "--name",
  envName,
  "--compatibility-date",
  compatibilityDate,
  "--var",
  `EPHEMERAL_ENV:${envName}`,
]);

console.log(`Deployed ephemeral environment: ${envName}`);
console.log(`Cleanup command: npm run deploy:ephemeral:cleanup -- --name ${envName}`);

function runWrangler(wranglerArgs: string[]) {
  const result = spawnSync("npx", ["wrangler", ...wranglerArgs], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function readArgValue(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return args[index + 1];
}
