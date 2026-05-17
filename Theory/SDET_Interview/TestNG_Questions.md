## Part 2: TestNG — Complete Interview Guide (SDET 5-6 Years)
#### Q1. Understand How TestNG Actually Works ?
```
testng.xml                →  Master config file (what to run, how to run)
@Test methods             →  Actual test methods in Java class
Annotations               →  @BeforeMethod, @AfterMethod, @DataProvider etc.
Listeners                 →  Watch test execution, generate reports, take screenshots
Groups                    →  Label tests like @Smoke, @Regression
```
- Simple flow:
```
testng.xml starts
     ↓
@BeforeSuite  (runs once — entire suite)
     ↓
@BeforeClass  (runs once — per class)
     ↓
@BeforeMethod (runs before every @Test)
     ↓
@Test method runs
     ↓
@AfterMethod  (runs after every @Test)
     ↓
@AfterClass   (runs once — per class)
     ↓
@AfterSuite   (runs once — entire suite ends)
```

#### Q2. Explain testng.xml — Every Tag in Detail 
- `testng.xml` is the heart of TestNG. 
- It controls what runs, in what order, with how many threads, with what parameters.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">

<!-- SUITE: Top level container. One testng.xml = one suite -->
<suite name="Automation Suite"
       verbose="1"
       parallel="methods"
       thread-count="4"
       data-provider-thread-count="3">

    <!-- LISTENERS: Plug in custom classes for reporting/screenshots -->
    <listeners>
        <listener class-name="com.project.listeners.ExtentReportListener"/>
        <listener class-name="com.project.listeners.ScreenshotListener"/>
    </listeners>

    <!-- PARAMETERS: Global values accessible in all test classes -->
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="staging"/>
    <parameter name="baseURL" value="https://staging.myapp.com"/>

    <!-- TEST: Group of classes. Can have multiple <test> blocks -->
    <test name="Smoke Tests" enabled="true">

        <!-- Run only these groups -->
        <groups>
            <run>
                <include name="Smoke"/>
                <exclude name="WIP"/>
            </run>
        </groups>

        <!-- CLASSES: Which Java test classes to include -->
        <classes>
            <class name="com.project.tests.LoginTest">
                <!-- Include/exclude specific methods -->
                <methods>
                    <include name="verifyValidLogin"/>
                    <exclude name="verifyForgotPassword"/>
                </methods>
            </class>
            <class name="com.project.tests.HomePageTest"/>
            <class name="com.project.tests.CheckoutTest"/>
        </classes>
    </test>

    <!-- Second test block — runs separately -->
    <test name="Regression Tests">
        <classes>
            <class name="com.project.tests.RegressionTest"/>
        </classes>
    </test>

</suite>
```
**Explanation:**
- At the top level, we define the <suite> which acts as the main execution container for all test cases.
  
```xml
<suite name="Automation Suite"
parallel="methods"
thread-count="4">
```
- Here:
   - parallel="methods" enables parallel execution
   - thread-count="4" means 4 test methods can run simultaneously for faster execution.
  
- We also configured listeners:
```xml
<listeners>
```
- Listeners are used for:
  - Extent report generation 
  - Screenshot capture on failure
  - Logging and custom reporting.
  
- Then we defined global parameters:
```xml
<parameter name="browser" value="chrome"/>
```
- These parameters help us pass:
  - Browser type
  - Environment
  - Base URL dynamically during execution.
  
- Inside <test> blocks, we grouped test execution.
```xml
<include name="Smoke"/>
```  
- This runs only Smoke test group.
- We also used:
  - Include/Exclude groups
  - Include/Exclude methods to control selective execution.

- Under <classes>, we specify which test classes should execute.
- We can create multiple <test> blocks like:
  - Smoke Tests
  - Regression Tests
- so suites can run independently within the same XML.

#### Q3. All TestNG Annotations — Order of Execution
```java
public class TestNGAnnotationsDemo {

    @BeforeSuite
    // Runs ONCE before entire suite
    // Executed FIRST
    public void beforeSuite() {
        System.out.println("Suite started — connect to DB, init reporting");
    }

    @BeforeTest
    // Runs before each <test> tag in testng.xml
    // Executed SECOND
    public void beforeTest() {
        System.out.println("Test block started");
    }

    @BeforeClass
    // Runs ONCE before first method in class
    // Executed THIRD
    public void beforeClass() {
        System.out.println("Class started — launch browser once");
    }

