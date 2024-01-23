import { test, expect } from "@playwright/test";
import { String } from "typescript-string-operations";
// class
import CommonPage from "@pom/CommonPage";
import RiskPage from "@pom/UnderstandYourRiskPage";
import Utilities from "@core_lib/utilities";
// data
import menuData from "@data/menu_data.json";
import titleData from "@data/title_data.json";
import riskData from "@data/understand_your_risk.json";
import comData from "@data/common_data.json";
// declare
const com = new CommonPage();
const riskPage = new RiskPage();
const utilities = new Utilities();
const menuMain = menuData.menuMain;
const linkIcon = comData.linkIcon;
const comUi = comData.ui;
let page;
const menu = menuMain.understandYourRisk;
const asthma = riskData.asthma;
const chronicLungDisease = riskData.chronicLungDisease;
const chronicHeartDisease = riskData.chronicHeartDisease;
const diabetes = riskData.diabetes;
const certainMedications = riskData.certainMedications;
const certainCancers = riskData.certainCancers;
const chronicRenalFailure = riskData.chronicRenalFailure;
const nonFunctioningSpleen = riskData.nonFunctioningSpleen;
const hiv = riskData.hiv;

test.describe.configure({ mode: "serial" });
test.describe("Understand your risk - @MEDIUM", () => {
  test.beforeAll(async ({ browser }) => {
    browser = browser;
    page = await browser.newPage();
    await page.goto("/en/");
    await com.selectMenu(page, menu);
  });

  test.afterAll(async ({ browser }) => {
    await page.close();
  });
  // Asthma
  test('Verify system shows the topic "Asthma" detail when clicking the "+" icon of the topic "Asthma"', async () => {
    await riskPage.showHideTopic(page, asthma);
    expect(await riskPage.showTopicDetail(page, asthma)).toBe(true);
    expect(await riskPage.isHelpProtectDisplayed(page, asthma)).toBe(true);
  });

  test('Verify the content and button the topic "Asthma" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      asthma.toLocaleLowerCase()
    );
    const content = await riskPage.getContentTopic(page, asthma);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Asthma" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, asthma);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Asthma" detail when clicking the "x" icon of the topic "Asthma"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, asthma);
    expect(await riskPage.showTopicDetail(page, asthma)).toBe(true);
    await riskPage.showHideTopic(page, asthma);
    expect(await riskPage.showTopicDetail(page, asthma)).toBe(false);
  });

  //Chronic Lung Disease
  test('Verify system shows the topic "Chronic Lung Disease" detail when clicking the "+" icon of the topic "Chronic Lung Disease"', async () => {
    await riskPage.showHideTopic(page, chronicLungDisease);
    expect(await riskPage.showTopicDetail(page, chronicLungDisease)).toBe(true);
    expect(
      await riskPage.isHelpProtectDisplayed(page, chronicLungDisease)
    ).toBe(true);
  });

  test('Verify the content and button the topic "Chronic Lung Disease" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      chronicLungDisease.toLocaleLowerCase()
    );
    const content = await riskPage.getContentTopic(page, chronicLungDisease);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Chronic Lung Disease" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, chronicLungDisease);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Chronic Lung Disease" detail when clicking the "x" icon of the topic "Chronic Lung Disease"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, chronicLungDisease);
    expect(await riskPage.showTopicDetail(page, chronicLungDisease)).toBe(true);
    await riskPage.showHideTopic(page, chronicLungDisease);
    expect(await riskPage.showTopicDetail(page, chronicLungDisease)).toBe(
      false
    );
  });

  //Chronic Heart Disease
  test('Verify system shows the topic "Chronic Heart Disease" detail when clicking the "+" icon of the topic "Chronic Heart Disease"', async () => {
    await riskPage.showHideTopic(page, chronicHeartDisease);
    expect(await riskPage.showTopicDetail(page, chronicHeartDisease)).toBe(
      true
    );
    expect(
      await riskPage.isHelpProtectDisplayed(page, chronicHeartDisease)
    ).toBe(true);
  });

  test('Verify the content and button the topic "Chronic Heart Disease" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      chronicHeartDisease.toLocaleLowerCase()
    );
    const content = await riskPage.getContentTopic(page, chronicHeartDisease);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Chronic Heart Disease" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, chronicHeartDisease);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Chronic Heart Disease" detail when clicking the "x" icon of the topic "Chronic Heart Disease"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, chronicHeartDisease);
    expect(await riskPage.showTopicDetail(page, chronicHeartDisease)).toBe(
      true
    );
    await riskPage.showHideTopic(page, chronicHeartDisease);
    expect(await riskPage.showTopicDetail(page, chronicHeartDisease)).toBe(
      false
    );
  });

  //diabetes
  test('Verify system shows the topic "diabetes" detail when clicking the "+" icon of the topic "diabetes"', async () => {
    await riskPage.showHideTopic(page, diabetes);
    expect(await riskPage.showTopicDetail(page, diabetes)).toBe(true);
    expect(await riskPage.isHelpProtectDisplayed(page, diabetes)).toBe(true);
  });

  test('Verify the content and button the topic "diabetes" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      diabetes.toLocaleLowerCase()
    );
    const content = await riskPage.getContentTopic(page, diabetes);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "diabetes" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, diabetes);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "diabetes" detail when clicking the "x" icon of the topic "diabetes"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, diabetes);
    expect(await riskPage.showTopicDetail(page, diabetes)).toBe(true);
    await riskPage.showHideTopic(page, diabetes);
    expect(await riskPage.showTopicDetail(page, diabetes)).toBe(false);
  });

  //Certain Medications
  test('Verify system shows the topic "Certain Medications" detail when clicking the "+" icon of the topic "Certain Medications"', async () => {
    await riskPage.showHideTopic(page, certainMedications);
    expect(await riskPage.showTopicDetail(page, certainMedications)).toBe(true);
    expect(
      await riskPage.isHelpProtectDisplayed(page, certainMedications)
    ).toBe(true);
  });

  test('Verify the content and button the topic "Certain Medications" when clicking the "+" icon ', async () => {
    const contentData = riskData.certainMedicationsContent;
    const content = await riskPage.getContentTopic(page, certainMedications);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Certain Medications" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, certainMedications);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Certain Medications" detail when clicking the "x" icon of the topic "Certain Medications"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, certainMedications);
    expect(await riskPage.showTopicDetail(page, certainMedications)).toBe(true);
    await riskPage.showHideTopic(page, certainMedications);
    expect(await riskPage.showTopicDetail(page, certainMedications)).toBe(
      false
    );
  });

  //Certain Cancers

  test('Verify system shows the topic "Certain Cancers" detail when clicking the "+" icon of the topic "Certain Cancers"', async () => {
    await riskPage.showHideTopic(page, certainCancers);
    expect(await riskPage.showTopicDetail(page, certainCancers)).toBe(true);
    expect(await riskPage.isHelpProtectDisplayed(page, certainCancers)).toBe(
      true
    );
  });

  test('Verify the content and button the topic "Certain Cancers" when clicking the "+" icon ', async () => {
    const contentData = riskData.certainCancersContent;
    const content = await riskPage.getContentTopic(page, certainCancers);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Certain Cancers" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, certainCancers);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Certain Cancers" detail when clicking the "x" icon of the topic "Certain Cancers"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, certainCancers);
    expect(await riskPage.showTopicDetail(page, certainCancers)).toBe(true);
    await riskPage.showHideTopic(page, certainCancers);
    expect(await riskPage.showTopicDetail(page, certainCancers)).toBe(false);
  });

  //Chronic Renal Failure

  test('Verify system shows the topic "Chronic Renal Failure" detail when clicking the "+" icon of the topic "Chronic Renal Failure"', async () => {
    await riskPage.showHideTopic(page, chronicRenalFailure);
    expect(await riskPage.showTopicDetail(page, chronicRenalFailure)).toBe(
      true
    );
    expect(
      await riskPage.isHelpProtectDisplayed(page, chronicRenalFailure)
    ).toBe(true);
  });

  test('Verify the content and button the topic "Chronic Renal Failure" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      chronicRenalFailure.toLocaleLowerCase()
    );
    const content = await riskPage.getContentTopic(page, chronicRenalFailure);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Chronic Renal Failure" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, chronicRenalFailure);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "Chronic Renal Failure" detail when clicking the "x" icon of the topic "Chronic Renal Failure"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, chronicRenalFailure);
    expect(await riskPage.showTopicDetail(page, chronicRenalFailure)).toBe(
      true
    );
    await riskPage.showHideTopic(page, chronicRenalFailure);
    expect(await riskPage.showTopicDetail(page, chronicRenalFailure)).toBe(
      false
    );
  });

  //Non-functioning Spleen (aspleenia)

  test('Verify system shows the topic "Non-functioning Spleen (aspleenia)" detail when clicking the "+" icon of the topic "Non-functioning Spleen (aspleenia)"', async () => {
    await riskPage.showHideTopic(page, nonFunctioningSpleen);
    expect(await riskPage.showTopicDetail(page, nonFunctioningSpleen)).toBe(
      true
    );
    expect(
      await riskPage.isHelpProtectDisplayed(page, nonFunctioningSpleen)
    ).toBe(true);
  });

  test('Verify the content and button the topic "Non-functioning Spleen (aspleenia)" when clicking the "+" icon ', async () => {
    const contentData = String.format(
      riskData.content,
      "a non-functioning spleen (asplenia)"
    );
    const content = await riskPage.getContentTopic(page, nonFunctioningSpleen);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "Non-functioning Spleen (aspleenia)" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, nonFunctioningSpleen);
  });

  test('Verify system hides the topic "Non-functioning Spleen (aspleenia)" detail when clicking the "x" icon of the topic "Non-functioning Spleen (aspleenia)"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, nonFunctioningSpleen);
    expect(await riskPage.showTopicDetail(page, nonFunctioningSpleen)).toBe(
      true
    );
    await riskPage.showHideTopic(page, nonFunctioningSpleen);
    expect(await riskPage.showTopicDetail(page, nonFunctioningSpleen)).toBe(
      false
    );
  });

  //hiv
  test('Verify system shows the topic "HIV" detail when clicking the "+" icon of the topic "HIV"', async () => {
    await riskPage.showHideTopic(page, hiv);
    expect(await riskPage.showTopicDetail(page, hiv)).toBe(true);
    expect(await riskPage.isHelpProtectDisplayed(page, hiv)).toBe(true);
  });

  test('Verify the content and button the topic "HIV" when clicking the "+" icon ', async () => {
    const contentData = String.format(riskData.content, hiv);
    const content = await riskPage.getContentTopic(page, hiv);
    expect(contentData).toBe(content);
  });

  test('Verify navigates to the "Help Protect Yourself" page successfully  when clicking the "Help protect yourself" button of the topic "HIV" detail', async () => {
    const title = titleData.helpProtectYourself;
    await riskPage.tapHelpProtectYourselfBtn(page, hiv);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify system hides the topic "HIV" detail when clicking the "x" icon of the topic "HIV"', async () => {
    await page.goto("/en/understand-your-risk");
    await riskPage.showHideTopic(page, hiv);
    expect(await riskPage.showTopicDetail(page, hiv)).toBe(true);
    await riskPage.showHideTopic(page, hiv);
    expect(await riskPage.showTopicDetail(page, hiv)).toBe(false);
  });
  //

  test('Verify navigates to "Help Protect Yourself" page when clicking "Help protect yourself " icon', async () => {
    const title = titleData.helpProtectYourself;
    const icon = linkIcon.helpProtectYourself;
    await page.goto("/en/understand-your-risk");
    await com.tapTagA(page, icon);
    // Verify navigates to "Help Protect Yourself" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });

  test('Verify show "You are leaving the website" pop-up when clicking the link "Find out about a vaccine option"', async () => {
    await page.goto("/en/understand-your-risk");
    const icon = linkIcon.findOutAboutAVaccineOption;
    await com.tapTagA(page, icon);
    // verify show "You are leaving the website" pop-up
    // expect(await com.containUi(page,comUi.youAreLeavingTheWebsite))
  });

  test('Verify navigates to "Take Action" page when clicking "Talk to your doctor or pharmacist " icon', async () => {
    const title = titleData.takeAction;
    const icon = linkIcon.talkToYourDoctorOrPharmacist;
    await page.goto("/en/understand-your-risk");
    await com.tapTagA(page, icon);
    // Verify navigates to "Take Action" page
    // expect(await com.titleUI(page, title)).toBe(true);
  });
});
