import { expect as baseExpect, test, type Page } from "@playwright/test";
import { extendSeokitExpect } from "@sargonpiraev/seokit";

export const expect = extendSeokitExpect(baseExpect);
export { test };

function extractSeoHtml(html: string): string {
  const langMatch = html.match(/<html[^>]*\blang="([^"]+)"/i);
  const lang = langMatch?.[1] ?? "";

  const tags = [
    ...html.matchAll(/<title\b[^>]*>[\s\S]*?<\/title>/gi),
    ...html.matchAll(/<meta\b[^>]*>/gi),
    ...html.matchAll(/<link\b[^>]*>/gi),
  ]
    .map((match) => match[0])
    .filter((tag) => !/\brel=["'](?:preload|modulepreload|prefetch)["']/i.test(tag));

  const jsonLdScripts = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    ),
  ]
    .map((match) => match[0])
    .join("");

  return `<!DOCTYPE html><html lang="${lang}"><head>${tags.join("")}</head><body>${jsonLdScripts}</body></html>`;
}

export async function gotoSeoPage(page: Page, pathname: string) {
  const response = await page.request.get(pathname);
  expect(response.ok()).toBeTruthy();
  const slimHtml = extractSeoHtml(await response.text());
  await page.setContent(slimHtml, { waitUntil: "domcontentloaded" });
}
