import { defineConfig, devices } from "@playwright/test";
import type { NextcovConfig } from "nextcov";

type PlaywrightConfigWithNextcov = Parameters<typeof defineConfig>[0] & {
  nextcov?: NextcovConfig;
};

const port = Number(process.env.MATCHX_DOCS_PW_PORT ?? "3001");
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`;
const withCoverage = process.env.E2E_COVERAGE === "true";

export const nextcov: NextcovConfig = {
  cdpPort: 9232,
  buildDir: ".next",
  outputDir: "coverage",
  sourceRoot: "./",
  include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  exclude: ["**/*.test.ts", "**/*.spec.ts", "e2e/**"],
  reporters: ["html", "json", "text-summary"],
  log: false,
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
  projects: [
    {
      name: "functional",
      testMatch: "**/*.functional.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "functional-mobile",
      testMatch: "**/*.functional.spec.ts",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "seo",
      testMatch: "**/*.seo.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "analytics",
      testMatch: "**/*.analytics.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual",
      testMatch: "**/*.visual.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual-mobile",
      testMatch: "**/*.visual.spec.ts",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "cwv",
      testMatch: "**/*.cwv.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
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
