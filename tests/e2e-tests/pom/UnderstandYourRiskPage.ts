import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//data
import time from "@data/timeout_data.json";
//declare

export default class UnderstandYourRiskPage extends BasePage {
  public topic = "//div[contains(text(), '{0}')]";
  public activeTopic = this.topic + "//parent::div[contains(@class, 'active')]";
  public contentTopicBtn = this.topic + "/following-sibling::div//p[1]/strong";
  public helpProtectYourselfBtn =
    this.topic +
    "/following-sibling::div//p/a[contains(text(), 'Help Protect Yourself')]";
  public nextBtn = "//button[contains(text(), 'Next')]";

  async isHelpProtectDisplayed(page: any, topic: string) {
    const locator = String.format(this.topic, topic);
    return await this.isDisplayed(page, locator);
  }

  async showTopicDetail(page: any, topic) {
    const locator = String.format(this.activeTopic, topic);
    return await this.isDisplayed(page, locator, time.fast);
  }

  async showHideTopic(page: any, topic: string) {
    const locator = String.format(this.topic, topic);
    await this.click(page, locator);
  }

  async getContentTopic(page: any, topic) {
    const locator = String.format(this.contentTopicBtn, topic);
    return await this.getText(page, locator);
  }

  async tapHelpProtectYourselfBtn(page: any, topic) {
    const locator = String.format(this.helpProtectYourselfBtn, topic);
    await this.click(page, locator);
  }
}
