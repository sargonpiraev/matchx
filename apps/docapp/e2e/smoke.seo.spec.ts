import { expect, gotoSeoPage, test } from "./lib/seokit";

test.describe("smoke.seo.spec.ts", { tag: '@seokit' }, () => {
test("docs page has metadata", async ({ page }) => {
  await gotoSeoPage(page, "/docs");

  await expect(page).toHaveMetadata({
    lang: "en",
    title: /.+/,
  });
});

});
