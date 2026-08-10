import { test, expect } from "./fixtures";
import {
  CWV_BUDGETS,
  enableCpuThrottle4x,
  installCwvCollectors,
  readCwvMetrics,
} from "./lib/cwv";

test("docs home INP under CDP CPU 4x", async ({ page }) => {
  await installCwvCollectors(page);
  await enableCpuThrottle4x(page);

  await page.goto("/docs");
  await expect(page.locator("body")).toBeVisible();

  await page.locator("body").click({ position: { x: 24, y: 24 } });
  await page.keyboard.press("Tab");
  await page.locator("body").click({ position: { x: 40, y: 40 } });

  const metrics = await readCwvMetrics(page);
  expect(metrics.inp, "expected an INP sample from interactions").not.toBeNull();
  expect(metrics.inp!).toBeLessThanOrEqual(CWV_BUDGETS.inpMs);
  expect(metrics.cls).toBeLessThanOrEqual(CWV_BUDGETS.cls);
});
