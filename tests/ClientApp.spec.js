import { test, expect } from "@playwright/test";

test("Access Client App", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("takayami79@gmail.com");
  await page.locator("#userPassword").fill("Test!234");
  await page.locator("#login").click();
  // await page.locator('.card-body b').first().textContent()
  // expect(page.locator('.card-body b').first()).toHaveText('ZARA COAT 3')
  await page.waitForLoadState("networkidle");
  // await page.locator('.card-body b').first().waitFor()
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});


