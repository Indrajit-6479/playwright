// 1) Scope of Variables
// Example 1: var (Functional Scope)
function varScope() {
    if (true) {
        var msg = "Hello World";
    }
    console.log(msg);
}

varScope();

// Example 2: let and const (Block Scope)
function blockScope() {
    if (true) {
        let msg = "Hello World from let";
        const greet = "Hello const";
        console.log(msg);
        console.log(greet);
    }
    // console.log(msg);  // can not access
    // console.log(greet); // can not access
}

blockScope();

// Example 3
function scopeDiff() {
    if (true) {
        var num1 = 10;
        let num2 = 20;
        const num3 = 30;
        console.log(num1);
        console.log(num2);
        console.log(num3);
    }
    console.log(num1);
    // console.log(num2); // can not access
    // console.log(num3); // can not access
}

scopeDiff()

// 2) Declaration/Value Assignment 
// Example1: var can declare without initialization
var x; // declaration
console.log(x); // undefined
x = 30; // initialization
console.log(x); //30

// Example2: let can declare without initialization
let y; // declaration
console.log(y); // undefined
y = 40; // initialization
console.log(y); //40

//Example3: const must be initialized at the time of declaration
//const z; //compile time error
const z = 50;
console.log(z);

//3) Re-declaration
//Example1: var allows re-declaration
var city = "New York";
var city = "Mumbai";
console.log(city);

//Example2: let not allows re-declaration
let country = "US";
// let country = "India"; //compile time error
console.log(country);

//Example3: const not allows re-declaration
const game = "KhoKho";
// const game = "Cricket"; //compile time error
console.log(game);

//4) Re-initialization or Re-assignment
//Example1: var allows re-initialization
var age = 25;
age = 30;
console.log(age);

//Example2: let allows re-initialization
let color = "blue";
color = "Pink";
console.log(color);

//Example3: const not allows re-initialization
const plant = "Earth";
// plant = "Mars"; // compile time error
console.log(plant);

//5) Hosting
//Example1: var hosting with undefined
// console.log(m);
var m = 100;
console.log(m);

//Example2: let hosting with error as not initialized
//console.log(n);
let n = 200;
console.log(n);

//Example3: const hosting with error as not initialized
//console.log(o);
let o = 300;
console.log(o);
