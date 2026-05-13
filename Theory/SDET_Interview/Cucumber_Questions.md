## Cucumber Questions Answers
#### Q1. How cucumber actually works ?
```
Feature File (.feature)     →  written in Gherkin (Given/When/Then)
Step Definition (.java)     →  actual Java code that runs each step
Runner File (.java)         →  tells Cucumber where to find features & step defs
Hooks (.java)               →  runs Before/After each scenario (setup/teardown)
```
- Feature file = Test case written in plain English
- Step Definition = Actual automation code
- Runner file = Main class that starts everything
- Hooks = @BeforeMethod / @AfterMethod equivalent in Cucumber

#### Q2. Explain the Runner File — What each configuration means?
- The Runner file is the entry point of Cucumber execution. It tells Cucumber:
- Where are my feature files?
- Where are my step definitions?
- What tags to run?
- What reports to generate?
```java
@RunWith(Cucumber.class)                          // 1. Use Cucumber runner (JUnit)
@CucumberOptions(
    features = "src/test/resources/features",     // 2. Path to .feature files
    glue = "com.project.stepdefinitions",         // 3. Package of step def Java files
    tags = "@Regression and not @WIP",            // 4. Which scenarios to run
    monochrome = true,                            // 5. Clean console output
    dryRun = false,                               // 6. false = actually run tests
    plugin = {                                    // 7. Reporting plugins
        "pretty",                                 // readable console output
        "html:target/cucumber-reports/report.html",
        "json:target/cucumber-reports/report.json",
        "junit:target/cucumber-reports/report.xml"
    }
)
public class TestRunner {
    // This class body is intentionally empty
    // Cucumber handles everything via annotations
}
```
| Config              | What it does                        | Real Use                             |
| ------------------- | ----------------------------------- | ------------------------------------ |
| `features`          | Path to `.feature` files            | Points Cucumber to test cases        |
| `glue`              | Package of step definition classes  | Links English steps to Java code     |
| `tags`              | Filter which tests to run           | Run only `@Smoke` in CI/CD           |
| `dryRun = true`     | Check mapping without running tests | Verify all steps have definitions    |
| `monochrome = true` | Clean console output                | Removes garbage characters from logs |
| `plugin`            | Report generation configuration     | Generate HTML/JSON/Allure reports    |

#### Q. What happens if dryRun = true?
-  Cucumber checks if every step in the feature file has a matching step definition in Java 
-  but does not actually execute anything. 
-  I use this when someone writes new feature files to quickly validate all steps are mapped before running.

#### Q2. Explain Tags in Cucumber — How do you use them in real projects?
- Tags are like labels on scenarios. 
- You put `@TagName` above a scenario or feature, and in the runner you decide which tags to run.
- In Feature File:
```gherkin
@Regression @Smoke
Feature: Login Feature

  @Positive
  Scenario: Valid login
    Given user is on login page
    When user enters valid credentials
    Then user should see dashboard

  @Negative @WIP
  Scenario: Invalid login
    Given user is on login page
    When user enters invalid credentials
    Then user should see error message
```
- In Runner File — Tag Combinations:
```java
// Run only Smoke tests
tags = "@Smoke"

// Run Regression BUT skip WIP
tags = "@Regression and not @WIP"

// Run Smoke OR Sanity
tags = "@Smoke or @Sanity"

// Run Positive AND Regression
tags = "@Positive and @Regression"
```
- Real Project Usage:
```
@Smoke       → Run on every build (quick, 5-10 mins)
@Regression  → Run full suite (nightly build)
@WIP         → Work in progress, skip in CI
@P1          → Priority 1 critical tests
```
#### Q. Can you put a tag at Feature level and Scenario level both? What happens?
- Yes. If I put `@Regression` at Feature level, all scenarios in that feature inherit it. 
- If I also put `@Smoke` on one specific scenario, that scenario has both tags — `@Regression` and `@Smoke`.

#### Q3. What are Hooks in Cucumber? Explain with real scenario.
- Hooks are methods that run automatically before or after each Scenario. 
- I use them for setup and teardown like launching browser, taking screenshot on failure, closing browser.
```java
public class Hooks {

    @Before                          // Runs before EVERY scenario
    public void setUp(Scenario scenario) {
        System.out.println("Starting: " + scenario.getName());
        // Launch browser, open URL
        Driver.initializeBrowser();
    }

    @After                           // Runs after EVERY scenario
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            // Take screenshot and attach to report
            byte[] screenshot = ((TakesScreenshot) Driver.get())
                .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "Failure Screenshot");
        }
        Driver.closeBrowser();
    }

    @Before("@Database")             // Runs only before scenarios tagged @Database
    public void setUpDB() {
        // Connect to test database
    }

    @AfterStep                       // Runs after EVERY single step
    public void afterEachStep() {
        // Take screenshot after each step for detailed reporting
    }
}
```
- Order of execution:
```
@Before  →  Step1  →  @AfterStep  →  Step2  →  @AfterStep  →  @After
```
#### Q. If you have multiple @Before hooks, which runs first?
- You control order using @Before(order = 1). 
- Lower number runs first.
```java
@Before(order = 1)   // runs first
public void launchBrowser() {}

@Before(order = 2)   // runs second
public void loginUser() {}
```

