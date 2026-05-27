import { test, expect } from '@playwright/test';
import { gotoPath } from '../fixtures/page-helpers';
import { siteContract as site } from '../fixtures/site-contract';

test.describe('Homepage @stable', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page, '/');
  });

  test('has brand in document title', async ({ page }) => {
    await expect(page).toHaveTitle(site.brandTitle);
  });

  test('shows hero heading and tagline', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: site.hero.h1 })).toBeVisible();
    await expect(page.getByText(site.hero.tagline)).toBeVisible();
  });

  test('shows hero CTAs with expected paths', async ({ page }) => {
    const { joinToday, alreadyMember } = site.ctas;
    await expect(page.getByRole('link', { name: joinToday.name })).toHaveAttribute(
      'href',
      joinToday.href,
    );
    await expect(page.getByRole('link', { name: alreadyMember.name })).toHaveAttribute(
      'href',
      alreadyMember.href,
    );
  });

  test('shows primary navigation', async ({ page }) => {
    const nav = page.getByRole('navigation');
    for (const name of site.primaryNav) {
      await expect(nav.getByRole('link', { name }).first()).toBeVisible();
    }
  });

  test('shows utility header links', async ({ page }) => {
    for (const name of site.utilityNav) {
      await expect(page.getByRole('link', { name }).first()).toBeVisible();
    }
  });

  test('shows How we help section with service cards', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.howWeHelp }),
    ).toBeVisible();

    for (const { heading, cta } of site.serviceCards) {
      await expect(page.getByRole('heading', { level: 3, name: heading })).toBeVisible();
      await expect(page.getByRole('link', { name: cta }).first()).toBeVisible();
    }
  });

  test('shows What we are working on section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.workingOn }),
    ).toBeVisible();
    for (const name of site.workingOnLinks) {
      await expect(page.getByRole('link', { name }).first()).toBeVisible();
    }
  });

  test('shows membership section with become-member CTA', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.whyJoin }),
    ).toBeVisible();
    await expect(
      page.locator('a[href*="membership/become-a-member"]'),
    ).toHaveAttribute('href', site.ctas.becomeMember.hrefPattern);
  });

  test('shows footer landmarks', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.funders }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.newsletter }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: site.footer.subscribeLink }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.helpfulLinks }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: site.footer.privacyLink }).first(),
    ).toBeVisible();
    await expect(page.getByText(site.footer.copyright)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to top' })).toBeVisible();
  });

  test('skip link targets main content', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Skip to Main Content' })).toBeVisible();
  });
});

test.describe('Homepage @volatile', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page, '/');
  });

  test('news section has feed links (titles rotate)', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.news }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: site.ctas.viewAllNews.name }),
    ).toHaveAttribute('href', site.ctas.viewAllNews.href);

    // Article URLs include a slug segment; index-only links are excluded
    const articleLinks = page.locator('a[href*="/news-and-updates/"][href*="-"]');
    await expect(articleLinks.first()).toBeVisible();
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(site.minNewsArticleLinks);
  });

  test('membership section lists at least three benefits', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 2, name: site.sections.whyJoin }),
    ).toBeVisible();
    const benefits = page.getByRole('listitem').filter({
      hasText: /deals|training|nonprofit|policies|jobs/i,
    });
    expect(await benefits.count()).toBeGreaterThanOrEqual(3);
  });
});
