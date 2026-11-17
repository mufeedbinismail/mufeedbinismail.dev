import { expect, test } from '@playwright/test';

test('every write-up linked from the work list opens its page', async ({ page }) => {
  await page.goto('/');
  const hrefs = [...new Set(await page.locator('#work a[href^="/work/"]').evaluateAll((links) => links.map((a) => a.getAttribute('href'))))];
  expect(hrefs).toHaveLength(6);
  for (const href of hrefs) {
    await page.goto(href!);
    const drawer = page.locator('dialog.drawer');
    await expect(drawer, href!).toBeVisible();
    await expect(drawer.getByText('The problem'), href!).toBeVisible();
  }
});

test("a write-up's own URL opens the home page with the drawer open", async ({ page }) => {
  await page.goto('/work/workflow-engine');
  const drawer = page.locator('dialog.drawer');
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('heading', { level: 2 })).toContainText('workflow engine');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mohamed Mufeed');

  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/\/work\/innodb-recovery$/);

  await drawer.getByRole('link', { name: 'Close' }).click();
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#work')).toBeVisible();
});

test('write-ups open in a drawer that follows the URL and the keyboard', async ({ page }) => {
  await page.goto('/');
  const drawer = page.locator('dialog.drawer');
  const firstLink = page.locator('#work h4 a[href="/work/acodax-repository"]');

  await firstLink.click();
  await expect(drawer).toBeVisible();
  await expect(page).toHaveURL(/\/work\/acodax-repository$/);
  await expect(drawer.getByText('Write-up 01 / 06')).toBeVisible();

  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/\/work\/client-onboarding$/);
  await expect(drawer.getByRole('heading', { level: 2 })).toContainText('One core codebase');

  await drawer.getByRole('link', { name: '← Prev' }).click();
  await expect(page).toHaveURL(/\/work\/acodax-repository$/);

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
  await expect(firstLink).toBeFocused();
});

test('the browser back button closes the drawer', async ({ page }) => {
  await page.goto('/');
  await page.locator('#experience a[href^="/work/"]').first().click();
  await expect(page.locator('dialog.drawer')).toBeVisible();
  await page.goBack();
  await expect(page.locator('dialog.drawer')).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
});

test('a write-up page renders fully without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/innodb-recovery');
  const drawer = page.locator('dialog.drawer');
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('heading', { level: 2 })).toContainText('dropped database');
  await expect(drawer.getByText('The problem')).toBeVisible();
  // The bar's controls are real links, so they still work without JavaScript.
  // (Checked by address: Playwright's click stability check stalls when JavaScript is off.)
  await expect(drawer.getByRole('link', { name: 'Next →' })).toHaveAttribute('href', '/work/acodax-repository');
  await expect(drawer.getByRole('link', { name: 'Close' })).toHaveAttribute('href', '/');
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
  expect(hrefs).toHaveLength(1);
  for (const href of hrefs) {
    const response = await request.get(href!);
    expect(response.ok(), href!).toBe(true);
    expect((await response.body()).subarray(0, 5).toString(), href!).toBe('%PDF-');
  }
});