#### Q4. What is Scenario Outline and Data Table? When do you use which?
**Scenario Outline:** 
- Run same scenario with multiple sets of data.
- Scenario Outline should having example section.
```gherkin
@Regression
Scenario Outline: Login with multiple users
  Given user is on login page
  When user enters "<username>" and "<password>"
  Then user should see "<message>"

  Examples:
    | username      | password  | message          |
    | admin@test.com| Admin@123 | Welcome Admin    |
    | user@test.com | User@123  | Welcome User     |
    | wrong@test.com| wrong123  | Invalid credentials|
```
- In Step Definition:
```java
@Given("user is on login page")
public void user_is_on_login_page() {
    driver.get("https://example.com/login");
}

@When("user enters {string} and {string}")
public void user_enters_and(String username, String password) {

    driver.findElement(By.id("username")).sendKeys(username);
    driver.findElement(By.id("password")).sendKeys(password);

    driver.findElement(By.id("loginBtn")).click();
}

@Then("user should see {string}")
public void user_should_see(String expectedMessage) {

    String actualMessage =
            driver.findElement(By.id("message")).getText();
    assertEquals(expectedMessage, actualMessage);
    driver.quit();
}
```
- This runs 3 times — once for each row.

**Data Table**
- Pass multiple values within a single step.
- It should having Scenario.
```gherkin
Scenario: Fill registration form
  Given user fills registration form with below details
    | Field     | Value          |
    | FirstName | John           |
    | LastName  | Doe            |
    | Email     | john@test.com  |
    | Phone     | 9876543210     |
```
- In Step Definition:
```java
@Given("user fills registration form with below details")
public void fillForm(DataTable dataTable) {
    Map<String, String> data = dataTable.asMap(String.class, String.class);
    driver.findElement(By.id("firstName")).sendKeys(data.get("FirstName"));
    driver.findElement(By.id("email")).sendKeys(data.get("Email"));
}
```

#### Q5. How does Parallel Execution work in Cucumber?
- In my project we had 200+ scenarios. 
- Running them one by one took 2 hours. 
- Parallel execution brought it down to 25 minutes.
- There are two ways:
**Way 1 — Parallel via Maven Surefire Plugin (most common)**
- In pom.xml:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0</version>
    <configuration>
        <!-- Run test methods in parallel -->
        <parallel>methods</parallel>
        <!-- 4 threads = 4 scenarios/tests run simultaneously -->
        <threadCount>4</threadCount>
        <!-- Creates 2 separate JVM processes for test execution -->
        <forkCount>2</forkCount>
    </configuration>
</plugin>
```
**Way 2 — Cucumber Native Parallel (Cucumber 6+)**
- In `junit-platform.properties` file:
```properties
cucumber.execution.parallel.enabled=true
cucumber.execution.parallel.config.strategy=fixed
cucumber.execution.parallel.config.fixed.parallelism=4
```
**Real Scenario Issue I faced:**
- When running parallel, multiple threads were sharing the same WebDriver instance and causing test interference.
- Solution — ThreadLocal WebDriver:
```java
public class DriverManager {
    // Each thread gets its OWN separate WebDriver
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void setDriver(WebDriver webDriver) {
        driver.set(webDriver);
    }

    public static void quitDriver() {
        driver.get().quit();
        driver.remove();    // Important: remove after quit
    }
}
```
#### Q. What problems can happen in parallel execution?
- When running parallel, multiple threads were sharing the same WebDriver instance and causing test interference. - Fixed with ThreadLocal
- Test data conflicts - Two tests using same user account. Fixed by using unique test data per thread
- Report merging issues — JSON reports from parallel runs need merging. Fixed with Masterthought/Allure plugin
- Static variables — Sharing static state between threads causes flaky tests

#### Q6. Reporting in Cucumber — What have you used?
1. Built-in Reports (Basic):
```java
plugin = {
    "pretty",                                          // Console output
    "html:target/report.html",                         // Basic HTML
    "json:target/report.json",                         // JSON (used by other tools)
}
```  
2. Allure Report (Advanced — what I used in project):
```java
// In pom.xml add allure-cucumber dependency
// In runner:
plugin = {"io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"}
```
```java
// In Step Definitions — attach extra info to report
@Step("User clicks login button")
public void clickLogin() {
    Allure.addAttachment("Page Screenshot", 
        new ByteArrayInputStream(screenshot));
    loginPage.clickLogin();
}
```
- Generate report:
```bash
allure serve target/allure-results
```
3. Masterthought Report (for parallel merged reports):
```xml
<!-- pom.xml plugin -->
<plugin>
    <groupId>net.masterthought</groupId>
    <artifactId>maven-cucumber-reporting</artifactId>
</plugin>
```
**What each report shows:**
| Report               | Shows                                                       |
| -------------------- | ----------------------------------------------------------- |
| Allure Report        | Step-by-step execution, screenshots, charts, history trends |
| Masterthought Report | Feature-wise pass/fail status, scenario breakdown           |
| ExtentReport         | Dashboard, pie charts, logs, screenshots                    |



  
