### Selenium Interview Questions Answers :
#### Q1. What is the difference between findElement() and findElements()?
- `findElement()` returns a single `WebElement`. If it is not found in the DOM, it immediately throws `NoSuchElementException`. 
- `findElements()` returns a `List<WebElement>`. If nothing is found, it simply returns an empty list, It will not throw any exception. 
- I use `findElements()` when I want to check if an element exists without risking an exception, like `driver.findElements(locator).size() > 0`.

| Point                | `findElement()`                           | `findElements()`                                          |
| -------------------- | ----------------------------------------- | --------------------------------------------------------- |
| How many elements    | Finds only one element                    | Finds all matching elements                               |
| Return type          | `WebElement`                              | `List<WebElement>`                                        |
| If element not found | Throws `NoSuchElementException`           | Returns an empty list — no exception                      |
| When to use          | When you are sure only one element exists | When you need to count, loop, or verify multiple elements |

#### Q2. How do you handle dynamic web elements / changing IDs or attributes?
- Dynamic elements are elements whose id, class, or attributes change on every page load. 
- I handle them using XPath functions like :
   - `contains()` when the middle part is stable, 
   - `starts-with()` when the beginning is fixed. 
- For trickier cases, I use the visible text of the element or I anchor to a stable parent and navigate to the child. 
- In the payment domain, transaction IDs and order IDs are very dynamic, so I rely heavily on `contains()` and parent-child XPath.
- Step 1: Using XPath functions 
    ```java
    // contains() — when part of the attribute value is fixed
    driver.findElement(By.xpath("//button[contains(@id,'pay-btn')]"));

    // starts-with() — when the beginning is fixed
    driver.findElement(By.xpath("//input[starts-with(@id,'order_')]"));

    // ends-with() — when the ending is fixed (XPath 2.0 / use normalize in Selenium)
    driver.findElement(By.xpath("//input[substring(@id, string-length(@id)-3)='_amt']"));
    ```
- Step 2: Use text or stable parent
    ```java
    // Use visible text when ID changes but text does not
    driver.findElement(By.xpath("//button[text()='Proceed to Pay']"));

    // Use parent → child relationship when the element itself is unstable
    driver.findElement(By.xpath("//div[@class='payment-section']//input[@type='text']"));
    ```

#### Q3. Explain Implicit, Explicit, and Fluent Wait — differences and when to use each?
- Implicit, Explicit and Fluent wait all three waits are used to solve the synchronization problem in Selenium.
- Synchronization problem means the script runs faster than the application, so when Selenium tries to click or find an element before application is fully loaded then it will encounter the exception.

**1. Implicit Wait:**
- Implicit wait is a global wait.
- It applies to all `findElement()` calls in the entire driver session.
- If Selenium cannot find an element immediately, it waits for the given time before throwing an exception.
- Best Use:
  - Small or simple applications
  - When most elements load in similar time 

```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**2. Explicit Wait:**
- Explicit wait is used for a specific element and specific condition.
- Selenium waits until a condition becomes true, like:
  - element is visible
  - element is clickable
  - text is present
- Explicit wait is used when some elements take more time to load. It waits only for that particular element.
- Best use:
   - Login buttons
   - Payment buttons
   - Confirmation messages
   - Popups

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.xpath("your_xpath"))
);
```

**3. Fluent Wait:**
- Fluent wait is an advanced version of Explicit wait.
- It gives extra control:
  - total waiting time
  - polling interval 
  - exceptions to ignore
- Fluent wait is useful for slow or unstable elements. It checks repeatedly after small intervals until the element appears

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(15))
    .pollingEvery(Duration.ofSeconds(3))   // check every 3 seconds
    .ignoring(NoSuchElementException.class);

WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.xpath("your_xpath"))
);
```
**Note:**
- We should not mix Implicit wait and Explicit wait in the same script because both waits try to manage timing together, which can cause unpredictable behavior and increase waiting time.

| Wait Type         | What it does                                                               | Applied where                   | Use when                                                        |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------- |
| **Implicit Wait** | Waits for every element on every line                                      | Globally — whole driver session | Simple scripts, all elements have similar load time             |
| **Explicit Wait** | Waits for a specific condition on a specific element                       | Per element                     | Elements that load at different times — popups, payment buttons |
| **Fluent Wait**   | Like Explicit wait but you can control polling time and ignored exceptions | Per element                     | Slow, animated, or unpredictable elements                       |


| Feature           | Implicit Wait | Explicit Wait    | Fluent Wait      |
| ----------------- | ------------- | ---------------- | ---------------- |
| Scope             | Global        | Specific element | Specific element |
| Condition-based   | No            | Yes              | Yes              |
| Polling control   | No            | Default only     | Custom polling   |
| Ignore exceptions | No            | Limited          | Yes              |

#### Q4. Difference between XPath and CSS Selector?
- Both XPath and CSS Selector are used to locate web elements in Selenium.
**CSS Selector:**
- CSS Selector is faster because browsers are built to understand CSS naturally.
- It is simple, short, and easy to read.
- I use CSS Selector when elements have stable id, class, or attributes because it is faster and cleaner.”
- Best use:
    - Input fields
    - Login forms
    - Stable buttons
    - Static elements

```html
<input id="email" type="text">
```
```java
// Finding email input using stable id
driver.findElement(By.cssSelector("input#email"));
```
```java
// CSS Selector — faster, cleaner for stable attributes
driver.findElement(By.cssSelector("div.payment-form > button.pay-btn"));
```

**XPath:**
- XPath is more powerful and flexible.
- It is useful for dynamic elements because it supports:
   - contains()
   - starts-with()
   - text() 
- XPath can also move backward in DOM to parent or ancestor elements, which CSS Selector cannot do.
- I use XPath when elements are dynamic or when I need to search using visible text.
- Best use:
  - Dynamic order IDs
  - Transaction messages
  - Changing attributes
  - Complex page structures

```java
// XPath — dynamic ID, text-based, parent-child traversal
driver.findElement(By.xpath("//div[@class='payment-form']//button[contains(text(),'Pay')]"));
```

#### Q5. How do you handle multiple windows/tabs in Selenium? and Write the code to Navigate specific window/tab
- In Selenium, every browser window or tab has a unique ID.
- `getWindowHandle()`: This method returns the ID of the current active window.
- I use getWindowHandle() to store the parent window ID before opening a new tab or window.
- `getWindowHandles()`: This method returns all open window IDs as a `Set<String>`.
- I use getWindowHandles() to get all open windows and switch to the new one

    ```java
    // Save parent window
    String parentWindow = driver.getWindowHandle();

    // Click button that opens new tab
    driver.findElement(By.id("payBtn")).click();

    // Get all windows
    Set<String> windows = driver.getWindowHandles();

    // Switch to new window
    for(String window : windows)
    {
        if(!window.equals(parentWindow))
        {
            driver.switchTo().window(window);
            break;
        }
    }

    // Perform actions in new window
    System.out.println(driver.getTitle());

    // Switch back to parent window
    driver.switchTo().window(parentWindow);
    ```
- First, I save the parent window ID using getWindowHandle(). Then I get all window IDs using getWindowHandles(). I loop through them and switch to the window that is different from the parent. After completing work, I switch back to the parent window.
- In payment applications, payment gateways often open in a new tab or window. I handle this by saving the parent window, switching to the payment window, completing the payment action, and then switching back to the main application window.

#### Q6. Explain POM, its advantages, and why Page Factory is used?
- POM stands for Page Object Model.
- In POM, we create one separate class for each page or module of the application.
- That class contains:
   - all locators of that page
   - all actions/methods of that page
- Advantages:
  **1. Reusability**
  - I write reusable methods like login() once and use them in multiple test cases.
  
  **2. Maintainability**
  - If the UI changes, I fix the locator in one place and all tests work again.
  
  **3. Readability**
  - POM makes test scripts clean and readable.
  
  **4. Separation of Concerns**
  - Business logic stays in test classes and page-related code stays in page classes.
  
**Page Factory:**
- Page Factory is a built-in Selenium class used to initialize web elements automatically.
- Instead of writing driver.findElement() again and again, we use:
  - @FindBy
  - PageFactory.initElements()
- Page Factory makes POM cleaner and easier. 
- I declare locators using `@FindBy` and initialize them using `PageFactory.initElements(driver, this)`. 
- Selenium automatically maps the elements.
- Page Factory also supports Encapsulation.
- Locators are private variables, and tests access them only through public methods like login().

```java
public class PaymentPage {

    // Locators declared once — private (Encapsulation)
    @FindBy(id = "card-number")
    private WebElement cardNumberField;

    @FindBy(xpath = "//button[text()='Pay Now']")
    private WebElement payNowButton;

