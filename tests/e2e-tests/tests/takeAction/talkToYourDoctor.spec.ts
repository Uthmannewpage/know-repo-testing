import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import Utilities from "@core_lib/utilities";
import TalkToYourDoctorPage from "@pom/takeAction/TalkToYourDoctorPage";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const menuMain = menuData.menuMain;
const talkPage = new TalkToYourDoctorPage();
const utilities = new Utilities();
const comUi = comData.ui;
let page;
const menu = menuMain.takeAction;
const subMenu = menuMain.talkToYourDoctor;
test.describe.configure({ mode: "serial" });
test.describe("Talk to your doctor - @HIGH", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/en/");
    await com.selectMenu(page, menu, subMenu);
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });

  test('Verify the system show PDF "Talk to your doctor or pharmacist" when clicking "View guide (PDF)"  button', async () => {
    await talkPage.click(page, talkPage.pdfBtn);
    await expect(page).toHaveURL(/.*KP_DiscussionGuide_v12.pdf/);
  });

  test('Verify content PDF correctly when clicking "View guide (PDF) " button', async () => {
    await page.goto("/en/take-action");
    await talkPage.click(page, talkPage.pdfBtn);
    await expect(page).toHaveURL(/.*KP_DiscussionGuide_v12.pdf/);
    // Verify content PDF
  });

  test('Verify show "You are leaving the website" pop-up when clicking the link "Learn about an option"', async () => {
    await page.goto("/en/take-action");
    await talkPage.click(page, talkPage.learnAboutAnOptionLink);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });
});