    @BeforeMethod
    // Runs before EVERY @Test method
    // Executed FOURTH (before each test)
    public void beforeMethod() {
        System.out.println("Before each test — navigate to homepage");
    }

    @Test
    // Actual test execution
    // Executed FIFTH
    public void testOne() {
        System.out.println("Test 1 running");
    }

    @AfterMethod
    // Runs after EVERY @Test method
    // Executed SIXTH
    public void afterMethod() {
        System.out.println("After each test — clear cookies, take screenshot");
    }

    @BeforeMethod
    // Runs again before second test
    // Executed SEVENTH
    public void beforeMethod2() {
        System.out.println("Before each test — navigate to homepage");
    }

    @Test
    // Second test execution
    // Executed EIGHTH
    public void testTwo() {
        System.out.println("Test 2 running");
    }

    @AfterMethod
    // Runs after second test
    // Executed NINTH
    public void afterMethod2() {
        System.out.println("After each test — clear cookies, take screenshot");
    }

    @AfterClass
    // Runs ONCE after all methods in class
    // Executed TENTH
    public void afterClass() {
        System.out.println("Class ended — close browser");
    }

    @AfterTest
    // Runs after each <test> block in xml
    // Executed ELEVENTH
    public void afterTest() {
        System.out.println("Test block ended");
    }

    @AfterSuite
    // Runs ONCE after entire suite
    // Executed LAST
    public void afterSuite() {
        System.out.println("Suite ended — close DB, send email report");
    }
}
```
- Actual output order:
```
BeforeSuite
  BeforeTest
    BeforeClass
      BeforeMethod → Test1 → AfterMethod
      BeforeMethod → Test2 → AfterMethod
    AfterClass
  AfterTest
AfterSuite
```
#### Q. If @BeforeMethod fails, does @Test run?
- Answer: No. If @BeforeMethod fails, TestNG skips the @Test method and marks it as SKIPPED - not FAILED. 
- The @AfterMethod still runs though.

#### Q4. TestNG Attributes — priority, groups, enabled, timeOut, invocationCount
**`priority` — Control execution order**
```java
@Test(priority = 1)               // runs first
public void loginTest() { }       

@Test(priority = 2)               // runs second
public void searchTest() { }      

@Test(priority = 3)               // runs third
public void checkoutTest() { }    

@Test                             // default priority = 0 (runs before priority 1, yes heard correct)
public void homePageTest() { }
```
- Tricky Point: Default priority is 0. So a test with no priority runs before priority = 1. This surprises many people.

**`groups` — Label and filter tests**
```java
@Test(groups = {"Smoke", "Regression"})
public void loginTest() { }

@Test(groups = {"Regression"})
public void advancedSearchTest() { }

@Test(groups = {"WIP"})
public void newFeatureTest() { }   // excluded in testng.xml
```

**`enabled` — Skip a test without deleting it**
```java
@Test(enabled = false)             // test is skipped — not deleted
public void brokenTest() {
    // will not run until enabled = true
}
```

**`timeOut` — Fail test if it takes too long**
```java
@Test(timeOut = 3000)              // fails if test takes more than 3 seconds
public void performanceTest() {
    // if this takes 5 seconds → test FAILS with timeout error
}
```

**`invocationCount` — Run same test multiple times**
```java
@Test(invocationCount = 5)         // runs this test 5 times
public void loadTest() {
    // useful for load testing or flaky test detection
}

// With parallel threads:
@Test(invocationCount = 10, threadPoolSize = 3)  // run 10 times, 3 at a time
public void parallelLoadTest() { }
```
**`dependsOnMethods` — Test depends on another test passing**
```java
@Test
public void loginTest() {
    // login logic
}

@Test(dependsOnMethods = {"loginTest"})
public void dashboardTest() {
    // only runs if loginTest PASSED
    // if loginTest fails → dashboardTest is SKIPPED
}

@Test(dependsOnMethods = {"dashboardTest"})
public void checkoutTest() {
    // only runs if dashboardTest PASSED
}
```
#### Q5. What is `alwaysRun = true`?
- `alwaysRun = true` forces a configuration method or test method to execute even if previous methods fail or get skipped.
```java
@AfterMethod(alwaysRun = true)
// Runs even if @Test fails
public void tearDown() {

    driver.quit(); // Always closes browser
}
```
- We commonly use `alwaysRun = true` in cleanup methods like:
  - Browser closing
  - Logout
  - Report flushing
  - DB cleanup

#### Q6. @DataProvider — Complete Explanation with Real Scenarios 
- `@DataProvider` is used for data-driven testing in TestNG. 
- It supplies multiple sets of data to a single test method, allowing the same test to run repeatedly with different inputs. 
- In real projects, we commonly integrate it with Excel using Apache POI and also run DataProviders in parallel for faster execution.
- Basic Syntax:
```java
@DataProvider(name = "loginData")
public Object[][] getData() {

    return new Object[][] {

        {"admin@test.com", "Admin@123"},
        {"user@test.com", "User@123"},
        {"wrong@test.com", "wrong123"}

    };
}

