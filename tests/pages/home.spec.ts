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
  name: 'Homepage',
  path: '/',
  title: /The Wheel: Supporting & Representing Charities/,
  hero: /Ireland.s national association of charities/i,
  navigation: [
    'Become a Member',
    'Get Support',
    'Our Work',
    'About Us',
    'Member Hub',
    'News and Updates',
  ],
  sections: ['How we help', /What we.re working on/i, 'Why join us at The Wheel?'],
  ctas: [
    { name: 'Join us today', href: /\/join-us\/?$/ },
    { name: 'Already a member?', href: /\/login\/?$/ },
    { name: 'View all news and updates', href: /\/news-and-updates\/?$/ },
  ],
  footer: ['Our funders', 'Newsletter sign up', 'Helpful links', 'Privacy policy'],
  dismissButtons: ['Dismiss notification'],
};

test.describe('Homepage @stable', () => {
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

test.describe('Homepage @volatile', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, homePage);
  });

  test('shows at least one news article link', async ({ page }) => {
    const articleLinks = page.locator('a[href*="/news-and-updates/"][href*="-"]');
    await expect(articleLinks.first()).toBeVisible();
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(1);
  });
});
