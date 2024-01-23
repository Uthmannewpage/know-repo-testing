import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//declare

export default class WhatIsPneumococcalPneumoniaPage extends BasePage {
  public viewTranscript =
    "//u[contains(text(), 'View Transcript') or contains(text(), 'Hide Transcript')]";
  public hideTranscript = "//u[contains(text(), 'Hide Transcript')]";
  public close = "//u[contains(text(),'Close')]";
  // True or False
  public trueRadio = "//span[contains(text(),'True')]";
  public falseRadio = "//span[contains(text(),'False')]";
  public findOutTruebtn =
    "//strong[text()='True']/parent::div/following-sibling::div/a[contains(text(),'Find out')]";
  public findOutFalsebtn =
    "//strong[text()='False']/parent::div/following-sibling::div/a[contains(text(),'Find out')]";
}
