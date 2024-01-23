import BasePage from "@pom/BasePage";
import { String } from "typescript-string-operations";
//data
import time from "@data/timeout_data.json";
//declare

export default class CommonPage extends BasePage {
  public itemMenu = "//li/a[contains(text(),'{0}')]";
  public itemMenuMBobile =
    "//div[@id='navbarSupportedContent']//li/a[contains(text(),'{0}')]";
  //footer
  public itemMenuFooter = "//footer//ul/li//a[contains(text(),'{0}')]";
  public containsLinkFooter = "//footer//a[contains(@title,'{0}')]";
  //header
  public homeIcon =
    "//a[@href='/en/']/img[contains(@src,'media_174653345def84d08180345d40573f5a4b67854ad.png')]";
  public learnAboutAVaccineLink =
    "//header//ul/li/a[contains(text(),'Learn About a Vaccine Option from Pfizer')]";
  public faceIcon =
    "//header//ul/li/a/img[contains(@src,'media_1303e5225f8eeadb1b3033a265bd145a29965fe21.png')]";
  public instagramIcon =
    "//header//ul/li/a/img[contains(@src,'media_13ace3b31daacad04ae39930bb3bcb358dade6174.png')]";
  //
  public text = "//*[text()='{0}']";
  public containsText = "//*[contains(text(),'{0}')]";
  public containsLink = "//a[contains(@title,'{0}')]";
  public title =
    "((//*/strong[contains(text(),'{0}')]) | (//h1[contains(text(),'{0}')]) | (//h2[contains(text(),'{0}')]))";
  public menuToggler = "//button[@data-bs-target='#navbarSupportedContent']";

  // select menu
  async selectMenu(page: any, menu: string, submenu?: string) {
    if (await this.isDisplayed(page, this.menuToggler, time.very_fast)) {
      await this.click(page, this.menuToggler);
    }
    if (menu) {
      let menuLocatorMenu = String.format(this.itemMenu, menu);
      if (!(await this.isDisplayed(page, menuLocatorMenu, time.very_fast))) {
        menuLocatorMenu = String.format(this.itemMenuMBobile, menu);
      }
      await this.click(page, menuLocatorMenu);
    }
    if (submenu) {
      let subMenuLocator = String.format(this.itemMenu, submenu);
      if (!(await this.isDisplayed(page, subMenuLocator, time.very_fast))) {
        subMenuLocator = String.format(this.itemMenuMBobile, submenu);
      }
      await this.click(page, subMenuLocator);
    }
  }
  // select menu footer
  async selectMenuFooter(page: any, menu: string) {
    const locator = String.format(this.itemMenuFooter, menu);
    await this.click(page, locator);
  }

  async titleUI(page: any, text: string) {
    const locator = String.format(this.title, text);
    return await this.isDisplayed(page, locator);
  }

  async ui(page: any, text: string) {
    const locator = String.format(this.text, text);
    return await this.isDisplayed(page, locator);
  }

  async containUi(page: any, text: string) {
    const locator = String.format(this.containsText, text);
    return await this.isDisplayed(page, locator);
  }

  async tapUi(page: any, text: string) {
    const locator = String.format(this.text, text);
    await this.click(page, locator);
  }

  async tapContainUi(page: any, text: string) {
    const locator = String.format(this.containsText, text);
    await this.click(page, locator);
  }

  async tapTagA(page: any, text: string) {
    const locator = String.format(this.containsLink, text);
    await this.click(page, locator);
  }

  async tapTagAFooter(page: any, text: string) {
    const locator = String.format(this.containsLinkFooter, text);
    await this.click(page, locator);
  }
}
