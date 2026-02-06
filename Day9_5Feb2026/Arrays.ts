/*
Arrays in Typescript
----------------------
- An array is a special type of variable that stores multiple values.
- In typescript array is behaves like list in java.
- The values can be same datatype or different datatype.
- Arrays are declared using '[]' or the generic 'Array<T>' type.
- Indexing starts from '0'.
- Arrays are an ordered collection of elements.
*/

// Approach 1: using leteral
let names: string[] = [];

names[0] = "John";
names[1] = "smith";
names[2] = "peter";
names[3] = "scott";

console.log(names[0]);

// Approach 2: Declaration and initialization
let money: number[] = [1000, 2000, 3000, 4000];
console.log(money[2]);

// Approach 3: Using the generic Array<T> type
let empIds: Array<number> = [101, 102, 103, 104, 105];
console.log(empIds[3]);

let empIdWithName: Array<string | number> = [101, "John", 102, "Scott", 103, 104, 105];
console.log(empIdWithName[3]);

let mixedData: Array<any> = [1, "John", true, null];
console.log(mixedData[2]);

//Example 1: Iterating over an array using a traditional for loop
for (let i: number = 0; i < names.length; i++) {
    console.log(`Person Names : ${names[i]}`);
}

//Example 2: Iterating using the 'for....in' loop (index)
for (let i in empIds) { // i is store index not the values
    console.log(`Employee Id's : ${empIds[i]}`);
}

//Example 3: Iterating using the 'for....of' loop (values)
for (let empId of empIds) {
    console.log(`Employee Id's : ${empId}`);
}

//Example 4: Passing an Array to the function
// Search an element in an array using function

let isMatched = (element: number, arr: number[]): boolean => {
    for (let i: number = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return true;
        }
    }
    return false;
}

let arr: Array<number> = [70, 30, 40, 78, 32, 444, 98];
console.log(isMatched(440, arr));

//Example 5: A function takes an Array and returns an array
let convertUpperCase = (arrayOfNames: string[]): string[] => {
    let arrayOfUpperCaseNames: Array<string> = [];
    for (let i in arrayOfNames) {
        arrayOfUpperCaseNames[i] = arrayOfNames[i].toUpperCase();
    }
    return arrayOfUpperCaseNames;
}

let arrayOfNames: Array<string> = ["ram", "sham", "Krishna", "Sohan", "Suraj"];
let convertedArray: Array<string> = convertUpperCase(arrayOfNames);
console.log(convertedArray[3]);