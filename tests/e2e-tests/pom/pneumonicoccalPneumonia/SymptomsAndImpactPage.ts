import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//declare

export default class SymptomsAndImpactPage extends BasePage {
  public learnMoreWithJoeBtn = "//p/a[contains(text(), 'Learn more with Joe')]";
  // True or False
  public trueRadio = "//span[contains(text(),'True')]";
  public falseRadio = "//span[contains(text(),'False')]";
  public findOutTruebtn =
    "//strong[text()='True']/parent::div/following-sibling::div/a[contains(text(),'Find out')]";
  public findOutFalsebtn =
    "//strong[text()='False']/parent::div/following-sibling::div/a[contains(text(),'Find out')]";
}
