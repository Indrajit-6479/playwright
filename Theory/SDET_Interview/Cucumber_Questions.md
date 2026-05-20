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
- Hooks = @Before / @After equivalent in Cucumber

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

#### A step definition is not found, what do you do?
- This happened when a new feature file was written but step definitions were missing.
- **Step 1:** Run with dryRun = true — Cucumber prints the missing step definition template:
```
@Given("user is on login page")
public void user_is_on_login_page() {
    // Write code here
    throw new io.cucumber.java.PendingException();
}
```
**Step 2:** Copy the template, create the method in step def class, write the actual code.
**Step 3:** Set dryRun = false and run again.

#### Two step definitions match the same step — what happens?
- Cucumber throws AmbiguousStepDefinitionsException. 
- I fix this by making the regex/expression more specific in one of them.

#### Q7. What is the order of execution in Cucumber? 
```
Runner File starts
     ↓
@Before (Hooks)
     ↓
Scenario Step 1 → @AfterStep
     ↓
Scenario Step 2 → @AfterStep
     ↓
Scenario Step 3 → @AfterStep
     ↓
@After (Hooks)
     ↓
Next Scenario starts...
```
- With Background:
```
@Before Hook
     ↓
Background steps (run before EVERY scenario)
     ↓
Scenario steps
     ↓
@After Hook
```

#### Q. Does @Before run before Background or after?
-  `@Before` hook runs before Background. 
-  `Background` runs before scenario steps. 
-  So order is: `@Before` → `Background` → Scenario Steps → `@After`

#### Q8. What is the difference between Background and Hooks? 
- Both run before scenarios but they are completely different things.
**Background:**
- Background is written inside `.feature` file in Gherkin. 
- Background only for that specific feature file.
```gherkin
Feature: Shopping Cart

  Background:
    Given user is logged in          # runs before every scenario in THIS file
    And user is on homepage

  Scenario: Add item to cart
    When user adds item
    Then cart count should be 1

  Scenario: Remove item from cart
    When user removes item
    Then cart should be empty
```
**Hooks:**
- Hooks — Written in Java. Applies to all feature files globally.
```java
@Before
public void launchBrowser() {
    // runs before every scenario across ALL feature files
}
```
**Real Scenario:** In my project I used Background for steps like "Given user is on login page" which was common for all scenarios in login feature. But browser launch was in @Before hook because it needed to run for every feature file.

#### Q9. What is the difference between Scenario and Scenario Outline?
**Scenario:** 
- Scenario runs once with hardcoded data.
```gherkin
Scenario: Valid login
  Given user enters "admin@test.com" and "Admin@123"
  Then user sees dashboard
```
**Scenario Outline:**
- Scenario Outline runs multiple times, once per row in Examples table.
```gherkin
Scenario Outline: Login with multiple users
  Given user enters "<email>" and "<password>"
  Then user sees "<result>"

  Examples:
    | email          | password  | result    |
    | admin@test.com | Admin@123 | dashboard |
    | user@test.com  | User@123  | homepage  |
    | wrong@test.com | wrong     | error     |
```
- This runs 3 times automatically.

#### Q. Can you tag individual rows in Examples table?
-Yes
```gherkin
Examples:
  | email          | password  |
  @Smoke
  | admin@test.com | Admin@123 |
  @Regression
  | user@test.com  | User@123  |
```
#### Q10. What is glue in Runner file? What happens if it is wrong? 
- 'glue' tells Cucumber where to find the Step Definition Java files. 
- It is the package path.
```
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.project.stepdefs", "com.project.hooks"}  // multiple packages
)
```
#### Q. What happens if glue is wrong?
- Cucumber cannot find step definitions and throws:
```
UndefinedStepException: No step definitions found
```
- or it shows steps as undefined (yellow) in report.

#### Q. Can glue have multiple packages?"
- Answer: Yes, pass them as array.
```java
glue = {"com.stepdefs", "com.hooks", "com.utils"}
```

