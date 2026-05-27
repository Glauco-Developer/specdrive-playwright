import type { Page } from '@playwright/test';

/** Dismiss Summit promo bar when present (non-fatal). */
export async function dismissPromoIfPresent(page: Page): Promise<void> {
  const dismiss = page.getByRole('button', { name: 'Dismiss notification' });
  try {
    await dismiss.click({ timeout: 1500 });
  } catch {
    // Banner not shown
  }
}

export async function gotoPath(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await dismissPromoIfPresent(page);
}
