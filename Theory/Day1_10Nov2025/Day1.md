#### Introduction:
#### What is Playwrite ?
- Playwrite is an open-source tool by Microsoft for automating web browser testing.
- Playwrite is a framework for automating web browsers, enabling end-to-end (Api, browser, mobile)testing.
- Playwrite is an open-source Node.js (Runtime env for javascript)library.
- While Selenium is a library it requires help of external TestNG framework.
- Beyond browser automation, Playwrite offers a dedicated API for testing and interacting with web API's.
- Released in 2020.

#### Node.js
- Node.js is an open-source, cross-platform javascript runtime environment.
- that execute javascript code outside of a web browser.

#### Features 
1) Cross Browser: Works Chromium (Chrome, Edge), Firefox, WebKit(Safari) 
2) Cross Platform: Runs on Windows, Mac and Linux
3) Cross Language: You can write test in JavaScript, TypeScript, Java, Python or C#.
4) Test Mobile Web Application testing
5) API Testing: Playwrite includes built in API testing, allowing you to test web applications and backend API's together.
6) Automatic Waiting(Auto-wait): Playwrite waits for elements to be ready before performing actions, reducing test flakiness.

#### What is Synchronization problem?
- Balancing your automation script with your application  
- Sometime what will happens while executing your automation code, script execution will be faster than your application response.
- Suppose you are trying to click on certain button but that button is not available in the web page still it is loading this is the synchronization problem
- In selenium you can fix it by adding different wait methods implicit wait/explicit wait
- 28.14