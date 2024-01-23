import BasePage from "@pom/BasePage";
//lib
import { String } from "typescript-string-operations";
//data
import time from "@data/timeout_data.json";
//declare

export default class HomePage extends BasePage {
  public seeHowMobileBtn =
    "//div[@id='my-carousel']/following-sibling::p/a[contains(@href, '/en/what-is-pneumococcal-pneumonia')]";
  public seeHowDesktopBtn =
    "//div[@id='my-carousel']//p/a[contains(@href, '/en/what-is-pneumococcal-pneumonia')]";
  public switchSlide1Icon =
    "//div[@id='my-carousel']//li[@data-bs-slide-to='1']";
  public switchSlide2Icon =
    "//div[@id='my-carousel']//li[@data-bs-slide-to='2']";
  //
  public findOutMore65btn =
    "//div[text()='even if you’re healthy.']/following-sibling::div[1]/a[1]";
  public findOutMore19btn =
    "//div[text()='with certain chronic conditions.']/following-sibling::div[1]/a[1]";
  public learnAboutAVaccineOption = "//h3/a[contains(@href,'adult.prevnar20')]";
  //icon

  async tapSeeHowItCouldAffectYouBtn(page: any) {
    if (await this.isDisplayed(page, this.seeHowDesktopBtn, time.super_fast)) {
      await this.click(page, this.seeHowDesktopBtn);
    } else {
      await this.click(page, this.seeHowMobileBtn);
    }
  }
}
