import {test, expect, Locator} from '@playwright/test';
test("Verify CSS Locators", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    // 1. Using CSS Selector for ID => tag#id
    await expect(page.locator("input#small-searchterms")).toBeVisible();
    // const searchBox:Locator = page.locator("input#small-searchterms");
    // await searchBox.fill("laptop");

    await page.locator("input#small-searchterms").fill("laptop");

    // 2. Using CSS Selector for Class => tag.class
    await expect(page.locator("input.search-box-text")).toBeVisible();
    await page.locator("input#small-searchterms").fill("laptop");

    // 3. Using CSS Selector for Attribute => tag[attribute='value']
    await expect(page.locator("input[name='q']")).toBeVisible();
    await page.locator("input[name='q']").fill("laptop");

    //4. Using CSS Selector for tag with class and attribute => tag.class[attribute='value']
    await expect(page.locator("input.search-box-text[name='q']")).toBeVisible();
    await page.locator("input.search-box-text[name='q']").fill("laptop");
})