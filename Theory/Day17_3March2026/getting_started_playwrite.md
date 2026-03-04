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


## Synchronous Vs Asynchronous
- Synchronous operations occur sequentially, blocking further execution until the current task completes, whereas asynchronous operations allow tasks to run concurrently without waiting, improving responsiveness      
  
## Synchronous vs Asynchronous — Interview Answer

### Synchronous

Synchronous means tasks execute **one by one**, in order.
The next step only starts **after** the previous one finishes.

**Example — Login Flow:**
- Step 1 → Get user data from database
- Step 2 → Validate if the user is a valid user
- Step 3 → If valid, log in to the website
- Step 4 → Mark today's attendance
- Step 5 → Logout

Each step depends on the previous one, so they run **one after another**. This is synchronous.

---

### Asynchronous

Asynchronous means multiple tasks can run **at the same time**, without waiting for each other.

**Example — Evening Multitasking:**
- Step 1 → Click play and start listening to music 🎵
- Step 2 → While music is playing, check the cricket match score 🏏
- Step 3 → While checking the score, pick up the phone and order food 🍕

All three things are happening **at the same time**. No step is waiting for another. This is asynchronous.

---

### Promise

A **Promise** in JavaScript/TypeScript means:
> "I will give you a result in the future — either success or failure."

- **Resolved** = task completed successfully ✅
- **Rejected** = task failed with an error ❌
```ts
const result = await getDataFromDB(); // returns a Promise
```

If the Promise is **rejected**, it throws an error and the next steps will not execute (unless you handle it with try/catch).

---

### await

`await` is used to **pause** the execution and wait for a Promise to complete before moving to the next step.

if we not use the `await` it will mixup and not get the desired result.

**Why do we need `await` in the login flow?**

Because each step **depends on the previous one**:
- You can only validate the user **after** you get the data from DB
- You can only give access **after** validating the user
- You can only mark attendance **after** login
- You can only logout **after** attendance is marked

So even though these are `async` functions (they return Promises), we use `await` to make them **behave like synchronous** — waiting for each step to finish before the next one starts.
```ts
async function loginFlow() {
  const userData = await getDataFromDB();       // Step 1
  const isValid = await validateUser(userData); // Step 2
  if (isValid) {
    await loginToWebsite();                     // Step 3
    await markAttendance();                     // Step 4
    await logout();                             // Step 5
  }
}
```

> **For synchronous code** — `await` is not needed because steps already execute one after another automatically.
> **For asynchronous code** — we use `await` when steps are dependent on each other and we need to control the order.

---

## Summary Table

|               | Synchronous       | Asynchronous                           |
| ------------- | ----------------- | -------------------------------------- |
| Execution     | One by one        | Concurrently                           |
| Waiting       | Yes, always waits | No waiting by default                  |
| Example       | Login flow        | Music + Cricket + Food                 |
| Need `await`? | No                | Yes, when steps depend on each other   |
| Returns       | Direct value      | Promise (resolved or rejected)       * |

**Note:**
- When you specify `await` you need to also specify the function is `async`
- It is recommended to put one assertion in one test, because if it is fail it will not other specified assertions.

## Playwright vs Selenium — Architecture Difference

### Selenium Architecture

**Flow:**
Language Bindings (Java, Python, JavaScript, C#)
  --> W3C WebDriver Protocol
  --> Browser Drivers (ChromeDriver, GeckoDriver, SafariDriver)
  --> HTTP REST Requests
  --> Real Browsers (Chrome, Firefox, Safari)

- Selenium internally uses the **W3C WebDriver Protocol**.
- It communicates via **HTTP REST calls** — meaning every command
  (click, type, navigate) opens a new HTTP request,
  sends the command, gets a response, and then closes the connection.
- Because of this **request-response cycle** for every single command,
  there is overhead on each action.
- Also, Selenium needs a **browser driver** as a middle layer
  (e.g., ChromeDriver for Chrome, GeckoDriver for Firefox),
  which adds an extra hop in the communication.
- This makes Selenium **relatively slower** in performance
  compared to Playwright.

---

### Playwright Architecture

**Flow:**
Language Bindings (JavaScript, TypeScript, Python, Java, C#)
  --> WebSocket Protocol (CDP - Chrome DevTools Protocol)
  --> Direct Browser Communication
  --> Real Browsers (Chrome, Firefox, Safari)

- Playwright internally uses **WebSocket protocol** with
  **Chrome DevTools Protocol (CDP)**.
- The key difference is: Playwright opens the connection **only once**
  at the start, sends all commands through that same open connection,
  and closes it only at the end.
- Because the connection stays **persistent**, there is no overhead
  of opening and closing a connection for every single command.
- Also, Playwright communicates **directly with the browser**
  without needing any separate browser driver as a middle layer.
- This makes Playwright **faster and more reliable** in performance
  compared to Selenium.

---

### Summary Table

| Feature                | Selenium                        | Playwright                    |
| ---------------------- | ------------------------------- | ----------------------------- |
| Protocol               | W3C WebDriver (HTTP REST)       | WebSocket (CDP)               |
| Browser Driver needed? | Yes (ChromeDriver, GeckoDriver) | No                            |
| Connection type        | Opens and closes per command    | Single persistent connection  |
| Speed                  | Slower                          | Faster                        |
| Languages              | Java, Python, JS, C#            | JS, TS, Python, Java, C#      |
| Browser Support        | Chrome, Firefox, Safari, Edge   | Chrome, Firefox, Safari, Edge |

---

### One Line Summary for Interview

> Selenium uses HTTP-based W3C WebDriver protocol with browser drivers
> as a middle layer, opening a new connection for every command —
> while Playwright uses WebSocket with CDP, opens the connection only once,
> communicates directly with the browser without any driver,
> which makes Playwright faster and more efficient.