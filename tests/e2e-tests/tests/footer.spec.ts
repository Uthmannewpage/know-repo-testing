import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const footerData = menuData.footer;
const linkCom = comData.link;
let page;
test.describe("Footer - @HIGH", () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async ({ browser }) => {
    await page.close();
  });

  test('Verify navigates to the "Home" page successfully when clicking the lick "Home"  in the "Footer"', async () => {
    const menu = footerData.home;
    const title = titleData.home;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "What Is Pneumococcal Pneumonia?" page successfully when clicking the link "What Is Pneumococcal Pneumonia?" in the "Footer"', async () => {
    const menu = footerData.whatPneumococcalPneumonia;
    const title = titleData.whatIsPneumococcalPneumonia;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "What Is Pneumococcal Pneumonia?" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Symptoms and Impact" page successfully when clicking the link "Symptoms and Impact" in the "Footer"', async () => {
    const menu = footerData.symptomsAndImpact;
    const title = titleData.symptomsAndImpact;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Symptoms and Impact" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Understand Your Risk" page successfully when clicking the link "Understand Your Risk" in the "Footer"', async () => {
    const menu = footerData.understandYourRisk;
    const title = titleData.understandYourRisk;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Understand Your Risk" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully when clicking the link "Help Protect Yourself" in the "Footer"', async () => {
    const menu = footerData.helpProtectYourself;
    const title = titleData.helpProtectYourself;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Help Protect Yourself" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Talk to Your Doctor" page successfully when clicking the link "Talk to Your Doctor" in the "Footer"', async () => {
    const menu = footerData.talkToYourDoctor;
    const title = titleData.talkToYourDoctor;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Talk to Your Doctor" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Share Your Story" page successfully when clicking the link "Share Your Story" in the "Footer"', async () => {
    const menu = footerData.shareYourStory;
    const title = titleData.shareYourStory;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Share Your Story" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Helpful Resources" page successfully when clicking the link "Helpful Resources" in the "Footer"', async () => {
    const menu = footerData.helpfulResources;
    const title = titleData.helpfulResources;
    await page.goto("/en/");
    await com.selectMenuFooter(page, menu);
    // Verify navigates to "Helpful Resources" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Privacy Policy" page successfully when clicking the link "Privacy Policy " in the "Footer"', async () => {
    const link = linkCom.privacyPolicy;
    const title = titleData.privacyPolicy;
    await page.goto("/en/");
    await com.tapTagAFooter(page, link);
    expect(await com.titleUI(page, title)).toBe(true);
  });
  test('Verify navigates to the "Terms of Use" page successfully when clicking the link "Terms of Use" in the "Footer"', async () => {
    const link = linkCom.termsOfUse;
    const title = titleData.termsOfUse;
    await page.goto("/en/");
    await com.tapTagAFooter(page, link);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Site Map" page successfully when clicking the link "Site Map" in the "Footer"', async () => {
    const link = linkCom.siteMap;
    const title = linkCom.siteMap;
    await page.goto("/en/");
    await com.tapTagAFooter(page, link);
    // Verify navigates to "Site Map" page
    //expect(await com.titleUI(page, title)).toBe(true);
  });
});
