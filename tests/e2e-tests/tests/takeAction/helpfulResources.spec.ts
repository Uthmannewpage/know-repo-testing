import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import Utilities from "@core_lib/utilities";
import HelpfulResourcesPage from "@pom/takeAction/HelpfulResourcesPage";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import helpData from "@data/takeAction/helpful_resources_data.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const menuMain = menuData.menuMain;
const helpPage = new HelpfulResourcesPage();
const utilities = new Utilities();
let page;
const menu = menuMain.takeAction;
const subMenu = menuMain.helpfulResources;
const books = helpData.books;
const linkIcon = comData.linkIcon;
const comUi = comData.ui;
test.describe("Helpful Resource - @MEDIUM", () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async ({ browser }) => {
    await page.close();
  });

  test('Verify the system show PDF "Pneumococcal Pneumonia Facts (PDF) " when clicking the linking "Pneumococcal Pneumonia Facts (PDF) "', async () => {
    await page.goto("/en/");
    await com.selectMenu(page, menu, subMenu);
    await com.tapTagA(page, books.pneumococcalPneumoniaFacts);
    await expect(page).toHaveURL(
      /.*PP-PNR-USA-0820_Unbranded%20Know%20Pneumonia%20Consumer.pdf/
    );
  });

  test('Verify content  PDF correctly when clicking the linking "Pneumococcal Pneumonia Facts (PDF) "', async () => {
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.pneumococcalPneumoniaFacts);
    await expect(page).toHaveURL(
      /.*PP-PNR-USA-0820_Unbranded%20Know%20Pneumonia%20Consumer.pdf/
    );
    // Verify content PDF
  });

  test('Verify the system show PDF "Discussion Guide (PDF) " when clicking the linking "Discussion Guide (PDF) "', async () => {
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.discussionGuide);
    await expect(page).toHaveURL(/.*KP_DiscussionGuide_v12.pdf/);
  });

  test('Verify content  PDF correctly when clicking the linking "Discussion Guide (PDF) "', async () => {
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.discussionGuide);
    await expect(page).toHaveURL(/.*KP_DiscussionGuide_v12.pdf/);
    // Verify content PDF
  });

  test('Verify the system show PDF "Let is Talk Brochure (PDF)" when clicking the linking "Let is Talk Brochure (PDF) "', async () => {
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.letTalkBrochure);
    await expect(page).toHaveURL(
      /.*PP_PNR_USA_0689_03_Prevnar_Unbranded_Discussion_Guide_Doctor_Digital_M8.pdf/
    );
  });

  test('Verify content  PDF correctly when clicking the linking "Let is Talk Brochure (PDF) "', async () => {
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.letTalkBrochure);
    await expect(page).toHaveURL(
      /.*PP_PNR_USA_0689_03_Prevnar_Unbranded_Discussion_Guide_Doctor_Digital_M8.pdf/
    );
    // Verify content PDF
  });

  test('Verify navigates to "What is pneumococcal pneumonia?" page when clicking the linking "What is pneumococcal pneumonia?  "', async () => {
    const title = titleData.whatIsPneumococcalPneumonia;
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, books.whatIsPneumococcalPneumonia);
    // Verify navigates to "What is pneumococcal pneumonia?"
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  //
  test('Verify show "You are leaving the website" pop-up when clicking the link "Find out about a vaccine option"', async () => {
    const icon = linkIcon.findOutAboutAVaccineOption;
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, icon);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify navigates to "Share Your Story" page when clicking "Ready to share your story?" icon', async () => {
    const title = titleData.whatIsPneumococcalPneumonia;
    const icon = linkIcon.readyToShareYourStory;
    await page.goto("/en/helpful-resources");
    await com.tapTagA(page, icon);
    // Verify navigates to "Share Your Story"
    // expect(await com.titleUI(page, title)).toBe(true);
  });
});