#### Q11. How do you share data between Steps in Cucumber? 
- 3 Ways I have used:
**Way 1 — Instance Variables (same class only)**
```java
public class LoginSteps {
    private String userName;   // shared between steps in THIS class only

    @Given("user enters credentials")
    public void enterCredentials() {
        userName = "admin@test.com";
    }

    @Then("verify username on dashboard")
    public void verifyUser() {
        Assert.assertEquals(dashboard.getUser(), userName);
    }
}
```
**Way 2 — PicoContainer (Dependency Injection) — Most Used in Projects**
```java
// Shared data class
public class TestContext {
    public String userName;
    public String orderId;
    public WebDriver driver;
}

// Step class 1
public class LoginSteps {
    TestContext context;

    public LoginSteps(TestContext context) {   // Cucumber injects automatically
        this.context = context;
    }

    @Given("user logs in")
    public void login() {
        context.userName = "admin@test.com";  // save to shared context
    }
}

// Step class 2
public class DashboardSteps {
    TestContext context;

    public DashboardSteps(TestContext context) {  // same object injected
        this.context = context;
    }

    @Then("verify user on dashboard")
    public void verify() {
        System.out.println(context.userName);  // access from shared context
    }
}
```
**Way 3 — Scenario Context using Map**
```java
public class ScenarioContext {
    private Map<String, Object> scenarioData = new HashMap<>();

    public void setData(String key, Object value) {
        scenarioData.put(key, value);
    }

    public Object getData(String key) {
        return scenarioData.get(key);
    }
}
```
#### Q12. Why not use static variables to share data?"
- Static variables cause serious problems in parallel execution. 
- because they are shared across the entire application. 
- In parallel execution, multiple threads or scenarios can access and modify the same static data at the same time, which may cause data overwriting, inconsistent behavior, and flaky test results.
- PicoContainer creates a fresh `TestContext` object per scenario, so each scenario has its own data — thread safe.

#### Q13. What is PicoContainer? Have you used Dependency Injection in Cucumber?
- PicoContainer is a lightweight dependency injection library that Cucumber uses to share objects between step definition classes.
- Without it: You cannot share data between two different step def classes.
- With it: Cucumber automatically creates and injects shared objects.
- Setup — add dependency in pom.xml:
```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>7.0.0</version>
    <scope>test</scope>
</dependency>
```
- How it works — Cucumber manages the object lifecycle:
```java
// Cucumber sees constructor needs TestContext
// It creates ONE TestContext object
// Injects SAME object into ALL step classes that need it
// After scenario ends — destroys it and creates fresh one for next scenario
```

**Sharing Data Between Step Classes in Cucumber**
**1. Using Dependency Injection (DI)**
- When using Cucumber with a DI framework like PicoContainer, Spring, or Guice:
- Cucumber automatically creates the `TestContext` object.
- The same object instance is injected into all step classes.
- No need to manually create objects using `new`.

- Example flow internally:

```java
TestContext context = new TestContext();

LoginSteps loginSteps = new LoginSteps(context);
DashboardSteps dashboardSteps = new DashboardSteps(context);
```
- Both step classes share the same `context` object.
  
- Example Using DI
  
- Shared Context Class

```java
public class TestContext {
    public String userName;
    public String orderId;
}
```
- Step Class 1
```java
public class LoginSteps {

    TestContext context;

    public LoginSteps(TestContext context) {
        this.context = context;
    }

    @Given("user logs in")
    public void login() {
        context.userName = "admin@test.com";
    }
}
```

- Step Class 2

```java
public class DashboardSteps {

    TestContext context;

    public DashboardSteps(TestContext context) {
        this.context = context;
    }

    @Then("verify user on dashboard")
    public void verify() {
        System.out.println(context.userName);
    }
}
```

**2. Without Dependency Injection (Manual Object Creation)**
- If DI is NOT used:
- You must manually create the `TestContext` object.
- You must manually pass the same object to all classes.
- Otherwise data will not be shared.

- Example Without DI
  
- Shared Context Class
```java
public class TestContext {
    public String userName;
}
```