@Test(dataProvider = "loginData")
public void loginTest(String email, String password) {
    System.out.println(email + " " + password);
}
```
- Execution Flow:
```
Iteration 1 → admin@test.com / Admin@123
Iteration 2 → user@test.com / User@123
Iteration 3 → wrong@test.com / wrong123
```
- Same test method runs multiple times with different data.
- In real projects, we usually use `@DataProvider` for
  - API request variations
  - Multiple user roles 
  
**Excel DataProvider**
- We generally fetch test data from Excel using Apache POI.
```java
@DataProvider(name = "excelData")
public Object[][] getDataFromExcel() throws IOException {
    // Read Excel file
    FileInputStream fis = new FileInputStream("testdata/LoginData.xlsx");
    XSSFWorkbook workbook = new XSSFWorkbook(fis);
    XSSFSheet sheet = workbook.getSheet("LoginSheet");

    int rowCount = sheet.getLastRowNum();
    int colCount = sheet.getRow(0).getLastCellNum();

    Object[][] data = new Object[rowCount][colCount];

    for (int i = 1; i <= rowCount; i++) {        // start from 1 to skip header
        for (int j = 0; j < colCount; j++) {
            data[i-1][j] = sheet.getRow(i).getCell(j).getStringCellValue();
        }
    }
    workbook.close();
    return data;
}
```

- In framework design, we usually keep DataProviders in a separate utility class for reusability.
```java
@Test(dataProvider = "loginData",
      dataProviderClass = TestDataProvider.class)
public void loginTest(String email, String password) {
     System.out.println(email + " " + password);
}
```
- Parallel Execution:
```java
@DataProvider(name = "loginData", parallel = true)
```
- This runs multiple data sets in parallel to reduce execution time.

#### Q7. Difference Between `@Parameters` and `@DataProvider`
```java
// Parameters — single value from xml
@Test
@Parameters({"browser"})
public void test(String browser) { }

// DataProvider — multiple rows, test runs multiple times
@Test(dataProvider = "browsers")
public void test(String browser) { }
```

| @Parameters                    | @DataProvider                  |
| ------------------------------ | ------------------------------ |
| Values come from `testng.xml`  | Values come from Java method   |
| Single set of data             | Multiple rows of data          |
| No looping                     | Test runs multiple times       |
| Mostly for environment/browser | Mostly for data-driven testing |

#### Q8. How do you pass Parameters from testng.xml to test?
- `@Parameters` in TestNG is used to pass values from testng.xml to test methods at runtime.
- It helps make the framework dynamic by avoiding hardcoded values.
- testng.xml:
```
<suite name="Suite">

    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="staging"/>

    <test name="Login Test">

        <parameter name="baseURL"
                   value="https://staging.myapp.com"/>

        <classes>
            <class name="com.project.tests.LoginTest"/>
        </classes>

    </test>
</suite>
```
```java
public class LoginTest {

    @BeforeMethod
    @Parameters({"browser", "baseURL"})
    // Values come from testng.xml
    public void setUp(String browser, String baseURL) {

        if(browser.equals("chrome")) {
            driver = new ChromeDriver();
        }
        else if(browser.equals("firefox")) {
            driver = new FirefoxDriver();
        }

        driver.get(baseURL);
    }

    @Test
    @Parameters({"environment"})
    public void loginTest(String environment) {

        System.out.println("Running on: " + environment);
    }
}
```
#### Q9. What is Parallel Execution?
- Parallel execution in TestNG is used to run multiple test cases simultaneously using multiple threads.
- This helps reduce execution time significantly in large regression suites and is heavily used in CI/CD pipelines.
- There are 4 Types of Parallel Execution in TestNG
1. parallel="methods"
- Each `@Test` method runs in a separate thread.
```xml
<suite parallel="methods" thread-count="4">
```
- Use Case:
  - Faster execution within same class
  - Independent test methods

2. parallel="tests"
- Each <test> tag runs in a separate thread.
```xml
<suite parallel="tests" thread-count="2">
```
- Mostly used for:
  - Cross-browser testing
  - Environment-based execution

3. parallel="classes"
- Each test class runs in separate thread.
```xml
<suite parallel="classes" thread-count="3">
```
- Best For:
  - Large framework
  - Independent modules

4. parallel="instances"
- Each object instance of a class runs in parallel.
```xml
<suite parallel="instances" thread-count="2">
```
- Mostly Used With:
  - DataProvider
  - Factory pattern

**In real-time projects, parallel execution is incomplete without proper WebDriver thread management.**
- ThreadLocal WebDriver Implementation:
```java
public class DriverManager {

