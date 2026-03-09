import { test, expect, Locator } from '@playwright/test';

test("Verify Playwright Locators", async ({ page }) => {
    // await page.goto("https://demo.nopcommerce.com/");
    //
    // // 1. Using page.getByAltText()
    // const logo: Locator = page.getByAltText("nopCommerce demo store");
    // await expect(logo).toBeVisible();
    //
    // // 2. Using page.getByText()
    // await expect(page.getByText("Welcome to our store")).toBeVisible(); //full text
    // // await expect(page.getByText("welcome")).toBeVisible(); //partial text
    // // await expect(page.getByText("/Welcome\s+To\s+Our\s+Store/i")).toBeVisible(); //regex
    //
    // //3. Using page.getByRole()
    // await page.getByRole("link", {name: 'Register'}).click();
    // await expect(page.getByRole("heading",{name: 'Register'})).toBeVisible();
    //
    // //4. Using page.getByLabel()
    // await page.getByLabel('First name:').fill('John');
    // await page.getByLabel('Last name:').fill('Doe');
    // await page.getByLabel('Email:').fill('john@gmail.com');
    //
    // //5. Using page.getByPlaceholder()
    // await page.getByPlaceholder('Search store').fill('Macbook');

    //6. Using page.getByTitle()
    await page.goto('file:///Users/indrajitrananavare/Downloads/MY%20NEW%20DATA/MyProjects/Playwright_2025/Practical/website_source_code/app.html');
    await expect(page.getByTitle("Home page link")).toHaveText("Home");
    await expect(page.getByTitle('HyperText Markup Language')).toHaveText('HTML');

    //7. Using page.getByTestId()
    await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
    await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
})