- Step Class 1

```java
public class LoginSteps {

    TestContext context;

    public LoginSteps(TestContext context) {
        this.context = context;
    }

    public void login() {
        context.userName = "admin@test.com";
    }
}
```

- Step Class 2

```java
public class DashboardSteps {

    TestContext context;

    public DashboardSteps(TestContext context) {
        this.context = context;
    }

    public void verify() {
        System.out.println(context.userName);
    }
}
```

- Manual Object Creation

```java
public class Main {

    public static void main(String[] args) {

        // Manually create shared object
        TestContext context = new TestContext();

        // Pass same object to both classes
        LoginSteps login = new LoginSteps(context);
        DashboardSteps dashboard = new DashboardSteps(context);

        login.login();
        dashboard.verify();
    }
}
```


- Important Concept
- This works because both classes use the SAME object reference:

```java
LoginSteps ---> context
DashboardSteps ---> same context
```

- So changes made in one class are visible in another.

---

**Recommended Practice**

- Instead of public variables:

```java
public String userName;
```

- Use encapsulation:

```java
private String userName;

public String getUserName() {
    return userName;
}

public void setUserName(String userName) {
    this.userName = userName;
}
```

- This is safer and cleaner for large frameworks.

#### Q14. What is the difference between @Before and @BeforeStep? When do you use each?
```java
@Before          // runs ONCE before entire scenario starts
public void setUp() {
    driver = new ChromeDriver();
    driver.get("https://myapp.com");
}

@BeforeStep      // runs before EVERY individual step
public void beforeEachStep() {
    // log step name, take screenshot before each step
}

@AfterStep       // runs after EVERY individual step
public void afterEachStep(Scenario scenario) {
    // take screenshot after each step — useful for debugging
    byte[] screenshot = ((TakesScreenshot)driver)
        .getScreenshotAs(OutputType.BYTES);
    scenario.attach(screenshot, "image/png", "Step Screenshot");
}

@After           // runs ONCE after entire scenario ends
public void tearDown(Scenario scenario) {
    if(scenario.isFailed()) {
        // take failure screenshot
    }
    driver.quit();
}
```
- usage in my project:
- `@Before` → Launch browser, navigate to URL
- `@After` → Screenshot on failure, close browser
- `@AfterStep` → Only enabled when debugging a flaky test to see exactly which step fails
- Don't use `@AfterStep` for all runs in production — it generates too many screenshots and slows execution significantly.

#### Q15. How do you handle a failed scenario — take screenshot and attach to report?
- This is something every real project has. I implemented this in Hooks:
```
@After
public void tearDown(Scenario scenario) {

    // Check if scenario failed
    if (scenario.isFailed()) {

        // Cast driver to TakesScreenshot
        TakesScreenshot ts = (TakesScreenshot) DriverManager.getDriver();

        // Capture screenshot as bytes
        byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);

        // Attach to Cucumber report with name
        scenario.attach(screenshot, "image/png",
            "FAILED - " + scenario.getName());

        // Also save to file system
        File src = ts.getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(src,
            new File("screenshots/" + scenario.getName() + ".png"));
    }

    DriverManager.quitDriver();
}
```

#### Q16. How do you get the scenario name and status in Hook?
- Pass `Scenario scenario` as parameter to `@Before` or `@After` method. Cucumber automatically injects it.
```java
scenario.getName()      // scenario name
scenario.isFailed()     // true if failed
scenario.getStatus()    // PASSED, FAILED, SKIPPED
scenario.getId()        // unique scenario id
```

#### Q17. What is dryRun — Real use case?
- `dryRun = true` — Cucumber validates that every step in feature file has a matching step definition in Java. It does not actually execute any test.
```
dryRun = true  →  No execution, only validation
dryRun = false →  Actually runs all tests (default)
```
- Common Mistake: When we Forgetting to `set dryRun = false` before actual test run. Tests show as passed but nothing actually ran!

