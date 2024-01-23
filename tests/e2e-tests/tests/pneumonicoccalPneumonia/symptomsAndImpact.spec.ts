import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import SymptomsPage from "@pom/pneumonicoccalPneumonia/SymptomsAndImpactPage";
import Utilities from "@core_lib/utilities";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const symptomsPage = new SymptomsPage();
const utilities = new Utilities();
const menuMain = menuData.menuMain;
const linkIcon = comData.linkIcon;
const comUi = comData.ui;

let page;
const menu = menuMain.aboutPneumonicoccalneumonia;
const subMenu = menuMain.symptomsAndImpact;

test.describe.configure({ mode: "serial" });
test.describe("Symptoms and impact - @MEDIUM", () => {
  test.beforeAll(async ({ browser }) => {
    browser = browser;
    page = await browser.newPage();
    await page.goto("/en/");
    await com.selectMenu(page, menu, subMenu);
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify user can tap radio of "True or False"', async () => {
    await symptomsPage.click(page, symptomsPage.trueRadio);
    expect(await com.isDisplayed(page, symptomsPage.findOutTruebtn)).toBe(true);
    await page.reload();
    await symptomsPage.click(page, symptomsPage.falseRadio);
    expect(await com.isDisplayed(page, symptomsPage.findOutFalsebtn)).toBe(
      true
    );
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "True"', async () => {
    await symptomsPage.click(page, symptomsPage.trueRadio);
    expect(await com.isDisplayed(page, symptomsPage.findOutTruebtn)).toBe(true);
    await page.reload();
  });

  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "True"', async ({}, testInfo) => {
    const title = titleData.understandYourRisk;
    await symptomsPage.click(page, symptomsPage.trueRadio);
    await symptomsPage.click(page, symptomsPage.findOutTruebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "False"', async ({}, testInfo) => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/symptoms-and-impact");
    await symptomsPage.click(page, symptomsPage.falseRadio);
    await symptomsPage.click(page, symptomsPage.findOutFalsebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  //
  test('Verify navigates to "Understand Your Risk" page when clicking "See why you could be at higher risk" icon', async ({}, testInfo) => {
    const title = titleData.understandYourRisk;
    const icon = linkIcon.seeWhyYouCouldBeAtHigherRisk;
    await page.goto("/en/symptoms-and-impact");
    await com.tapTagA(page, icon);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify show "You are leaving the website" pop-up when clicking the link "Find out about a vaccine option" icon', async ({}, testInfo) => {
    await page.goto("/en/symptoms-and-impact");
    const icon = linkIcon.findOutAboutAVaccineOption;
    await com.tapTagA(page, icon);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify navigates to "Take Action" page when clicking "Talk to your doctor or pharmacist " icon', async ({}, testInfo) => {
    const title = titleData.takeAction;
    const icon = linkIcon.talkToYourDoctorOrPharmacist;
    await page.goto("/en/symptoms-and-impact");
    await com.tapTagA(page, icon);
    //Verify navigates to "Take Action" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });
});
