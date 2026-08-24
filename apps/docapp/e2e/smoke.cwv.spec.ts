import { test, expect } from "./fixtures";
import {
  CWV_BUDGETS,
  enableCpuThrottle4x,
  installCwvCollectors,
  waitForInpSample,
} from "./lib/cwv";

test("docs home INP under CDP CPU 4x", async ({ page }) => {
  await installCwvCollectors(page);
  await enableCpuThrottle4x(page);

  await page.goto("/docs");
  await expect(page.locator("body")).toBeVisible();

  const docsLink = page.getByRole("link").nth(1);
  await docsLink.click({ delay: 200 });
  await page.getByRole("heading").first().click({ delay: 200 });

  const metrics = await waitForInpSample(page);
  expect(metrics.inp, "expected an INP sample from interactions").not.toBeNull();
  expect(metrics.inp!).toBeLessThanOrEqual(CWV_BUDGETS.inpMs);
  expect(metrics.cls).toBeLessThanOrEqual(CWV_BUDGETS.cls);
});
