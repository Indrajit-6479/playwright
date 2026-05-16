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