#### Q18. What is Cucumber Expression vs Regular Expression in Step Definitions?
- Cucumber Expression — Simple, readable, modern way (recommended):
```java
@Given("user enters {string} as username")
public void enterUsername(String username) { }

@When("user clicks login {int} times")
public void clickLogin(int times) { }

// {string} → matches "any text in quotes"
// {int}    → matches any integer
// {double} → matches decimal number
// {word}   → matches single word without spaces
```

- Regular Expression — Old way, more complex but more powerful:
```java
@Given("^user enters \"([^\"]*)\" as username$")
public void enterUsername(String username) { }

@When("^user clicks login (\\d+) times$")
public void clickLogin(int times) { }
```
- Which one I use and why:
In my project we use Cucumber Expressions for all new step definitions because they are much more readable. Regular expressions are only in older step defs written before we standardized.

#### Q19. What is an Ambiguous Step Definition error?
- When two step definitions match the same step text, Cucumber throws `AmbiguousStepDefinitionsException`. Example:
```
@Given("user is on {word} page")
@Given("user is on login page")
// Both match "user is on login page" → AMBIGUOUS
```
- Fix: Make one, more specific or rename one of them.

#### Q20. What is the difference between `json` plugin and `html` plugin in reports?
```
plugin = {
    "html:target/cucumber-report.html",    // human readable, open in browser
    "json:target/cucumber-report.json",    // machine readable, used by other tools
    "junit:target/cucumber-report.xml"     // for CI/CD tools like Jenkins
}
```
- Real usage:
- html → Quick local check after test run
- json → Fed into Masterthought or Allure to generate beautiful reports
- junit xml → Jenkins reads this to show pass/fail on CI dashboard

#### Q. How Allure uses JSON:
```bash
# After test run, json file is generated
# Allure reads it and generates dashboard
allure serve target/allure-results
```

#### Q21. In parallel execution, multiple JSON files are generated. How do you merge them into one report?
- Use Masterthought plugin in pom.xml 
- It automatically picks all JSON files from the folder and merges into one combined HTML report.

#### Q22. How do you run only failed scenarios from last run? 
- This is very useful in real projects. If 200 scenarios run and 10 fail, you don't want to re-run all 200.
- As per standard practice I will created two `TestRunner` classes. One for full run and second for re-run.
- Cucumber has a built-in @CucumberOptions for this:
- For this to work, add the rerun plugin in main runner:
```java
@CucumberOptions(
    features = "src/test/resources/features",     // all feature file which need to run
    glue = "com.project.stepdefinitions",         
    tags = "@Regression and not @WIP",            
    monochrome = true,                           
    dryRun = false,                               
    plugin = {                                    
        "pretty",                                 
        "html:target/cucumber-reports/report.html",
        "json:target/cucumber-reports/report.json",
        "junit:target/cucumber-reports/report.xml"
        "rerun:target/failed_scenarios.txt"          // writes failed scenario paths here automatically
    }
)
public class TestRunner { }
```

```java
@CucumberOptions(
    features = "@target/failed_scenarios.txt",  // re-run only failed
    glue = "com.project.stepdefinitions"
)
public class FailedTestRunner { }
```

- After first run, `failed_scenarios.txt` contains:
```gherkin
src/test/resources/features/login.feature:15
src/test/resources/features/checkout.feature:42
```
- Run `FailedTestRunner` → only those 2 scenarios run.
- This saved us a lot of time in CI/CD. If nightly run had 15 failures, instead of re-running 300 scenarios, we re-ran only the 15 failed ones in next build.
- Note: In CI/CD Jenkins we need to first check if `failed_scenarios.txt` is created, if yes need to read and then execute using `mvn test -Dtest=FailedTestRunner` otherwise pipeline may fail unnecessarily.

#### Q23. What is Cucumber's World Object? 
- In Cucumber-JVM, the World Object concept is implemented through fresh step definition instances for every scenario. 
- Each scenario gets isolated test data and state. 
- Static variables are dangerous because they share memory across all scenarios and can cause data corruption during parallel execution. 