    // Page Factory initializes all @FindBy elements here
    public PaymentPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }

    // Public methods — only way to interact (Encapsulation)
    public void enterCardNumber(String number) {
        cardNumberField.sendKeys(number);
    }

    public void clickPayNow() {
        payNowButton.click();
    }
}
```

#### Q7. How do you handle alerts, popups, and iframes in Selenium?
- These are three different things in Selenium, and we handle each differently.
**Part 1 — Alerts:**
- Browser alerts are JavaScript popups generated by the browser.
- Selenium handles them using: 
```java
driver.switchTo().alert();
```
- **1. Simple Alert:**
- For a simple alert, I switch to the alert and click OK using accept().
  ```java
  driver.switchTo().alert().accept();
  ```

- **2. Confirm Alert:**
- For confirm alerts, I use accept() for OK and dismiss() for Cancel.
  ```java
  // Click OK
  driver.switchTo().alert().accept();

  // Click Cancel
  driver.switchTo().alert().dismiss();
  ```

- **3. Prompt Alert:**
- For prompt alerts, I enter text using `sendKeys()` and then click OK using `accept()`
  ```java
  Alert alert = driver.switchTo().alert();

  alert.sendKeys("Testing");
  alert.accept();
  ```

**Part 2 — Popups:**
- Modern popups are usually HTML elements, not browser alerts. 
- So I handle them like normal web elements using `findElement()` and `click()`.
- Examples:
  - Cookie banners
  - Payment modals
  - Discount offers
  - Login popups
```java
// Closing cookie popup
driver.findElement(By.id("closeBtn")).click();
```

**Part 3 — iFrames:**
- An iFrame is a webpage inside another webpage.
- Selenium cannot directly interact with elements inside an iFrame.
- We must switch into the iFrame first using `switchTo().frame()`, perform the actions, and then return to the main page using `defaultContent()`.
```java
// Switch into iframe
driver.switchTo().frame("paymentFrame");

// Perform Actions
driver.findElement(By.id("cardNumber")).sendKeys("1234567890");

// Switch Back to Main Page
driver.switchTo().defaultContent();
```

#### Q8. How do you capture screenshots for failed test cases and attach to Extent Reports?
- In my framework, screenshots are automatically captured for failed test cases using TestNG listeners.
-  The screenshot is attached directly to the Extent Report, which helps quickly identify UI issues during failures

```java
public class TestListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {

        // Get driver from test class
        WebDriver driver = ((BaseTest) result.getInstance()).driver;

        // Capture screenshot
        TakesScreenshot ts = (TakesScreenshot) driver;
        File src = ts.getScreenshotAs(OutputType.FILE);

        // Create unique path
        String path = "./screenshots/" 
                + result.getName() + "_" 
                + System.currentTimeMillis() + ".png";

        try {
            FileUtils.copyFile(src, new File(path));
        } 
        catch (IOException e) {
            e.printStackTrace();
        }

        // Attach screenshot to Extent Report
        ExtentReportManager.getTest()
            .fail("Test Failed — Screenshot below:")
            .addScreenCaptureFromPath(path);
    }
}
```  
- Register Listener in testng.xml
```xml
<listeners>
    <listener class-name="com.yourpackage.TestListener"/>
</listeners>
```

#### Q9. Explain the use of DesiredCapabilities in Selenium
- DesiredCapabilities is used to configure browser settings before lunching the browser.
- for e.g. Browser name, Browser version, SSL certificates, Headless mode, Notifications
- Earlier in Selenium 3, DesiredCapabilities was used directly.
```java
// Selenium 3 style
DesiredCapabilities cap = new DesiredCapabilities();

cap.setBrowserName("chrome");
cap.setCapability("acceptInsecureCerts", true);
```
- In Selenium 4, we mostly use ChromeOptions OR FirefoxOptions OR EdgeOptions instead of DesiredCapabilities because it is cleaner and easier to manage browser settings.
```java
ChromeOptions options = new ChromeOptions();

options.addArguments("--headless");
options.addArguments("--disable-notifications");
options.addArguments("--incognito");

// Accept SSL certificates
options.setAcceptInsecureCerts(true);

WebDriver driver = new ChromeDriver(options);
```
- DesiredCapabilities is still important in: Selenium Grid, Remote execution

#### Q10. Explain Selenium Grid — how to set up Hub and Node. Why use it?
- Selenium Grid helps reduce execution time by running tests simultaneously on different machines and browsers.
- Without Grid:
  - 500 test cases run one by one
  - Takes 2 hours
- With Grid:
  - Tests run in parallel on multiple machines
  - Can finish in 20–30 minutes
**Hub:**
- Hub is the main server
- It receives test requests
- Manages connected nodes
- Sends tests to available nodes
**Node:**
- Node is the worker machine where the actual browser execution happens.

- In Selenium 3 we need to start first Hub then Node and instead of `new ChromeDriver()` need to use `new RemoteWebDriver();` with remote url.
- In Selenium 4, Grid setup became easier. We can start standalone mode with a single command. `java -jar selenium-server.jar standalone`
- We use Selenium Grid with TestNG parallel execution to run regression tests on Chrome, Firefox, and Edge simultaneously. This helps reduce execution time and supports cross-browser testing.
- How It Works
  - 1. TestNG creates parallel threads
  - 2. Each thread requests a browser session
  - 3. Selenium Grid Hub receives request
  - 4. Hub sends test to available Node
  - 5. Node opens browser and runs test

