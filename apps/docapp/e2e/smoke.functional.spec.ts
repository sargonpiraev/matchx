import { test, expect } from './fixtures'

test.describe('smoke.functional.spec.ts', { tag: '@feat' }, () => {
  test('docs home is reachable', async ({ page }) => {
    await page.goto('/docs')

    await expect(page.locator('body')).toBeVisible()
    await expect(page).toHaveURL(/\/docs/)
  })
})
