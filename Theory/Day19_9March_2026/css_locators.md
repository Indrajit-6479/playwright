## CSS (Cascading Style Sheets) Locators
- every web page is made up of HTML + CSS + JavaScript.
- HTML defines the structure of page, CSS provides styling and JavaScript provides interactivity.
- CSS locators are based on the CSS selectors which are used to select and style HTML elements on a web page.
- CSS selectors are powerful and flexible, allowing you to target elements based on their attributes, classes, IDs, and even their position in the DOM tree.
- There are 2 types of CSS locators:

1. **Absolute CSS Locators**: 
   - These locators specify the exact path to an element in the DOM tree.
   - They are not recommended because they are brittle and can break easily if there are any changes to the page structure.
2. **Relative CSS Locators**: 
   - These locators are more flexible and robust. 
   - They allow you to target elements based on their attributes, classes, IDs, and other properties without relying on the exact structure of the DOM tree.

- Playwright provides a built-in method to use CSS selectors: `page.locator("css_selector")`.
- It is recommended to use CSS locators over XPath because they are generally faster and more efficient. 
- CSS selectors are optimized by browsers and can be executed more quickly than XPath expressions. Additionally.

1) tag with id ---> tag#id_value ---> #id_value
2) tag with class ---> tag.class_value ---> .class_value
3) tag with attribute ---> tag[attribute_name="value"] ---> [attribute_name="value"]
4) tag with class and attribute ---> tag.class_value[attribute_name="value"] ---> .class_value[attribute_name="value"]

```typescript
// Examples of CSS locators in TypeScript with Playwright

// 1) tag with id
const elementById = page.locator("button#submitBtn"); // or page.locator("#submitBtn");

// 2) tag with class
const elementByClass = page.locator("input.email-field"); // or page.locator(".email-field");

// 3) tag with attribute
const elementByAttribute = page.locator("input[type='email']"); // or page.locator("[data-testid='login']");

// 4) tag with class and attribute
const elementByClassAndAttribute = page.locator("button.btn-primary[type='submit']"); // or page.locator(".btn-primary[type='submit']");
```
#### Absolute Xpath vs Relative XPath
- Absolute XPath starts from the root of the document and follows a specific path to the target element
- Relative XPath starts from the current node and can use various axes to navigate to the target element, making it more flexible and less brittle than absolute XPath.
- In relative xpath `^` is used to starts with and `$` is used to ends with and `*` is used to contains.
- example of absolute xpath: `/html/body/div[1]/div[2]/button`
- example of relative xpath: `//button[@id='submitBtn']` or `//button[starts-with(@id, 'submit')]` or `//button[contains(@id, 'submit')]` or `//button[ends-with(@id, 'Btn')]`

| What you want          | Selector                      |
| ---------------------- | ----------------------------- |
| `<p>` inside body      | `body p`                      |
| `<p>` anywhere         | `html p`                      |
| `<p id="para2">`       | `p#para2` or `p[id='para2']`  |
| `<p class="main">`     | `p.main` or `p[class='main']` |
| Any element with id    | `#para1` or `[id='para1']`    |
| Any element with class | `.sub` or `[class='sub']`     |


| Task        | Selector                      |
| ----------- | ----------------------------- |
| First child | `body > div > *:first-child`  |
| Last child  | `body > div > *:last-child`   |
| 3rd child   | `body > div > *:nth-child(3)` |


| Task        | Selector         |
| ----------- | ---------------- |
| Starts with | `p[class^='ma']` |
| Ends with   | `p[class$='ub']` |
| Contains    | `p[class*='ai']` |


| Task                   | Selector                                  |
| ---------------------- | ----------------------------------------- |
| `<p>` with id & class  | `p[id='para1'][class='main']`             |
| Not having id          | `p:not([id='para1'])`                     |
| Class `sub` but not id | `p:not([id='para1'])[class='sub']`        |
| Not id AND not class   | `p:not([id='para1']):not([class='main'])` |


| Task                       | Selector            |
| -------------------------- | ------------------- |
| `<p>` after specific `<p>` | `p[id='para1'] + p` |
| Any element after `<head>` | `head + *`          |


| Type                       | Format                             |
| -------------------------- | ---------------------------------- |
| Tag with ID                | `tag#id`                           |
| Tag with Class             | `tag.classname`                    |
| Tag with Attribute         | `tag[attribute="value"]`           |
| Tag with Class + Attribute | `tag.classname[attribute="value"]` |


