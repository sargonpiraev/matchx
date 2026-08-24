import { defineConfig, devices } from "@playwright/test";
import type { NextcovConfig } from "nextcov";

type PlaywrightConfigWithNextcov = Parameters<typeof defineConfig>[0] & {
  nextcov?: NextcovConfig;
};

const port = Number(process.env.MATCHX_DOCS_PW_PORT ?? "3001");
const hostURL = `http://127.0.0.1:${port}`;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? hostURL;
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
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}{-project}-linux{ext}",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
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
    command: `npx turbo run build --filter=@matchx/docapp^... && npx next dev --port ${port}`,
    url: hostURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  ...(withCoverage ? { nextcov } : {}),
};

export default defineConfig(config);
