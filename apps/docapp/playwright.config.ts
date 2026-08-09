import { defineConfig, devices } from "@playwright/test";
import type { NextcovConfig } from "nextcov";

import harness from "./playwright.harness.json" with { type: "json" };

type PlaywrightConfigWithNextcov = Parameters<typeof defineConfig>[0] & {
  nextcov?: NextcovConfig;
};

const port = Number(process.env.MATCHX_DOCS_PW_PORT ?? "3001");
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`;
const withCoverage = process.env.E2E_COVERAGE === "true";

export const nextcov: NextcovConfig = {
  cdpPort: 9232,
  buildDir: ".next",
  outputDir: harness.coverage?.reportDir ?? "coverage",
  sourceRoot: "./",
  include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  exclude: ["**/*.test.ts", "**/*.spec.ts", "e2e/**"],
  reporters: ["html", "json", "text-summary"],
  log: false,
};

const projectDevices: Record<string, (typeof devices)[string]> = {
  functional: devices["Desktop Chrome"],
  "functional-mobile": devices["Pixel 5"],
  seo: devices["Desktop Chrome"],
  analytics: devices["Desktop Chrome"],
  visual: devices["Desktop Chrome"],
  "visual-mobile": devices["Pixel 5"],
};

const testMatchByProject: Record<string, string> = {
  functional: "**/*.functional.spec.ts",
  "functional-mobile": "**/*.functional.spec.ts",
  seo: "**/*.seo.spec.ts",
  analytics: "**/*.analytics.spec.ts",
  visual: "**/*.visual.spec.ts",
  "visual-mobile": "**/*.visual.spec.ts",
};

const config: PlaywrightConfigWithNextcov = {
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
  },
  projects: harness.projects.map((name) => ({
    name,
    testMatch: testMatchByProject[name],
    use: { ...projectDevices[name] },
  })),
  webServer: {
    command: `npx next dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  ...(withCoverage ? { nextcov } : {}),
};

export default defineConfig(config);
