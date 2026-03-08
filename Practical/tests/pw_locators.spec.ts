import { test, expect, Locator } from '@playwright/test';

test("Verify Playwright Locators", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");

    // 1. Using page.getByAltText()
    const logo: Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    // 2. Using page.getByText()
    await expect(page.getByText("Welcome to our store")).toBeVisible(); //full text
    // await expect(page.getByText("welcome")).toBeVisible(); //partial text
    // await expect(page.getByText("/Welcome\s+To\s+Our\s+Store/i")).toBeVisible(); //regex

    //3. Using page.getByRole()
    await page.getByRole("link", {name: 'Register'}).click();
    await expect(page.getByRole("heading",{name: 'Register'})).toBeVisible();
})