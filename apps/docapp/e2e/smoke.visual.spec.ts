import { test, expect } from "./fixtures";

test.describe("visual smoke", () => {
  test("docs desktop screenshot", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "visual", "desktop snapshots only");

    await page.goto("/docs");
    await expect(page.locator("body")).toBeVisible();
    await expect(page).toHaveScreenshot("docs-desktop.png", {
      fullPage: true,
    });
  });

  test("docs mobile screenshot", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "visual-mobile", "mobile snapshots only");

    await page.goto("/docs");
    await expect(page.locator("body")).toBeVisible();
    await expect(page).toHaveScreenshot("docs-mobile.png", {
      fullPage: true,
    });
  });
});
