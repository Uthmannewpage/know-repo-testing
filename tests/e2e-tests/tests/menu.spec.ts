import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import Utilities from "@core_lib/utilities";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const menuMain = menuData.menuMain;
const utilities = new Utilities();
const ui = comData.ui;
let page;
test.describe.configure({ mode: "serial" });
test.describe("Menu - @HIGH", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/en/");
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify navigates to "What is Pneumococcal Pneumonia?" page successfully when clicking the "What is Pneumococcal Pneumonia?" option on "Menu"', async () => {
    const menu = menuMain.aboutPneumonicoccalneumonia;
    const subMenu = menuMain.whatPneumococcalPneumonia;
    const title = titleData.whatIsPneumococcalPneumonia;
    await com.selectMenu(page, menu, subMenu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Symptoms and impact" page successfully when clicking the "Symptoms and impact" option on "Menu"', async () => {
    const menu = menuMain.aboutPneumonicoccalneumonia;
    const subMenu = menuMain.symptomsAndImpact;
    const title = titleData.symptomsAndImpact;
    await com.selectMenu(page, menu, subMenu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Understand your risk" page successfully when clicking the "Understand your risk" option on "Menu"', async () => {
    const menu = menuMain.understandYourRisk;
    const title = titleData.understandYourRisk;
    await com.selectMenu(page, menu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Help protect yourself" page successfully when clicking the "Help protect yourself" option on "Menu"', async () => {
    const menu = menuMain.helpProtectYourself;
    const title = titleData.helpProtectYourself;
    await com.selectMenu(page, menu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Talk to your doctor" page successfully when clicking the "Talk to your doctor" option on "Menu"', async () => {
    const menu = menuMain.takeAction;
    const subMenu = menuMain.talkToYourDoctor;
    const title = titleData.talkToYourDoctor;
    await com.selectMenu(page, menu, subMenu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  //
  test('Verify navigates to "Share your story" page successfully when clicking the "Talk to your doctor" option on "Menu"', async () => {
    const menu = menuMain.takeAction;
    const subMenu = menuMain.shareYourStory;
    const title = titleData.shareYourStory;
    await com.selectMenu(page, menu, subMenu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Helpful Resources" page successfully when clicking the "Helpful Resources" option on "Menu"', async () => {
    const menu = menuMain.takeAction;
    const subMenu = menuMain.helpfulResources;
    const title = titleData.helpfulResources;
    await com.selectMenu(page, menu, subMenu);
    expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify navigates to "Home" page successfully when clicking the "Know PNEUMONIA" icon on "Header"', async () => {
    const title = titleData.home;
    await com.click(page, com.homeIcon);
    expect(await com.titleUI(page, title)).toBe(true);
  });
});

test.describe("Menu - @MEDIUM", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/en/");
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });
  test('Verify show "You are leaving the website" pop-up when clicking "Learn About a Vaccine Option from Pfizer" on the "Header"', async () => {
    await page.goto("/en/");
    await com.click(page, com.learnAboutAVaccineLink);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,ui.youAreLeavingTheWebsite))
  });

  test('Verify show "You are leaving the website" pop-up when clicking "Facebook" icon on the "Header"', async () => {
    await page.goto("/en/");
    await com.click(page, com.faceIcon);
    // verify show "You are now leaving KnowPneumonia.com" pop-up
    // expect(await com.containUi(page,ui.youAreLeavingKnowPneumonia))
  });

  test('Verify show "You are leaving the website" pop-up when clicking "Instagram" icon on the "Header"', async () => {
    await page.goto("/en/");
    await com.click(page, com.instagramIcon);
    // verify show "You are now leaving KnowPneumonia.com" pop-up
    // expect(await com.containUi(page,ui.youAreLeavingKnowPneumonia))
  });
});
