import { expect, type Page } from '@playwright/test';

type TextMatch = string | RegExp;

type ActionTarget = {
  role?: 'link' | 'button';
  name: TextMatch;
  href?: string | RegExp;
};

export type PageSpec = {
  name: string;
  path: string;
  title?: TextMatch;
  hero?: TextMatch;
  navigation?: TextMatch[];
  sections?: TextMatch[];
  ctas?: ActionTarget[];
  footer?: TextMatch[];
  dismissButtons?: TextMatch[];
};

async function dismissOptionalOverlays(page: Page, labels: TextMatch[] = []): Promise<void> {
  for (const label of labels) {
    try {
      await page.getByRole('button', { name: label }).first().click({ timeout: 1000 });
    } catch {
      // Overlay not present.
    }
  }
}

export async function openPage(page: Page, spec: PageSpec): Promise<void> {
  await page.goto(spec.path, { waitUntil: 'domcontentloaded' });
  await dismissOptionalOverlays(page, spec.dismissButtons);
}

export async function expectPageTitle(page: Page, title: TextMatch): Promise<void> {
  await expect(page).toHaveTitle(title);
}

export async function expectHero(page: Page, hero: TextMatch): Promise<void> {
  await expect(page.getByRole('heading', { level: 1, name: hero })).toBeVisible();
}

export async function expectNavigation(page: Page, navigation: TextMatch[]): Promise<void> {
  const nav = page.getByRole('navigation').first();
  for (const item of navigation) {
    await expect(nav.getByRole('link', { name: item }).first()).toBeVisible();
  }
}

export async function expectSections(page: Page, sections: TextMatch[]): Promise<void> {
  for (const section of sections) {
    await expect(page.getByRole('heading', { name: section }).first()).toBeVisible();
  }
}

export async function expectCtas(page: Page, ctas: ActionTarget[]): Promise<void> {
  for (const cta of ctas) {
    const target = page.getByRole(cta.role ?? 'link', { name: cta.name }).first();
    await expect(target).toBeVisible();
    if (cta.href) {
      await expect(target).toHaveAttribute('href', cta.href);
    }
  }
}

export async function expectFooter(page: Page, footer: TextMatch[]): Promise<void> {
  for (const item of footer) {
    await expect(page.getByText(item).first()).toBeVisible();
  }
}
