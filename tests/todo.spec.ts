import { test, expect } from '@playwright/test';

test.describe('Modal component tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should open and close the modal', async ({ page }) => {
    await page.click('text=Add a list');

    const dialog = page.locator('text=New item');
    await expect(dialog).toBeVisible();

    await page.click('text=submit')
    await expect(dialog).not.toBeVisible();
  });
});
