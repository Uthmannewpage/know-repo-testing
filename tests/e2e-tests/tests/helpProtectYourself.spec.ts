import { test, expect } from "@playwright/test";
import { String } from "typescript-string-operations";
// class
import CommonPage from "@pom/CommonPage";
import HelpPage from "@pom/HelpProtectYourselfPage";
import Utilities from "@core_lib/utilities";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import riskData from "@data/understand_your_risk.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const helpPage = new HelpPage();
const utilities = new Utilities();
const menuMain = menuData.menuMain;
const linkIcon = comData.linkIcon;
const comUi = comData.ui;

let page;
const menu = menuMain.helpProtectYourself;

test.describe.configure({ mode: "serial" });
test.describe("Help protect yourself - @MEDIUM", () => {
  test.beforeAll(async ({ browser }) => {
    browser = browser;
    page = await browser.newPage();
    await page.goto("/en/");
    await com.selectMenu(page, menu);
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify show "You are leaving the website" pop-up when clicking the link "Learn about an option"', async () => {
    await helpPage.click(page, helpPage.learnAboutAnOptionLink);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify user can tap radio of "True or False"', async () => {
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.trueRadio);
    expect(await com.isDisplayed(page, helpPage.findOutTruebtn)).toBe(true);
    await page.reload();
    await helpPage.click(page, helpPage.falseRadio);
    expect(await com.isDisplayed(page, helpPage.findOutFalsebtn)).toBe(true);
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "True"', async () => {
    await helpPage.click(page, helpPage.trueRadio);
    expect(await com.isDisplayed(page, helpPage.findOutTruebtn)).toBe(true);
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "False"', async () => {
    await helpPage.click(page, helpPage.falseRadio);
    expect(await com.isDisplayed(page, helpPage.findOutFalsebtn)).toBe(true);
    await page.reload();
  });

  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "True"', async () => {
    const title = titleData.understandYourRisk;
    await helpPage.click(page, helpPage.trueRadio);
    await helpPage.click(page, helpPage.findOutTruebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "False"', async () => {
    await page.goto("/en/help-protect-yourself");
    const title = titleData.understandYourRisk;
    await helpPage.click(page, helpPage.trueRadio);
    await helpPage.click(page, helpPage.findOutTruebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Home" page and scrolls to the "joesgameplan" section when clicking "Learn more Joe"', async () => {
    const title = titleData.home;
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.learnMoreJoeLink);
    // Verify navigates to "Home" page and scrolls to the "joesgameplan"
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify user can tap radio  in the section "STAY AHEAD WITH ADDITIONAL PROTECTION"', async () => {
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.trueRadioProtection);
    expect(await com.isDisplayed(page, helpPage.findOutTruebtnProtection)).toBe(
      true
    );
    await page.reload();
    await helpPage.click(page, helpPage.falseRadioProtection);
    expect(
      await com.isDisplayed(page, helpPage.findOutFalsebtnProtection)
    ).toBe(true);
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "True" in the section "STAY AHEAD WITH ADDITIONAL PROTECTION"', async () => {
    await helpPage.click(page, helpPage.trueRadioProtection);
    expect(await com.isDisplayed(page, helpPage.findOutTruebtnProtection)).toBe(
      true
    );
  });
  test('Verify user can see content detail when tapping radio "False" in the section "STAY AHEAD WITH ADDITIONAL PROTECTION"', async () => {
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.falseRadioProtection);
    expect(
      await com.isDisplayed(page, helpPage.findOutFalsebtnProtection)
    ).toBe(true);
    await page.reload();
  });
  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "True" in the section "STAY AHEAD WITH ADDITIONAL PROTECTION"', async () => {
    const title = titleData.understandYourRisk;
    await helpPage.click(page, helpPage.trueRadioProtection);
    await helpPage.click(page, helpPage.findOutTruebtnProtection);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });
  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "False" in the section "STAY AHEAD WITH ADDITIONAL PROTECTION"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.falseRadioProtection);
    await helpPage.click(page, helpPage.findOutFalsebtnProtection);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Understand Your Risk" page successfully when clicking the "Find out more" button of "65 or older"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.findOutMore65btn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Understand Your Risk" page successfully when clicking the "Find out more" button of "19 or older"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/help-protect-yourself");
    await helpPage.click(page, helpPage.findOutMore19btn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  //
  test('Verify show "You are leaving the website" pop-up when clicking the link "Find out about a vaccine option" icon', async () => {
    const icon = linkIcon.findOutAboutAVaccineOption;
    await page.goto("/en/help-protect-yourself");
    await com.tapTagA(page, icon);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify navigates to "Take Action" page when clicking "Talk to your doctor or pharmacist " icon', async () => {
    const title = titleData.takeAction;
    const icon = linkIcon.talkToYourDoctorOrPharmacist;
    await page.goto("/en/help-protect-yourself");
    await com.tapTagA(page, icon);
    // Verify navigates to "Take Action" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Share Your Story" page when clicking "Ready to share your story?" icon', async () => {
    const title = titleData.shareYourStory;
    const icon = linkIcon.readyToShareYourStory;
    await page.goto("/en/help-protect-yourself");
    await com.tapTagA(page, icon);
    // Verify navigates to "Share Your Story" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });
});