#### Q24. How do you integrate Cucumber with CI/CD Jenkins?
- In my project our CI/CD flow was:
```
Developer pushes code to Git
       ↓
Jenkins pipeline triggers automatically
       ↓
Maven command runs Cucumber tests
       ↓
JSON report generated
       ↓
Masterthought/Allure plugin generates HTML report
       ↓
Jenkins publishes report on dashboard
       ↓
Email notification sent with pass/fail summary
```
- Jenkins Maven command:
```bash
# Run only Regression tag
mvn test -Dcucumber.filter.tags="@Regression"

# Run specific feature file
mvn test -Dcucumber.features="src/test/resources/features/login.feature"

# Run with specific environment
mvn test -Denv=staging -Dcucumber.filter.tags="@Smoke"
```
**Jenkins:**
- Initially, we were using a Jenkins Declarative Pipeline for automation execution.
- In the Jenkinsfile, we used Maven commands with Groovy syntax to trigger Cucumber Java test suites on the Jenkins server.
- The pipeline flow was:
  - Code checkout from Git
  - Execute Maven test commands
  - Generate reports
  - Trigger automatic email notifications after execution.
  
**Docker:** 
- Later, we integrated Docker to improve execution speed and reduce environment dependency issues. 
- Instead of performing complete code checkout and build setup every time on Jenkins, we created lightweight Docker images.
- Inside the Dockerfile:
  - We used a base image like Java/Maven
  - Copied the required project folders
  - Installed dependencies
  - Used ENTRYPOINT to trigger test execution automatically when the container starts.

**Lightspeed**
- After Docker adoption, we gradually reduced direct Jenkins dependency.
- We integrated the solution with Lightspeed CI/CD pipeline. 
- Whenever code is pushed to GitHub, the Lightspeed pipeline gets triggered automatically.

**Openshift**
- Pipeline configuration was maintained in deploymentconfig.yml, which was integrated with OpenShift for deployment and execution orchestration.

**Harness**
- For monitoring and log tracking, we used Harness to verify execution logs, deployment status, and pipeline activity.

#### Q. Why Docker ?
- Docker helped us achieve consistent execution environments, faster setup, lightweight execution, and reduced Jenkins dependency issues.

#### Q. Why move away from Jenkins?
- We wanted a more cloud-native CI/CD approach with containerized execution, GitHub-triggered pipelines, OpenShift integration, and centralized monitoring through Harness.

#### Q25. Can you write basic jenkins file syntax ?
```groovy
pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                sh 'mvn clean test -Dcucumber.filter.tags="@Regression"'
            }
        }

        stage('Report') {
            steps {
                cucumber 'target/cucumber-reports/*.json'
            }
        }
    }

    post {

        always {
            emailext(
                subject: "Build ${BUILD_NUMBER}",
                body: "Test Execution Completed",
                to: 'team@company.com'
            )
        }

        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }
    }
}
```
- agent any → Run on any Jenkins agent/node

#### Q26. Can you write basic docker file ?
```dockerfile
# Base Image
FROM maven:3.9.6-eclipse-temurin-17

# Create working directory
WORKDIR /automation

# Copy project files
COPY . .

# Install dependencies & build project
RUN mvn clean install -DskipTests

# Execute test suite when container starts
ENTRYPOINT ["mvn","test","-Dcucumber.filter.tags=@Regression"]
```

#### Q27. Your step definition works for one scenario but fails for another with same step text. Why?
- This actually happened in my project. Same step `"Given user is on login page"` was working in one feature file but failing in another.
- Root Causes I investigated:
 1. Different glue package — Step def was in a package not included in `glue`
 2. Encoding issue — Feature file had special invisible characters (copy-pasted from Word doc). Fix: Retype the step manually.
 3. Extra space or case difference — `"login Page"` vs `"login page"` — step def is case sensitive 
 4. Wrong parameter type — `{string}` expects quoted text but step had unquoted text
- How I debugged:
```java
// Set dryRun = true first
// Cucumber shows exactly which steps are undefined
// Compare character by character with step definition annotation
```    

  



  
