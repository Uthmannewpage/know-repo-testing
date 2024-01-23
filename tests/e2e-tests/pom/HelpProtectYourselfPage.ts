import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//data
import time from "@data/timeout_data.json";
//declare

export default class HelpProtectYourselfPage extends BasePage {
  public learnAboutAnOptionLink = "//p/a[contains(text(), 'Learn about')]";
  public learnMoreJoeLink = "//p/a[contains(text(), 'Learn more with Joe')]";
  public trueRadio = "(//span[contains(text(),'True')])[1]";
  public falseRadio = "(//span[contains(text(),'False')])[1]";
  public trueRadioProtection = "(//span[contains(text(),'True')])[2]";
  public falseRadioProtection = "(//span[contains(text(),'False')])[2]";
  public findOutTruebtn =
    "(//strong[text()='True']/parent::div/following-sibling::div/a[contains(text(),'Find out')])[1]";
  public findOutFalsebtn =
    "(//strong[text()='False']/parent::div/following-sibling::div/a[contains(text(),'Find out')])[1]";

  public findOutTruebtnProtection =
    "(//strong[text()='True']/parent::div/following-sibling::div/a[contains(text(),'Find out')])[2]";
  public findOutFalsebtnProtection =
    "(//strong[text()='False']/parent::div/following-sibling::div/a[contains(text(),'Find out')])[2]";

  public findOutMore65btn =
    "//div[text()='even if you’re healthy.']/following-sibling::div[1]/a[1]";

  public findOutMore19btn =
    "//div[text()='with certain chronic conditions.']/following-sibling::div[1]/a[1]";
  public learnAboutAVaccineOption = "//h3/a[contains(@href,'adult.prevnar20')]";
}
