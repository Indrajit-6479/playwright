## Understanding Playwright Locators:

- It is not recommended to use xpath rather that it is recommended to use 1) playwright built-in locators 2) CSS Locators and then xpths

### Locators:

- It is able to identify the web element on the page.
- main feature compare to selenium is auto waiting and retry-ability

## What is DOM?

### Definition

- **DOM** stands for **Document Object Model**.
- It is an **API interface provided by the browser**.
- When you load any web page, the browser **automatically creates
  the DOM structure at runtime**.
- The DOM represents the entire web page as a **tree structure**,
  where every HTML element is a **node** in that tree.
- Using DOM, JavaScript and automation tools like Playwright
  can **read, access, and manipulate** the elements on the page.
- All **locators** we use in Playwright identify and interact
  with elements through this DOM structure.

## DOM Tree Example

```html
<html>
  └── <body>
        ├── <h1> Welcome </h1>
        ├── <input id="username" />
        └── <button class="login-btn"> Login </button>
```

Every element in this tree can be located and interacted
with using locators.

---

## Locators — Frequently Used & When to Use

### 1. `page.getByAltText("Alt_text")`

- It identifies image and similar elements based on Alt attribute.
- **When to use:** Use this locator when your element supports alt text such as img and area elements.

```ts
await expect(page.getByAltText("Alt_text").toBeVisible())
```

---

### 2. `page.getByText("text")`

- It identifies text element.
- You can match by substring or exact string
- **When to use:** Use this locator when your elements are non interactive like div, span, p etc.

```ts
await expect(page.getByAltText("Alt_text").toBeVisible())
```

---

### 3. `getByRole`

- Locates element by its **ARIA role** (button, textbox, heading etc.)
- **When to use:** This is the **most recommended** locator in Playwright.
  Use it when the element has a clear role like button, link, checkbox.

```ts
await page.getByRole('button', { name: 'Login' }).click();
```

---

### 2. `getByText`

- Locates element by its **visible text content**.
- **When to use:** When you want to find an element
  by the exact text displayed on screen.

```html
<h3>Sign Up</h3>
<label>
  <input type="checkbox"/> Subscribe
</label>
</br>
<button>Submit</button>
```

```ts
import {expect} from "@playwright/test";

await expect(page.getByRole('heading'),{name: 'Sign Up'}).toBeVisible();
await page.getByRole('checkbox',{name: 'Subscribe'}).check();
await page.getByRole('button', {name: '/submit/i'}).click();
```

---

### 3. `getByPlaceholder`

- Locates input field by its **placeholder text**.
- **When to use:** When input fields have placeholder text
  and no label or ID is available.

```ts
await page.getByPlaceholder('Enter your email').fill('test@gmail.com');
```

---

### 4. `getByLabel`

- Locates input by its **associated label**.
- **When to use:** When form fields have a proper `<label>` tag.
  This is accessible and reliable.

```ts
await page.getByLabel('Username').fill('admin');
```

---

### 5. `getByTestId`

- Locates element by **data-testid** attribute.
- **When to use:** When developers have added `data-testid`
  attributes specifically for testing. Most stable locator
  because it won't change with UI redesign.

```ts
await page.getByTestId('submit-btn').click();
```

---

### 6. `locator` with CSS Selector

- Locates element using **CSS selector**.
- **When to use:** When above locators are not available
  and element has a unique class or ID.

```ts
await page.locator('#username').fill('admin');
await page.locator('.login-btn').click();
```

---

### 7. `locator` with XPath

- Locates element using **XPath expression**.
- **When to use:** Use as a **last option** when no other
  locator works. XPath is powerful but fragile —
  small UI changes can break it.

```ts
await page.locator('//button[@id="login"]').click();
```

---

## Locator Priority — Which to Use First

```
getByRole        ✅ Use First   — most recommended, accessible
getByLabel       ✅ Use Second  — great for form fields
getByPlaceholder ✅ Use Third   — for inputs with placeholder
getByText        ✅ Use         — for visible text elements
getByTestId      ✅ Very Stable — if dev team adds test IDs
CSS Selector     ⚠️ Use when above not available
XPath            ❌ Last Resort — avoid if possible
```

---

## One Line Summary for Interview

> DOM is a tree-structured API interface created by the browser
> at runtime when a page loads — it represents every HTML element
> as a node, and all Playwright locators identify and interact
> with elements through this DOM structure.
