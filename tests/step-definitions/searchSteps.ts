import {Given, When, Then} from '@cucumber/cucumber';
import {expect, chromium, Page} from "@playwright/test";

let page:Page;

Given('I am on the home page', async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com', {
        waitUntil: 'domcontentloaded',
    });
    const acceptCookies = page.locator('button:has-text("Consent")');

        await acceptCookies
            .first()
            .waitFor({state: 'visible', timeout: 5000})
            .then(async() => {
                await acceptCookies.click();
            })
            .catch(() => {});
    await expect(page).toHaveURL('https://automationexercise.com/');
});

When('I search for {string}', async(searchTerm:string) => {
    await page.click('a[href="/products"]');
    await page.fill('input[name="search"]', searchTerm);
    await page.click('#submit_search');
});

Then('I should see at least one search result', async() => {
    const results = await page.locator('.product-image-wrapper');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
});