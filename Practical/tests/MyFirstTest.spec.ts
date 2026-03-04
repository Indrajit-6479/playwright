import { test, expect } from '@playwright/test';

//syntax to write test cases in Playwright
// test('Title of the test case',() => {
//     // steps to execute the test case
// })

test("Verify Page Title", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    let title = await page.title();
    console.log("Current Title is: " + title);

    await expect(page).toHaveTitle("Automation Exercise");
})

test("Verify URL", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    let url = await page.url();
    console.log("Current Url is: " + url);

    await expect(page).toHaveURL("https://automationexercise.com/");
})