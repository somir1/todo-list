import { test, expect } from '@playwright/test';

test.describe('Todo list component tests', () => {

  test.beforeEach(async ({ page }) => {  
    await page.goto('http://localhost:3000/');

    await page.addInitScript(() => {
      window.mockTasks = [
        { id: '1', text: 'Mock Task 1' },
        { id: '2', text: 'Mock Task 2' },
      ];
      console.log("Mock tasks added", window.mockTasks);
    });
    
  });

  test('should open and close the modal', async ({ page }) => {
    await page.click('text=Add a list');

    const dialog = page.locator('text=New item');
    await expect(dialog).toBeVisible();

    await page.click('text=submit')
    await expect(dialog).not.toBeVisible();
  });

  test('should open modal and add a task', async ({ page }) => {
    await page.click('text=Add a list');

    const modal = page.getByPlaceholder("Type here");
    await expect(modal).toBeVisible();

    await page.fill('input[type="text"][placeholder="Type here"]', 'Test task');
    await page.click('text=Submit');
    await expect(modal).not.toBeVisible();
  });

  test('should render tasks correctly and delete', async ({ page }) => {
   
    await page.click('text=Add a list');
    const modal = page.getByPlaceholder("Type here");
    await expect(modal).toBeVisible();

    await page.fill('input[type="text"][placeholder="Type here"]', 'Test task');
    await page.click('text=Submit');
    await expect(modal).not.toBeVisible()
  
    await expect(page.locator('text=Test task')).toBeVisible();

    await page.click('#delete');

    const deletemodal = page.getByText("Are you sure you want to delete this task?");
    await expect(deletemodal).toBeVisible();

    await page.click('text=Yes');
    await expect(deletemodal).not.toBeVisible();

  });

  test('should render tasks correctly and cancel delete', async ({ page }) => {
   
    await page.click('text=Add a list');
    const modal = page.getByPlaceholder("Type here");
    await expect(modal).toBeVisible();

    await page.fill('input[type="text"][placeholder="Type here"]', 'Test task');
    await page.click('text=Submit');
    await expect(modal).not.toBeVisible()
  
    await expect(page.locator('text=Test task')).toBeVisible();

    await page.click('#delete');

    const deletemodal = page.getByText("Are you sure you want to delete this task?");
    await expect(deletemodal).toBeVisible();

    await page.click('text=No');
    await expect(deletemodal).not.toBeVisible();

  });

  test('should render tasks correctly and edit', async ({ page }) => {
   
    await page.click('text=Add a list');
    const modal = page.getByPlaceholder("Type here");
    await expect(modal).toBeVisible();

    await page.fill('input[type="text"][placeholder="Type here"]', 'Test task');
    await page.click('text=Submit');
    await expect(modal).not.toBeVisible()
  
    await expect(page.locator('text=Test task')).toBeVisible();

    await page.click('#edit');

    const editModal = page.getByText("Edit task");
    await expect(editModal).toBeVisible();

    const editInput = page.locator('input[type="text"]').first();
    await editInput.fill('Test task2');

  });
});
