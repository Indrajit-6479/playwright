/*
1] callback function:
- A callback function is a function that is passed as an argument to another function and gets executed later.

* Why Use Callback Functions?
- It useful when you want a function to execute only another function completes.
- Common in asynchronous operations like API calls, file handling, or event handling.
- In javascript/Typescript asynchronous is the biggest problem so we need to make it as them synchronous.


syntax:
function abc(a:number, b:number, callback:any)
{
    //method block
    callback();
}

// call back function
xyz(){

}

abc(10,20,xyz); //arguments

*/

//Example 1
//callback function
function showMessage(message: string) {
    console.log(message);
}

//Function that takes callback function as an parameter
function greeting(name: string, showMsg: (message: string) => void) {
    console.log(name);
    showMsg("Welcome!");
}

//calling function by passing the callback function
greeting("john", showMessage);

//Example2
function display(value: number) {
    console.log(value);
}

function sum(a: number, b: number, callback: (value: number) => void) {
    let result = a + b;
    callback(result);
}

sum(80, 30, display);

/*
2] Function Overloading in Typescript:
- Function overloading allows you to define multiple versions of a function with same name different number of parameters or return type.

* Why Use Function Overloading?
- It helps create functions that works differently based on input types.
- It improves code readability and reusability.

* Basic Rules for Function Overloading:
1. Define Overloaded Signatures: List all possible ways the function can be called.
2. Single Implementation Signature: There must be one actual function implementation that handles all cases.
3. Ensure Compatibility: The implementation must be compatible with all overloaded signatures.

* Syntax:
step1: writes a signatures of functions
step2: implement function
step3: calling function
*/
//Example1: Different Parameter Types (data types) 
function getInfo(id: number): string;
function getInfo(name: string): string;

function getInfo(param: (number | string)): string {
    if (typeof (param) === "number") {
        return (`User ID is ${param}`);
    } else {
        return (`User Name is ${param}`);
    }
}

console.log(getInfo(10));
console.log(getInfo("Vijay"));

//Example2 : Different Number of Parameters
function add(a: number, b: number): number;
function add(a: number, b: number, c: number): number;

function add(a: number, b: number, c?: number): number {
    if (c !== undefined) {
        return a + b + c;
    }
    return a + b;
}

console.log(add(10, 20));
console.log(add(10, 20, 30));

//Example3 : Different return types
function processInput(str: string): string;
function processInput(num: number): number;

function processInput(input: (string | number)): (string | number) {
    if (typeof (input) === "string") {
        return input.toUpperCase();
    }
    return input * 2;
}

console.log(processInput("State Bank Of India"));
console.log(processInput(5000));

//Example4:
function greet(name: string): string;
function greet(age: number): string;
function greet(isMarried: boolean): string;

function greet(personalInfo: (string | number | boolean)): string {
    if (typeof (personalInfo) === "string") {
        return `My name is : ${personalInfo}`;
    } else if (typeof (personalInfo) === "number") {
        return `My age is : ${personalInfo}`;
    } else {
        return personalInfo ? `Married status : Married` : `Married status : Single`;
    }
}

console.log(greet("Vishal"));
console.log(greet(28));
console.log(greet(false));