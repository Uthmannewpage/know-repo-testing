import { test, expect } from "@playwright/test";
// class
import CommonPage from "@pom/CommonPage";
import Utilities from "@core_lib/utilities";
import ShareYourStoryPage from "@pom/takeAction/ShareYourStoryPage";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import shareData from "@data/takeAction/share_your_story_data.json";
// declare
const com = new CommonPage();
const menuMain = menuData.menuMain;
const sharePage = new ShareYourStoryPage();
const utilities = new Utilities();
let page;
const menu = menuMain.takeAction;
const subMenu = menuMain.shareYourStory;
const enter = shareData.enterData;
test.describe("Share Your Story - @MEDIUM", () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async ({ browser }) => {
    await page.close();
  });

  test('Verify the system scrolling to the "My Share Story Form" when clicking the link "Pfizer would like to hear from you"', async () => {
    await page.goto("/en/");
    await com.selectMenu(page, menu, subMenu);
    await com.tapTagA(page, shareData.pfizerWouldLikeToHeaderFromYou);
  });

  test('Verify the user can "Share your story" successfully', async () => {
    const firstName = enter.firstName;
    const lastName = enter.lastName;
    const email = enter.email;
    const phone = enter.phone;
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.hadPneumoniaCbox);
    await sharePage.enterText(page, sharePage.firstNameInput, firstName);
    await sharePage.enterText(page, sharePage.lastNameInput, lastName);
    await sharePage.enterText(page, sharePage.emailInput, email);
    await sharePage.enterText(page, sharePage.phoneInput, phone);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify successfully
  });

  test('Verify the can tick the checkbox of the section "Share your story. Help others."', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.hadPneumoniaCbox);
    expect(await page.locator(sharePage.hadPneumoniaCbox)).toBeChecked();
    expect(await page.locator(sharePage.hasTakenVaccineCbox)).not.toBeChecked();
  });

  test('Verify the user multiple ticks the checkbox of the section "Share your story. Help others."', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.hadPneumoniaCbox);
    expect(await page.locator(sharePage.hadPneumoniaCbox)).toBeChecked();
    await sharePage.click(page, sharePage.hasTakenVaccineCbox);
    expect(await page.locator(sharePage.hasTakenVaccineCbox)).toBeChecked();
  });

  test("Verify the system shows a message alert when the user is not tick the checkbox ", async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user blanks "First Name" ', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user entering "First Name" more than 30 characters', async () => {
    const firstNameMore30 = enter.firstNameMore30;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.firstNameInput, firstNameMore30);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user entering invalid "First Name"', async () => {
    const invalidFirstName = enter.invalidFirstName;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.firstNameInput, invalidFirstName);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system displays a warning message when the user "First Name" is numeric', async () => {
    const firstNameIsNum = enter.firstNameIsNum;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.firstNameInput, firstNameIsNum);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user blanks "Last Name" ', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user entering "Last Name" more than 30 characters ', async () => {
    const lastNameMore30 = enter.lastNameMore30;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.lastNameInput, lastNameMore30);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user entering invalid "Last Name"', async () => {
    const invalidLastName = enter.invalidLastName;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.lastNameInput, invalidLastName);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system displays a warning message when the user "Last Name" is numeric', async () => {
    const lastNameIsNum = enter.lastNameIsNum;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.lastNameInput, lastNameIsNum);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user blanks "E-mail Address" ', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user entering invalid "E-mail Address"', async () => {
    const invalidEmail = enter.invalidEmail;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.emailInput, invalidEmail);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system shows a message alert when the user blanks "Phone" ', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });

  test('Verify the system has format phone when clicking "Phone"', async () => {
    await page.goto("/en/share-your-story");
    await sharePage.click(page, sharePage.phoneInput);
    // Verify the system show text format phone
  });

  test('Verify the user can not enter "Phone" as a character', async () => {
    const phoneIsChar = enter.phoneIsChar;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.phoneInput, phoneIsChar);
    // Verify can't enter phone with character
  });

  test('Verify the user only enter "Phone" as a numeric', async () => {
    const phoneIsChar = enter.phoneIsChar;
    const phoneIsNum = enter.phoneIsNum;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.phoneInput, phoneIsChar);
    // Verify can't enter phone with character
    await sharePage.enterText(page, sharePage.phoneInput, phoneIsNum);
    // Verify can enter phone with character
  });

  test('Verify the user can not entering "Phone" more than 10 characters', async () => {
    const phoneMore10 = enter.phoneMore10;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.phoneInput, phoneMore10);
    // Verify the user can not entering "Phone" more than 10 characters
  });

  test('Verify the system shows a message alert when the user entering "Phone" more less 10 characters', async () => {
    const phoneLess10 = enter.phoneLess10;
    await page.goto("/en/share-your-story");
    await sharePage.enterText(page, sharePage.phoneInput, phoneLess10);
    await sharePage.click(page, sharePage.submitBtn);
    // Verify the system shows a message alert
  });
});