    private static ThreadLocal<WebDriver> tlDriver = new ThreadLocal<>();

    public static void initDriver(String browser) {

        WebDriver driver;

        if(browser.equals("chrome")) {
            driver = new ChromeDriver();
        } else {
            driver = new FirefoxDriver();
        }

        tlDriver.set(driver);
    }

    public static WebDriver getDriver() {
        return tlDriver.get();
    }

    public static void quitDriver() {
        tlDriver.get().quit();
        tlDriver.remove();
    }
}
```
- ThreadLocal creates a separate copy of WebDriver for each thread.
- So when tests run in parallel, drivers do not overwrite each other.
- Without ThreadLocal, parallel execution causes session overwrite issues because multiple threads try to use the same WebDriver instance.

- Cross Browser Parallel Execution:
```java
<suite name="CrossBrowser Suite" parallel="tests" thread-count="2">

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.project.tests.LoginTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.project.tests.LoginTest"/>
        </classes>
    </test>

</suite>
```
- Here the same test suite runs simultaneously on Chrome and Firefox using separate threads.

#### Q. What issues did you face in parallel execution?
1. Shared WebDriver Issue:
- Problem:
  - One driver session overwritten by another thread
- Solution:
  - Implemented ThreadLocal

2. Race Condition in Test Data
- Problem:
  - Multiple threads using same user/account
- Solution:
  - Generated unique test data per execution
  - Used UUID/timestamp/random users

3. Static Members Problems
- Problem:
  - Static members shared across threads
- Solution:
  - Replaced static objects with:
  - ThreadLocal
  - Instance-level objects

4. Reporting Conflicts
- Problem:
  - Logs mixed between threads
- Solution:
  - Used thread-safe reporting
- Example:
  - ExtentReports with synchronized methods
  - Thread-safe listeners

5. Environment Instability
- Problem:
  - Selenium Grid node failures
  - Browser crashes
Solution:
  - RetryAnalyzer
  - Stable waits
  - Proper cleanup in @AfterMethod
  
#### Q. Why not use static WebDriver?
- Static WebDriver becomes shared across threads, causing synchronization issues during parallel execution.

#### Q. Difference Between ThreadLocal and Singleton?
| ThreadLocal                 | Singleton                        |
| --------------------------- | -------------------------------- |
| Separate object per thread  | Single object for entire JVM     |
| Used for parallel execution | Used for shared resources        |
| Thread-safe for WebDriver   | Not suitable for parallel driver |

#### Q. Which Parallel Mode Did You Use Most?
- Mostly `parallel=tests` for cross-browser execution and `parallel=classes` for regression suite optimization.

#### Q10. TestNG Listeners — What, Why, How?
- Listeners are interfaces provided by TestNG.
- They used to monitor test execution events and perform custom actions automatically during runtime.
- Mostly ITestListener used for screenshot capture, Extent reporting, logging, retry handling, and failure debugging.
- The listener methods like onTestStart, onTestSuccess, and onTestFailure get triggered automatically by TestNG during execution.
- We usually configure listeners through testng.xml for centralized management.
- In parallel execution, we use ThreadLocal WebDriver to ensure listeners capture the correct browser instance safely.
- Listeners help us separate framework-level concerns from actual test scripts, which improves maintainability and scalability.
- Commonly Used Listeners:
| Listener                 | Purpose                        |
| ------------------------ | ------------------------------ |
| `ITestListener`          | Track test execution events    |
| `ISuiteListener`         | Before/after suite execution   |
| `IInvokedMethodListener` | Before/after every method      |
| `IRetryAnalyzer`         | Retry failed tests             |
| `IAnnotationTransformer` | Modify annotations dynamically |
| `IReporter`              | Generate custom reports        |
  

  
```java
public class TestListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("STARTED: " + result.getName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("PASSED: " + result.getName());
    }

    @Override
    public void onTestFailure(ITestResult result) {

        System.out.println("FAILED: " + result.getName());

        WebDriver driver = DriverManager.getDriver();

        File screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.FILE);

        // Attach to report
        ExtentReportManager.getTest()
                .fail(result.getThrowable());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("SKIPPED: " + result.getName());
    }
}
```

#### Q11. Explain How to Add Listeners ?
* Way 1 — testng.xml (Most Preferred):
```xml
<listeners>
    <listener class-name="com.project.listeners.TestListener"/>
