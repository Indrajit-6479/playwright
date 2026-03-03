export { }

let a: number = 10, b: number = 20;

// 1. Arithmetical Operators
console.log(a + b);
console.log(b - a);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(5 ** 2);

// 2. Assignment Operators 
a = 10;
b = 5;

a = a + b;
console.log(a)

console.log(a += b); // a = a + b
console.log(a -= b); // a = a - b
console.log(a *= b); // a = a * b
console.log(a /= b); // a = a / b
console.log(a %= b); // a = a % b


//3. Relational or Comparison Operators
// Always returns boolean value
a = 10;
b = 20;

console.log(a > b);
console.log(a < b);
console.log(a <= b);
console.log(a >= b);
console.log(a == b);
console.log(a != b);

// Difference between == (equality) Vs === (strict equality)
let num1: any = 10;
let num2: any = "10";

console.log(num1 == num2); // true (only compare values)
console.log(num1 === num2); // false (compares the values along with datatype)

//4. Logical Operators (&& || !)
// It will used only with boolean values
// It will return only true or false

//    b1       b2       &&       ||        b1!
//---------------------------------------------
//   true    true      true    true      false
//   true    false     false   true      false 
//   false   true      false   true       true
//   false   false     false   false      true

let b1: boolean = true;
let b2: boolean = false;
console.log(b1 && b2);   //false
console.log(b1 || b2);   //true

// Combination of Logical and Relational Operators
console.log(20 > 10 && 10 > 5);  //true
console.log(10 < 20 || 5 > 10);  //true

//5. Increment and Decrement Operators
// a. pre-increment and post-increment
// b. pre-decrement and post-decrement 

let x1: number = 10;
console.log(x1++); //10
console.log(++x1); //12

let x2: number = 20;
console.log(x2++) //20
console.log(x2); //21

// The difference between pre-increment and post-increment is in pre-increment first it will increase the value by 1 and then it will store in the variable, while post-increment first value will store in the variable then it will increase by 1.

let y1: number = 10;
console.log(y1--); //10
console.log(--y1); //8

let y2: number = 20;
console.log(y2--) //20
console.log(y2); //19

//6. Ternary or Conditional Operator
// exp ? res1 : res2
// if the exp is true then execute res1
// else (false) it will execute res2

let c: number = 100, d: number = 200;
let res: number = c > d ? c : d;
console.log(res); //200

let personAge: number = 30;
let result: string = (personAge >= 18) ? "Adult" : "Minor";
console.log(result); //Adult