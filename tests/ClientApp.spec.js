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
  //   const titles = await page.locator(".card-body b").allTextContents();
  const products = page.locator(".card-body");
  const ExpectedProductName = "ZARA COAT 3";
  const countProduct = products.count();
  for (let i = 0; i < countProduct; i++) {
  if ((await products.nth(i).locator("b").textContent()) === ExpectedProductName) 
    {
      await products.nth(i).locator("text =  Add To Cart").click();
      break;
    }
  }
  await page.locator('[routerlink*="cart"]').click()
  await page.waitForLoadState('networkidle')
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  expect(bool).toBeTruthy()

});
