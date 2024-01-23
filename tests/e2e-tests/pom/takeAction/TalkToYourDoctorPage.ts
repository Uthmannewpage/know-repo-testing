import BasePage from "@pom/BasePage";
import Utilities from "@core_lib/utilities";
import { String } from "typescript-string-operations";
//declare

export default class TalkToYourDoctor extends BasePage {
  public pdfBtn = "//p/a[contains(@href, 'KP_DiscussionGuide_v12.pdf')]";
  public learnAboutAnOptionLink = "//h4/a[contains(text(), 'Learn about')]";
}
