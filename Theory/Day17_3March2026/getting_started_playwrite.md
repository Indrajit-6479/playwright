#### Playwright Project File Structure

| File / Folder             | What It Is                          | Why It Is Important (Practical)                                      | How To Explain in Interview                                                                                                                     |
| ------------------------- | ----------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/`                  | Folder that contains all test files | You write all your automation test scripts here                      | "tests folder contains all my test specification files where I implement test cases using Playwright test framework."                           |
| `*.spec.ts` / `*.spec.js` | Individual test files               | Each file contains test cases using `test()` function                | "Each spec file contains multiple test scenarios grouped logically."                                                                            |
| `playwright.config.ts`    | Main configuration file             | Controls browser, base URL, retries, parallel execution, screenshots | "This is the central configuration file where we define test environment settings like browser type, timeouts, baseURL and execution strategy." |
| `package.json`            | Node project metadata file          | Manages dependencies and test scripts                                | "package.json manages project dependencies and defines scripts like running tests."                                                             |
| `node_modules/`           | Installed packages folder           | Stores Playwright and other libraries                                | "node_modules contains all installed project dependencies and should not be modified manually."                                                 |
| `package-lock.json`       | Dependency version lock file        | Ensures same package versions across environments                    | "package-lock.json locks exact dependency versions to maintain consistency across machines."                                                    |
| `README.md`               | Documentation file                  | Used to write project instructions                                   | "README.md contains project documentation and setup instructions."                                                                              |
| `playwright-report/`      | HTML test report folder             | Generated after running tests                                        | "After execution, Playwright generates an HTML report inside playwright-report folder for result analysis."                                     |
| `test-results/`           | Stores test artifacts               | Contains screenshots, videos, traces of failed tests                 | "test-results folder stores failure evidence like screenshots, videos and trace files for debugging."                                           |
| `.github/` (optional)     | CI/CD configuration                 | Used for GitHub Actions automation                                   | "This folder is used for CI/CD integration to run Playwright tests automatically on commits."                                                   |

#### 1️⃣ playwright.config.ts
| Configuration  | Purpose                                   |
| -------------- | ----------------------------------------- |
| `use.headless` | Run browser in background or visible mode |
| `baseURL`      | Common URL used in tests                  |
| `retries`      | Retry failed tests                        |
| `timeout`      | Maximum test execution time               |
| `projects`     | Run tests in multiple browsers            |
| `reporter`     | Configure test report format              |


#### 2️⃣ Test File Structure Example
```
import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Home');
});
```
```
Explanation for Interview:
test() → defines test case
page → browser tab instance
expect() → assertion
await → handles async operations
```

#### Real Practical Flow
1. You run:
```
npx playwright test
```
2. It reads `package.json` script
3. It loads `playwright.config.ts`
4. It executes files from `tests/`
5. It generates:
      `playwright-report/`
      `test-results/`