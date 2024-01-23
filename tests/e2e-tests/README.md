## Introduction

This project with main purpose is to use playwright of typescript to do automated testing.  
It's an E2E and API automation testing framework.

## Project structure

```
e2e-tests/                        # Root project directory.
|── config/                       # All configuration for running.
│    └── config.ts                # E2e configuration contains test run, report, base URL, browser.
|── core_lib/                     # Libs directory.
│    └── utilities.ts             # Libs utilities include function for general use.
├── pom/                          # Page object model directory.
│    └── BasePage.ts              # Contains functions that help interacting with page such as click, fill, get text,...
|── tests/                        # Test root directory.
├── .env                          # env: setup environment.
├── .gitignore                    # Files or folders to ignore in a project.
├── package.json                  # Descriptive and functional metadata such as a name, version, and dependencies.
├── README.md                     # README: text file that introduces and explains a project.
└── tsconfig.json                 # The root of a TypeScript project.
```

## Setup environment

1. Install the required library environment: Nodejs: v20.x, npm: 10.x

- Download and install nodejs from link download: https://nodejs.org/en/download

- Install npm:

```bash
npm install npm@latest -g
```

2. Install library of NPM packages:

```bash
npm install
```

3. Install browser include chromium, firefox, webkit, ...

```bash
npx playwright install
```

4. Create an .env file in the project to set up the environment

- File .env content

```bash
# The path(s) to the test file(s) to run. This can be a single file or a glob pattern.
# This variable can hold single value or multiple values separated by comma.
# For example:
#   TEST_FILES_WEB=tests/*.ts                                        # Run all tests with E2E
#   TEST_FILES_WEB=tests/home.spec.ts                                # Run file with E2E
#   TEST_FILES_WEB=tests/home.spec.ts,tests/google_doc.spec.ts       # Run multiple test file with E2E
TEST_FILES_WEB=tests/*.spec.ts

# The browsers run on the desktop and mobile.
# Browser on the desktop: chromium, firefox, webkit, ...
# Browser on the mobile: mobileChrome, safari, ...
# This variable can hold single value or multiple values separated by comma.

# For example:
#    BROWSER=chromium                                                 # Run a browser
#    BROWSER=chromium,firefox,webkit, mobileChrome, safari            # Run multiple browsers
BROWSER= chromium
# The height and width of the browser are displayed
# For example:
#    BROWSER_HEIGHT=720
#    BROWSER_WIDTH=1280
BROWSER_HEIGHT=720
BROWSER_WIDTH=1280

# Base URl E2E
# For example:
#   APP_URL=https://main--aem-know-pneumonia--newpage-solutions-inc.hlx.live/
APP_URL=https://main--aem-know-pneumonia--newpage-solutions-inc.hlx.live/
```

## Run the test script

To run test with E2E test:

- Run test file

```bash
npm run web
```

- Run test file and view test report:

```bash
npm run web.report
```

- Run by headed:

```bash
npm run web.headed
```

- Run by headless:

```bash
npm run web.headless
```

- Run with the debug:

```bash
npm run web.debug
```

- Run by priority

```bash
npm run web.priority.high       # Run tests with HIGH tag
npm run web.priority.medium     # Run tests with MEDIUM tag
npm run web.priority.low        # Run tests with LOW tag
```

- Run by title

```bash
npx playwright test --config=config/web/config.ts -g "$TITLE"
```

To run test with Mobile test:

- Run test file on mobile

```bash
npm run web.mobile
```

- Run by headed on mobile

```bash
npm run web.headed.mobile
```

- Run by headless on mobile:

```bash
npm run web.mobile.headless
```

## Report

To view test report:

- View test report:

```bash
npm run report
```

- View test report with allure report:

```bash
npm run report.allure
```
