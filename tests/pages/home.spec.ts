import { expect, test } from '@playwright/test';
import {
  expectCtas,
  expectFooter,
  expectHero,
  expectNavigation,
  expectPageTitle,
  expectSections,
  openPage,
  type PageSpec,
} from '../helpers/page-spec';

const homePage: PageSpec = {
  name: 'Home',
  path: '/',
  title: /Example Domain/i,
  hero: /Example Domain/i,
  navigation: ['Docs', 'Pricing', 'Contact'],
  sections: ['Features', 'Testimonials', 'FAQ'],
  ctas: [{ name: 'Get started', href: /\/signup\/?$/ }],
  footer: ['Privacy policy', 'Terms', 'Contact'],
  dismissButtons: ['Accept', 'Close'],
};

test.describe('Home @stable', () => {
  test.skip(true, 'Replace this placeholder spec with project-specific assertions.');

  test.beforeEach(async ({ page }) => {
    await openPage(page, homePage);
  });

  test('has the expected document title', async ({ page }) => {
    await expectPageTitle(page, homePage.title!);
  });

  test('shows the main heading', async ({ page }) => {
    await expectHero(page, homePage.hero!);
  });

  test('shows the main navigation', async ({ page }) => {
    await expectNavigation(page, homePage.navigation!);
  });

  test('shows the key page sections', async ({ page }) => {
    await expectSections(page, homePage.sections!);
  });

  test('shows the main CTAs', async ({ page }) => {
    await expectCtas(page, homePage.ctas!);
  });

  test('shows the footer landmarks', async ({ page }) => {
    await expectFooter(page, homePage.footer!);
  });
});

test.describe('Home @volatile', () => {
  test.skip(true, 'Add volatile checks only after exploring the real page with MCP.');

  test.beforeEach(async ({ page }) => {
    await openPage(page, homePage);
  });

  test('shows at least one rotating content item', async ({ page }) => {
    const rotatingItems = page.locator('article, [data-rotating-item]');
    await expect(rotatingItems.first()).toBeVisible();
    expect(await rotatingItems.count()).toBeGreaterThanOrEqual(1);
  });
});