</listeners>
```
- This is the most maintainable approach because listener configuration stays centralized.

* Way 2 — Annotation:
```java
@Listeners(TestListener.class)
public class LoginTest {
}
```
- Useful for class-specific listeners.

* Way 3 — Programmatically
```java
TestNG testNG = new TestNG();
testNG.addListener(new TestListener());
```
- Mainly used in custom framework runners.

#### Q. Difference between ITestListener, ISuiteListener, IInvokedMethodListener
- `ITestListener` works at test method level and handles pass, fail, skip events.
- `ISuiteListener` works at suite level and is used for setup/teardown before and after execution.
- `IInvokedMethodListener` runs before and after every method invocation.
- We mainly use them for reporting, logging, and execution tracking.

#### Q. How listeners work in parallel execution?
- In parallel execution, multiple test threads trigger listener methods simultaneously.
- If WebDriver or reports are shared, it can cause synchronization issues.
- To avoid this, we use ThreadLocal WebDriver and thread-safe reporting.
- This ensures each thread handles its own browser and logs correctly.

#### Q. How do you capture screenshots in listeners? OR How do you integrate listeners with Allure/Extent Reports?
- We capture screenshots inside onTestFailure() of ITestListener.
- The listener gets the failed test context using ITestResult.
- Using the current WebDriver instance, we take screenshots with TakesScreenshot.
- Then we attach the screenshot to Extent or Allure reports.
```java
@Override
public void onTestFailure(ITestResult result) {

    WebDriver driver = DriverManager.getDriver();

    String path = ScreenshotUtil.captureScreenshot(
            driver,
            result.getName());

    ExtentReportManager.getTest()
            .addScreenCaptureFromPath(path);
}
```
```java
public static String captureScreenshot(WebDriver driver,
                                       String testName) {

    File src = ((TakesScreenshot) driver)
            .getScreenshotAs(OutputType.FILE);

    String path = System.getProperty("user.dir")
            + "/screenshots/" + testName + ".png";

    FileUtils.copyFile(src, new File(path));

    return path;
}
```

#### Q. Difference between Listeners, Hooks, Retry Analyzer
- `Listeners` are event-driven interfaces used for reporting and execution monitoring.
- `Hooks` like @BeforeMethod and @AfterMethod handle test setup and teardown.
- `Retry Analyzer` is specifically used to rerun failed test cases automatically.
- Together they help build a robust automation framework.

#### Q. Can listeners modify test execution dynamically?
- Yes, listeners can modify execution dynamically using interfaces like `IAnnotationTransformer`.
- We can change retry count, enable/disable tests, or modify annotations at runtime.
- This helps implement flexible framework behavior without changing test code.
- It is useful for retry logic and dynamic execution control.
```java
public class Transformer
        implements IAnnotationTransformer {

    @Override
    public void transform(ITestAnnotation annotation,
                          Class testClass,
                          Constructor testConstructor,
                          Method testMethod) {

        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}
```

#### Q12. Explain Observer Design Pattern in listeners
- TestNG listeners follow the Observer Design Pattern.
- TestNG acts as the publisher and listeners act as subscribers.
- Whenever execution events occur, TestNG automatically triggers listener methods.
- This provides loose coupling and centralized event handling in frameworks.
- Get smarter responses, upload files and images, and more.
```java
public class MyListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        captureScreenshot();
        logFailure(result.getName());
    }
}
```
- Here, TestNG automatically notifies the listener when a failure event occurs.
- The listener reacts to the event without changing the actual test case implementation.

#### Q13. How do you integrate Cucumber with TestNG? 
- We integrate Cucumber with TestNG by using AbstractTestNGCucumberTests instead of JUnit runner.
- Main reason is TestNG gives us extra features like:
  - parallel execution, listeners, testng.xml control, retry mechanism, reporting integration
- In the runner class, we use @CucumberOptions for features, glue, tags, and plugins.
- Then the runner extends `AbstractTestNGCucumberTests`.
- For parallel execution, we override the `scenarios()` method and enable:`@DataProvider(parallel = true)`
- This makes each Cucumber scenario run in parallel as a separate TestNG thread.
- We control the number of threads from testng.xml.

**Steps To Integrate Cucumber with TestNG**
- Step 1 — pom.xml dependencies:
```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-testng</artifactId>
    <version>7.0.0</version>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.0.0</version>
