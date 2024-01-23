import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import HomePage from "@pom/HomePage";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const homePage = new HomePage();
const menuMain = menuData.menuMain;
const linkIcon = comData.linkIcon;
let page;
test.describe.configure({ mode: "serial" });
test.describe("Home - @HIGH", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/en/");
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify navigates to "What is Pneumococcal Pneumonia?" page successfully when clicking the "See how it could affect you" button of slide 1 on carousel', async () => {
    const title = titleData.whatIsPneumococcalPneumonia;
    await page.goto("/en/");
    await homePage.click(page, homePage.switchSlide1Icon);
    await homePage.tapSeeHowItCouldAffectYouBtn(page);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Understand Your Risk" page successfully when clicking the "Find out more" button of "65 or older"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/");
    await homePage.click(page, homePage.findOutMore65btn);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Understand Your Risk" page successfully when clicking the "Find out more" button of "19 or older"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/");
    await homePage.click(page, homePage.findOutMore19btn);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "prevnar" page when clicking "Learn about a vaccine option" ', async () => {
    await page.goto("/en/");
    await homePage.click(page, homePage.learnAboutAVaccineOption);
    await expect(page).toHaveURL(/.*adult.prevnar20.com/);
  });

  //
  test('Verify navigates to "What is Pneumococcal Pneumonia?" page when clicking "Learn more about pneumococcal pneumonia" icon" ', async () => {
    const title = "WHAT IS PNEUMOCOCCAL PNEUMONIA?";
    await page.goto("/en/");
    const icon = linkIcon.LearnMoreAboutPneumococcalPneumonia;
    await com.tapTagA(page, icon);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Symptoms And Impact" page when clicking "Understand the symptoms and impact " icon" ', async () => {
    const title = titleData.symptomsAndImpact;
    await page.goto("/en/");
    const icon = linkIcon.understandTheSymptomsSndImpact;
    await com.tapTagA(page, icon);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Take Action" page when clicking "Talk to your doctor or pharmacist " icon', async () => {
    const title = titleData.takeAction;
    await page.goto("/en/");
    const icon = linkIcon.talkToYourDoctorOrPharmacist;
    await com.tapTagA(page, icon);
    expect(await com.titleUI(page, title)).toBe(true);
  });
});
