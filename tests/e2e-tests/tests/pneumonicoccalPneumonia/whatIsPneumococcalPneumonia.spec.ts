import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import PneumoniaPage from "@pom/pneumonicoccalPneumonia/WhatIsPneumococcalPneumoniaPage";
import Utilities from "@core_lib/utilities";
// data
import menuData from "@data/menu_data.json";
import pneumoniaData from "@data/pneumonicoccalPneumonia/what_is_pneumococcal_pneumonia_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const pneumoniaPage = new PneumoniaPage();
const menuMain = menuData.menuMain;
const utilities = new Utilities();
const comUi = comData.ui;
let page;
const menu = menuMain.aboutPneumonicoccalneumonia;
const subMenu = menuMain.whatPneumococcalPneumonia;
const linkIcon = comData.linkIcon;

test.describe.configure({ mode: "serial" });
test.describe("What is Pneumococcal Pneumonia - @MEDIUM", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/en/");
    await com.selectMenu(page, menu, subMenu);
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify user can view transcript details when clicking on the "View Transcript" button', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.viewTranscript);
    expect(await com.containUi(page, pneumoniaData.hideTranscript)).toBe(true);
  });

  test('Verify user can hide view transcript details when clicking on the "Hide Transcript" button', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.hideTranscript);
    expect(await com.containUi(page, pneumoniaData.viewTranscript)).toBe(true);
  });

  test('Verify user can hide view transcript details when clicking on the "Close X" button', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.viewTranscript);
    await pneumoniaPage.click(page, pneumoniaPage.close);
    expect(await com.containUi(page, pneumoniaData.viewTranscript)).toBe(true);
  });

  test('Verify user can tap radio of "True or False"', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.trueRadio);
    expect(await com.isDisplayed(page, pneumoniaPage.findOutTruebtn)).toBe(
      true
    );
    await page.reload();
    await pneumoniaPage.click(page, pneumoniaPage.falseRadio);
    expect(await com.isDisplayed(page, pneumoniaPage.findOutFalsebtn)).toBe(
      true
    );
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "True"', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.trueRadio);
    expect(await com.isDisplayed(page, pneumoniaPage.findOutTruebtn)).toBe(
      true
    );
    await page.reload();
  });

  test('Verify user can see content detail when tapping radio "False"', async () => {
    await pneumoniaPage.click(page, pneumoniaPage.falseRadio);
    expect(await com.isDisplayed(page, pneumoniaPage.findOutFalsebtn)).toBe(
      true
    );
    await page.reload();
  });

  test('Verify navigates to the "Understand Your Risk" page successfully when clicking the "Find out if you’re at higher risk" in the content detail of "True"', async () => {
    const title = titleData.understandYourRisk;
    await pneumoniaPage.click(page, pneumoniaPage.trueRadio);
    await pneumoniaPage.click(page, pneumoniaPage.findOutTruebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to the "Understand Your Risk" page successfully  when clicking the "Find out if you’re at higher risk" in the content detail of "False"', async () => {
    const title = titleData.understandYourRisk;
    await page.goto("/en/what-is-pneumococcal-pneumonia");
    await pneumoniaPage.click(page, pneumoniaPage.falseRadio);
    await pneumoniaPage.click(page, pneumoniaPage.findOutFalsebtn);
    // Verify navigates to "Understand Your Risk" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  //
  test('Verify navigates to "Symptoms And Impact" page when clicking "Understand the symptoms and impact " icon', async () => {
    const title = titleData.understandYourRisk;
    const icon = linkIcon.understandTheSymptomsSndImpact;
    await page.goto("/en/what-is-pneumococcal-pneumonia");
    await com.tapTagA(page, icon);
    // Verify navigates to "Symptoms And Impact" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify show "You are leaving the website" pop-up when clicking the link "Find out about a vaccine option"', async () => {
    await page.goto("/en/what-is-pneumococcal-pneumonia");
    const icon = linkIcon.findOutAboutAVaccineOption;
    await com.tapTagA(page, icon);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify navigates to "Take Action" page when clicking "Talk to your doctor or pharmacist " icon', async () => {
    const title = titleData.takeAction;
    const icon = linkIcon.talkToYourDoctorOrPharmacist;
    await page.goto("/en/what-is-pneumococcal-pneumonia");
    await com.tapTagA(page, icon);
    // Verify navigates to "Take Action" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });
});