</dependency>
```
- Step 2 — Runner extends AbstractTestNGCucumberTests:
```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.project.stepdefs", "com.project.hooks"},
    tags = "@Regression",
    plugin = {
        "pretty",
        "html:target/cucumber-report.html",
        "json:target/cucumber-report.json",
        "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"
    }
)
public class TestRunner extends AbstractTestNGCucumberTests {

    // Override this method to enable parallel scenario execution
    @Override
    @DataProvider(parallel = true)           // THIS enables parallel in Cucumber+TestNG
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
```
- Step 3 — testng.xml points to Runner:
```xml
<suite name="Cucumber Suite" verbose="1">
    <listeners>
        <listener class-name="com.project.listeners.TestListener"/>
    </listeners>

    <parameter name="browser" value="chrome"/>

    <test name="Regression Suite">
        <classes>
            <class name="com.project.runner.TestRunner"/>
        </classes>
    </test>
</suite>
```

#### Q. How exactly parallel works?
- Internally, each Cucumber scenario becomes a TestNG DataProvider row.
- Since DataProvider is marked as `parallel=true`, TestNG distributes scenarios across multiple threads.

#### Q. Why TestNG instead of JUnit? 
- Because TestNG provides better execution control like parallel execution, listeners, retry analyzer, parameterization, easier control over thread configuration and suite management through testng.xml.
- Even In newer Cucumber versions (Cucumber 6+), many features like parallel execution and reporting are possible even without TestNG.

#### Q14. Test B depends on Test A. Test A fails. What happens to Test B?
```java
@Test
public void testA() {
    Assert.fail("A failed");          // testA fails
}

@Test(dependsOnMethods = "testA")
public void testB() {
    // testB is SKIPPED — not failed
    // TestNG marks it SKIP because dependency failed
}
```
- TestNG marks testB as SKIPPED. It shows in report as skipped with reason "depends on not successfully finished methods.

#### Q15. How do you make testB run even if testA fails?
```java
@Test(dependsOnMethods = "testA", alwaysRun = true)
public void testB() {
    // NOW testB runs even if testA fails
}
```

#### Q16. What is soft assertion and when do you use it?
```java
// Hard assertion — test stops immediately on first failure
Assert.assertEquals(actual, expected);    // if fails → stops here

// Soft assertion — continues even after failure, reports all failures at end
SoftAssert softAssert = new SoftAssert();
softAssert.assertEquals(title, "Expected Title");     // fails but continues
softAssert.assertTrue(button.isDisplayed());          // also checked
softAssert.assertEquals(price, "100");                // also checked
softAssert.assertAll();    // NOW throws all failures together
```
- Validating a form with 10 fields — you want to know ALL fields that have wrong values in one run, not stop at the first failure.

#### Q17. How do you retry failed tests automatically in TestNG?
- In TestNG, we can retry failed tests automatically using IRetryAnalyzer.
- We create a class that implements IRetryAnalyzer and override the retry() method.
- Inside that method, we define how many times the failed test should rerun.
- Then we attach that retry analyzer to the test using: `@Test(retryAnalyzer = RetryAnalyzer.class)`
- So whenever the test fails, TestNG automatically retries it based on the retry count.
- In real projects, we usually use retry mechanism for flaky failures like:
  - temporary API delays, network issues, timing issues, environment instability
- We Usually 1 or 2 retries only. Too many retries can hide actual defects.  
- instead of adding retryAnalyzer in every test, we usually integrate it through listeners or transformer classes so it gets applied centrally across the framework.
```java
// Step 1: Create RetryAnalyzer
public class RetryAnalyzer implements IRetryAnalyzer {
    int retryCount = 0;
    int maxRetry = 2;          // retry max 2 times

    @Override
    public boolean retry(ITestResult result) {
        if(retryCount < maxRetry) {
            retryCount++;
            return true;       // yes, retry
        }
        return false;          // no more retries
    }
}

// Step 2: Use in test
@Test(retryAnalyzer = RetryAnalyzer.class)
public void flakyTest() {
    // if fails → retries 2 more times automatically
}
```




