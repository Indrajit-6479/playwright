// Method overloading and Constructor overloading in class:
// As like functional overloading, in typescript we can also overload methods and constructors.

// Constructor overloading:
// In TypeScript, we can achieve constructor overloading by using optional parameters or by defining multiple constructor signatures. 
// However, TypeScript does not support multiple constructor implementations like some other languages. 
// Instead, we can use a single constructor with optional parameters to handle different initialization scenarios.

// Example of constructor overloading:
class Calculator {
    // constructor(); 
    // constructor(a: number, b: number);

    constructor(a?: number, b?: number) {
        if (a !== undefined && b !== undefined) {
            console.log(`Sum: ${a + b}`);
        } else {
            console.log("Default constructor called");
        }
    }
}

// Creating instances of Calculator class
const calc1 = new Calculator(); // Output: Default constructor called
const calc2 = new Calculator(5, 10); // Output: Sum: 15

// Example of method overloading:
class SumCalculator {
    // method overloading signatures
    // sum(a: number, b: number): number;
    // sum(a: number, b: number, c: number): number;

    // method implementation
    sum(a: number, b: number, c?: number): number {
        if (c !== undefined) {
            return a + b + c;
        }
        return a + b;
    }
}

let sumCalc = new SumCalculator();
console.log(sumCalc.sum(5, 10)); // Output: 15
console.log(sumCalc.sum(5, 10, 15)); // Output: 30  