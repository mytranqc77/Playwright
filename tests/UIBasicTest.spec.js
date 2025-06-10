import { test, expect } from '@playwright/test';
import { sign } from 'crypto';

test("First Playwright Test", async ({ browser }) => {
  const context = await browser.newContext(); // Create a new browser context, like a new incognito window
  const page = await context.newPage(); // Create a new page in the context
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Navigate to the URL
  console.log(await page.title()); // Log the title of the page
  const username_selector = page.locator("#username");
  const password_selector = page.locator("#password");
  const cardtitle_selector = page.locator(".card-title a");
  const signInBtn_selector = page.locator("#signInBtn");
  await username_selector.fill("rahulshetty"); // Fill the username field
  await password_selector.fill("learning"); // Fill the password field
  await signInBtn_selector.click(); // Click the sign-in button
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toHaveText(
    "Incorrect username/password."
  );
  await username_selector.fill("");
  await username_selector.fill("rahulshettyacademy");
  await signInBtn_selector.click();
  console.log(await cardtitle_selector.first().textContent());
  await expect(cardtitle_selector.first()).toHaveText("iphone X");
  const all_title = await cardtitle_selector.allTextContents();
  console.log(all_title);
});

test("Second Playwright Test", async ({ page }) => {
  await page.goto("https://google.com"); // Navigate to the URL
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("UI control", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const document_link = page.locator('[href*="documents-request"]')
    await page.locator('#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('learning')
    await page.locator('select.form-control').selectOption('consult')
    await page.locator('.checkmark').last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.checkmark').last()).toBeChecked()
    console.log(await page.locator('.checkmark').last().isChecked())
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    await expect(document_link).toHaveAttribute("class", "blinkingText")
});

test('@Handling child window', async({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userNameLocator = page.locator('#username')
    const documentLink = page.locator('[href*="documents-request"]')
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    )
    const rawText = await newPage.locator('.red').textContent()
    const expectedText = rawText.split('@')[1].split(" ")[0]
    await userNameLocator.fill(expectedText)

}
)