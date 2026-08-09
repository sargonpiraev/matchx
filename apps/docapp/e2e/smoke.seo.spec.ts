import { expect, gotoSeoPage, test } from "./lib/seokit";

test("docs page has metadata", async ({ page }) => {
  await gotoSeoPage(page, "/docs");

  await expect(page).toHaveMetadata({
    lang: "en",
    title: /.+/,
  });
});
