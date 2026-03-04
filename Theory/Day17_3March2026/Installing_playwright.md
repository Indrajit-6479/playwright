#### Installing Playwright:
- To install Playwright we required node installed in your system
- to check node is installed 
```
  node --version
```
- Along with node we have npm
```
  npm --version
```
- To install Playwright 
```
npm init playwright@latest
```

```
indrajitrananavare@Indrajits-MacBook-Air Day16_2March2026 % npm init playwright@latest
Need to install the following packages:
create-playwright@1.17.139
Ok to proceed? (y) y


> npx
> create-playwright

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · TypeScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
Initializing NPM project
```
- To check playwright version
```
npx playwright --version
```
- `npx = node package executer`

#### Playwright Run Commands:
1. `npx playwright test`
- Runs all tests on all browsers in headless mode.
- Headless mode means without launching the webpage it will execute the test on background and provide the test results.
- By default it will run on headless mode.

2. `npx playwright test`
- Runs all tests on all browsers in headless mode.

3. `npx playwright test --headed`
- Runs all tests in headed (non-headless) mode.

4. `npx playwright show-report`
- Opens the HTML test report.

5. `npx playwright test mytest.spec.ts`
- Runs a specific test file.

6. `npx playwright test --project=chromium --headed mytest.spec.ts`
- Runs a specific test file only on Chromium in headed mode.

7. `npx playwright test mytest1.spec.ts mytest2.spec.ts`
- Runs multiple specified test files.

8. `npx playwright test -g "test title"`
- Runs the test(s) that match the given title.

9. `npx playwright test --project=chromium`
- Runs all tests on the Chromium browser only.

10. `npx playwright test --debug`
- Runs tests in debug mode.

11. `npx playwright test example.spec.ts --debug`
- Debugs a specific test file.

12. `npx playwright test mytest.spec.ts –ui`
- Run the test in UI Mode