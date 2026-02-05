export { }

// 1. number Type
// Represents both integers and floating point numbers
let age: number = 25;
let price: number = 25.5;
let bigNum: bigint = 100n;
console.log(age);
console.log(price);
console.log(bigNum);


//2. string Type
// Represents Textual Data
let firstName: string = "Indrajit";
let middleName: string = 'Rajesh';
let lastName: string = "Rananavare";
let fullName: string = `Full Name: ${firstName} ${middleName} ${lastName}`
console.log(fullName);
console.log("Full Name:", firstName, middleName, lastName);

//3. boolean Type
//Represents true/false
let isStudent: boolean = true;
let hasJob: boolean = false;

console.log("Is Student?", isStudent);
console.log("Has Job?", hasJob);

//4. null & undefined Type
// Special types for absence of value
// If value is not present it will return it
// We are not use it for defining purpose
let num: number;
// console.log(num); //undefined

//5. any Type
// When you are using this datatype you should use carefully because it will violate the basic concept of type safety.
// When you declare datatype as 'any' it will accepts all types of data.
// It will losses of typescript benefits, so it is not recommendable.
let value1: any = "Welcome";
console.log(typeof (value1));
console.log(value1);

value1 = 40;
console.log(typeof (value1));
console.log(value1);

value1 = true;
console.log(typeof (value1));
console.log(value1);


//6. union Type
// It is not a keyword it is nothing but the combination of multiple datatypes using pip symbol
// So we can store any mention datatype value
// It will not break the typescript features 
let value2: string | number | boolean | null;
value2 = "Hello";
console.log(typeof (value2));
console.log(value2);

value2 = 800;
console.log(typeof (value2));
console.log(value2);

value2 = false;
console.log(typeof (value2));
console.log(value2);

//7. void Type
// It is basically used for functions not for variables
// void means does not return anything 
// It is optional to declare as void. 

function sum(): void {
    console.log("Sum is:", 10 + 20);
}

sum();

function sub(a: number, b: number) {
    console.log("Sub is:", a - b);
}

sub(20, 10);