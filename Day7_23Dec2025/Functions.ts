/* Functions:
- It is the block of code which perform certain task and we can reuse it.
1) Named Function
2) Anonymous Function OR Nameless Function
3) Arrow Function OR Lambda Function
 */

/*
1) Named Function:
- A function that is declared with a name.

*Syntax:
function functionName(parameter): returnType {
  //block of code
}

functionName(); // calling the function/invoking the function
*/

// Example1: Named Function with no parameters and no return type
function display(): void {
    console.log("Welcome to typescript");
}
display();

// Example2: Named functions with parameters and return type
function addNumbers(x: number, y: number): number {
    return x + y;
}

console.log(addNumbers(3, 4));
let result: number = addNumbers(2, 3);
console.log(result);

// Example3: Named function with Rest Parameters
// Rest parameters don't restrict the number of values that you can pass to a function

function addAnyNumbers(...nums: number[]): number {
    let sum: number = 0;
    for (let i: number = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    return sum;
}

console.log(`Sum of numbers: ${addAnyNumbers(5, 10, 15, 20)}`);

//Example4: Named function with Rest Parameters - multiple types
function getNameWithMarks(...nameWithMarks: (number | string)[]): string {
    let str: string = " ";
    for (let i: number = 0; i < nameWithMarks.length - 1; i += 2) {
        str = str + ` Name is ${nameWithMarks[i]} and Marks is ${nameWithMarks[i + 1]}`
    }
    return str;
}

const nameAndMarks: string = getNameWithMarks("Vishal", 76, "Surendra", 71, "Vikas", 69);
console.log(nameAndMarks);

//Example5: Named function with optional Parameters
//In TypeScript, we can define any number of optional parameters, but once an optional parameter is declared, all subsequent parameters must also be optional.
function displayDetails(id: number, name: string, mailId?: string) {
    console.log("ID", id);
    console.log("Name", name);
    if (mailId !== undefined)
        console.log("Email Id", mailId);
}
displayDetails(123, "Ram", "ram@gmail.com");
displayDetails(345, "Sham");

//Example6: Named function with Default Parameters
function calculateDiscount(price: number, rate: number = 0.50) {
    let discount: number = price * rate;
    console.log("Discount Amount: ", discount)
}
calculateDiscount(1000, 0.30);
calculateDiscount(1000);

/*
2) Anonymous Function OR Nameless Function OR Unnamed Function:
- A function that is declared without a name.

*Syntax:
let variable = function (parameter): returnType{
  //function body
}

variable(); //calling the function
*/

//Example1 : Anonymous Function
let msg = function (): string {
    return "Hello Typescript";
}
console.log(msg);
console.log(msg());

//Example2 : Anonymous Function with Parameters
let multiply = function (value1: number, value2: number): number {
    return value1 * value2;
}
console.log(multiply(2, 3));

//3) Anonymous function with Rest Parameters, 4) Anonymous function with Rest Parameters - multiple types, 5) Anonymous function with optional Parameters, 6) Anonymous function with Default Parameters is same as Named function just difference is we assign the variable for Anonymous function. 

/*
3) Arrow Function OR Lambda Function:
- It's widely using in typescript programming and it's comes under the Anonymous Function main difference is rather than 'function' keyword we are using '=>'.

*Syntax:
let variable = (parameter): returnType =>{
  //block of code
}
*/

//Example 1: Arrow function with No Parameters and No return type
let myGreeting = (): void => {
    console.log("Hello Welcome!");
}
myGreeting();

//Example 2: Arrow function with Parameters and return type
let addition = (value1: number, value2: number): number => {
    return value1 + value2;
}
console.log(addition(10, 20));

//Example3: Arrow function with Implicit Return
let NumSum = (a: number, b: number): number => a + b;
console.log(NumSum(10, 20));

//Example4: Arrow function with optional parameters
let detailInfo = (id: number, name: string, mailId?: string): void => {
    console.log("Id: ", id);
    console.log("Name:", name);
    if (mailId !== undefined)
        console.log("MailId:", mailId);
}
detailInfo(123, "Vivek", "vivek@123");
detailInfo(123, "Krish");

//Example5: Arrow function with default parameters
let givenDiscount = (price: number, rate: number = 0.50): number => price * rate;
console.log(givenDiscount(2000, 0.4));
console.log(givenDiscount(2000));

//Example6: Arrow function with rest parameters
let findElementsLength = (...elements: (number | string)[]): number => elements.length;
console.log(findElementsLength(2, "Ram", 300, 19, 23, "Sham"));