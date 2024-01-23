const fs = require("fs");
const myArgs = process.argv.slice(2);
const urlFileEnv = ".env";
const urlFileReadMe = "README.md";
let envExist = false;
// check .env exist
try {
  fs.readFileSync(urlFileEnv);
  envExist = true;
} catch (err) {
  envExist = false;
}

if (!envExist) {
  // create env
  fs.readFile(urlFileReadMe, "utf8", (err, fileReadMe) => {
    const startIndex = fileReadMe.indexOf("- File .env content");
    const endIndex = fileReadMe.indexOf("## Run the test script");
    let result = fileReadMe
      .substring(startIndex, endIndex)
      .replace("```bash", "")
      .replace("```", "")
      .replace("- File .env content", "")
      .replaceAll("\n\n\n", "");
    fs.writeFileSync(urlFileEnv, result);
    updateBrowser();
  });
} else {
  updateBrowser();
}

// update browser in .env
function updateBrowser() {
  if (JSON.stringify(myArgs) != "[]") {
    const browser = myArgs[0];
    fs.readFile(urlFileEnv, "utf8", (err, fileEnv) => {
      if (err) {
        console.error(err);
        return;
      }
      const browsers = [
        "chromium",
        "firefox",
        "webkit",
        "mobileChrome",
        "safari",
      ];
      const layout =
        "# For example:\n" +
        "#    BROWSER=chromium                                                 # Run a browser\n" +
        "#    BROWSER=chromium,firefox,webkit, mobileChrome, safari            # Run multiple browsers\n" +
        "{0}";

      for (let i = 0; i < browsers.length; i++) {
        const browserInfo = layout.replace("{0}", "BROWSER= " + browsers[i]);
        const browserReplace = layout.replace("{0}", "BROWSER= " + browser);
        fileEnv = fileEnv.replace(browserInfo, browserReplace);
      }

      for (let i = 0; i < browsers.length; i++) {
        const browserInfo = layout.replace("{0}", "BROWSER=" + browsers[i]);
        const browserReplace = layout.replace("{0}", "BROWSER= " + browser);
        fileEnv = fileEnv.replace(browserInfo, browserReplace);
      }

      for (let i = 0; i < browsers.length; i++) {
        const browserInfo = layout.replace("{0}", "BROWSER = " + browsers[i]);
        const browserReplace = layout.replace("{0}", "BROWSER= " + browser);
        fileEnv = fileEnv.replace(browserInfo, browserReplace);
      }

      for (let i = 0; i < browsers.length; i++) {
        const browserInfo = layout.replace("{0}", "BROWSER =" + browsers[i]);
        const browserReplace = layout.replace("{0}", "BROWSER= " + browser);
        fileEnv = fileEnv.replace(browserInfo, browserReplace);
      }
      fs.writeFile(urlFileEnv, fileEnv, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}
