import { expect, test } from '@playwright/test';

test('case studies open in a drawer that follows the URL and the keyboard', async ({ page }) => {
  await page.goto('/');
  const drawer = page.locator('dialog.drawer');
  const firstRow = page.locator('a.case-row').first();

  await firstRow.click();
  await expect(drawer).toBeVisible();
  await expect(page).toHaveURL(/\/work\/innodb-recovery$/);

  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/\/work\/client-onboarding$/);
  await expect(drawer.getByRole('heading', { level: 2 })).toContainText('New-client deployment');

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
  await expect(firstRow).toBeFocused();
});

test('the browser back button closes the drawer', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.case-row').nth(2).click();
  await expect(page.locator('dialog.drawer')).toBeVisible();
  await page.goBack();
  await expect(page.locator('dialog.drawer')).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
});

test('a case study page renders fully without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/innodb-recovery');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('dropped database');
  await expect(page.getByText('The problem')).toBeVisible();
  await context.close();
});

test('contact details are revealed one at a time and hidden again on close', async ({ page }) => {
  await page.goto('/');
  const dialog = page.locator('dialog.contact-dialog');
  await expect(page.locator('body')).not.toContainText('@gmail.com');

  await page.getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Show email' }).click();
  await expect(dialog.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Show phone' })).toBeVisible();

  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'Show email' })).toBeVisible();
  await expect(dialog.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test('dark is the default and a switch to light is remembered', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('nothing scrolls sideways on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  for (const path of ['/', '/work/client-onboarding', '/404']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test('every CV download link serves a PDF', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = [...new Set(await page.locator('#experience a[href^="/cv/"]').evaluateAll((links) => links.map((a) => a.getAttribute('href'))))];
  expect(hrefs).toHaveLength(3);
  for (const href of hrefs) {
    const response = await request.get(href!);
    expect(response.ok(), href!).toBe(true);
    expect((await response.body()).subarray(0, 5).toString(), href!).toBe('%PDF-');
  }
});
