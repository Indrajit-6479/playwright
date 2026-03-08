| HTML Element | ARIA Role | Playwright Code Snippet |
|--------------|-----------|------------------------|
| `<a href="/home">Home</a>` | link | ```await page.getByRole('link', { name: 'Home' }).click();``` |
| `<area href="/map1" alt="Map Link">` | link | ```await page.getByRole('link', { name: 'Map Link' }).click();``` |
| `<button>Submit</button>` | button | ```await page.getByRole('button', { name: 'Submit' }).click();``` |
| `<form name="loginForm">...</form>` | form | ```await page.getByRole('form', { name: 'loginForm' });``` |
| `<h2>Section Title</h2>` | heading | ```await page.getByRole('heading', { name: 'Section Title', level: 2 });``` |
| `<header>Site Header</header>` | banner | ```await page.getByRole('banner');``` |
| `<img src="logo.png" alt="Company Logo">` | img | ```await page.getByRole('img', { name: 'Company Logo' });``` |
| `<input type="button" value="Click Me">` | button | ```await page.getByRole('button', { name: 'Click Me' }).click();``` |
| `<input type="checkbox" /> Subscribe` | checkbox | ```await page.getByRole('checkbox', { name: 'Subscribe' }).check();``` |
| `<input type="email" placeholder="Email">` | textbox | ```await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');``` |
| `<input type="password" placeholder="Password">` | textbox | ```await page.getByRole('textbox', { name: 'Password' }).fill('mypassword');``` |
| `<input type="radio" name="gender" value="male"> Male` | radio | ```await page.getByRole('radio', { name: 'Male' }).check();``` |
| `<input type="range" min="0" max="100">` | slider | ```await page.getByRole('slider').setInputValue('50');``` |
| `<input type="reset" value="Reset">` | button | ```await page.getByRole('button', { name: 'Reset' }).click();``` |
| `<input type="search" placeholder="Search...">` | searchbox | ```await page.getByRole('searchbox', { name: 'Search' }).fill('Query');``` |
| `<input type="submit" value="Submit">` | button | ```await page.getByRole('button', { name: 'Submit' }).click();``` |
| `<input type="text" placeholder="Username">` | textbox | ```await page.getByRole('textbox', { name: 'Username' }).fill('user123');``` |
| `<ul><li>Item 1</li></ul>` | listitem | ```await page.getByRole('listitem', { name: 'Item 1' });``` |
| `<ul><li>Item 1</li></ul>` | list | ```await page.getByRole('list');``` |
| `<select><option>Option 1</option></select>` | option | ```await page.getByRole('option', { name: 'Option 1' }).selectOption();``` |
| `<select><option>Choice</option></select>` | listbox | ```await page.getByRole('listbox').selectOption('Choice');``` |
| `<table><tr><td>Data</td></tr></table>` | table | ```await page.getByRole('table');``` |
| `<table><tbody><tr><td>Data</td></tr></tbody></table>` | rowgroup | ```await page.getByRole('rowgroup');``` |
| `<td>Cell Data</td>` | cell | ```await page.getByRole('cell', { name: 'Cell Data' });``` |
| `<th>Header</th>` | columnheader | ```await page.getByRole('columnheader', { name: 'Header' });``` |
| `<textarea placeholder="Message"></textarea>` | textbox | ```await page.getByRole('textbox', { name: 'Message' }).fill('Hello');``` |
| `<tr><td>Cell</td></tr>` | row | ```await page.getByRole('row');``` |