import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//declare

export default class ShareYourStoryPage extends BasePage {
  public hadPneumoniaCbox = "//input[@id='hadPneumonia']";
  public hasTakenVaccineCbox = "//input[@id='hasTakenVaccine']";
  public firstNameInput = "//input[@id='firstName']";
  public lastNameInput = "//input[@id='lastName']";
  public emailInput = "//input[@id='email']";
  public phoneInput = "//input[@id='phone']";
  public submitBtn = "//button[contains(text(),'SUBMIT')]";
}
