//1. forEach() - Executes a provided function once for each array element.
// It takes function as a parameter.
//Syntax: array.forEach(function(currentValue, index, arr){})

// currentValue: The current element being processed in the array.
// index(optional): The index of the current element being processed in the array.
// arr(optional): The array that forEach() is being applied to.

//Example1: Get index and value of each element in the array
let fruitsArray: string[] = ["apple", "banana", "orange", "mango", "grapes", "watermelon"];

console.log("Printing fruits along with their index using for loop:");
for (let i: number = 0; i < fruitsArray.length; i++) {
    console.log(`Index: ${i}, Fruit: ${fruitsArray[i]}`);
}

console.log("Printing fruits along with their index using for-in loop:");
for (let i in fruitsArray) {
    console.log(`Index: ${i}, Fruit: ${fruitsArray[i]}`);
}

console.log("Printing fruits along with their index using forEach loop:");
fruitsArray.forEach(function (fruit, index) {
    console.log(`Index: ${index}, Fruit: ${fruit}`);
})

console.log("Printing fruits along with their index using forEach loop with arrow function:");
fruitsArray.forEach((fruit, index) => {
    console.log(`Index: ${index}, Fruit: ${fruit}`);
})

//Example2: Print the fruits in uppercase using forEach loop
console.log("Printing fruits in uppercase using forEach loop:");
fruitsArray.forEach((fruit) => {
    console.log(`Fruit: ${fruit.toUpperCase()}`);
})

//2. map() - It creates a new array with the result of calling the function for every array element.
// It takes function as a parameter.
// It returns a new array of the same length as the original array.
//Syntax: array.map(function(currentValue, index, arr){})

//Example1: Get square of each element in the array
let numbersArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Original numbers array:", numbersArray);

console.log("Square of each element in the numbers array using map():");
let squaredNumbers = numbersArray.map(function (num) {
    return num * num;
});
console.log("Squared numbers array:", squaredNumbers);

console.log("Square of each element in the numbers array using map() with arrow function:");
squaredNumbers = numbersArray.map((num) => num * num);
console.log("Squared numbers array:", squaredNumbers);

//3. filter() - It creates a new array with all elements that pass the test implemented by the provided function.
// It takes function as a parameter.
// It returns a new array with the elements that pass the test.

//Syntax: array.filter(function(currentValue, index, arr){})

//Example1: Get even numbers from the array
console.log("Original numbers array:", numbersArray);

console.log("Even numbers from the numbers array using filter():");
let evenNumbers = numbersArray.filter(function (num) {
    return num % 2 === 0;
})

console.log("Even numbers array:", evenNumbers);

console.log("Even numbers from the numbers array using filter() with arrow function:");
evenNumbers = numbersArray.filter((num) => num % 2 === 0);
console.log("Even numbers array:", evenNumbers);

//Example2: Get fruits with length greater than 5
console.log("Original fruits array:", fruitsArray);
let longFruits = fruitsArray.filter((fruit) => fruit.length > 5);
console.log("Fruits with length greater than 5:", longFruits);

//4. reduce() - It executes a reducer function on each element of the array, resulting in a single output value.
// It takes function as a parameter.
// It returns a single value that is the result of the reduction.

//Syntax: array.reduce(function(accumulator, currentValue, index, arr){}, initialValue)

// accumulator: It accumulates value from the previous iterations.
// currentValue: The current element being processed in the array.
// index(optional): The index of the current element being processed in the array.
// arr(optional): The array that reduce() is being applied to.
// initialValue(optional): A value to use as the first argument to the first call of the callback function. If no initialValue is supplied, the first element in the array will be used as the initial accumulator value and skipped as currentValue.

//Example1: Get the sum of all elements in the array
console.log("Original numbers array:", numbersArray);

console.log("Sum of all elements in the numbers array using for loop:");
let sum: number = 0;
for (let i: number = 0; i < numbersArray.length; i++) {
    sum += numbersArray[i];
}
console.log("Sum of numbers array using for loop:", sum);

console.log("Sum of all elements in the numbers array using for-in loop:");
let sumForIn: number = 0;
for (let i in numbersArray) {
    sumForIn += numbersArray[i];
}
console.log("Sum of numbers array using for-in loop:", sumForIn);

console.log("Sum of all elements in the numbers array using for-of loop:");
let sumForOf: number = 0;
for (let num of numbersArray) {
    sumForOf += num;
}
console.log("Sum of numbers array using for-of loop:", sumForOf);

console.log("Sum of all elements in the numbers array using array function:");
let sumArrayFun = 0;
numbersArray.forEach((num) => {
    sumArrayFun += num;
})
console.log("Sum of numbers array using array function:", sumArrayFun);

console.log("Sum of all elements in the numbers array using reduce():");
let sumReduce = numbersArray.reduce(function (total, currentValue) {
    return total + currentValue;
}, 0);
// Here 0 is initial value for total. It will start with 0 and add each element of the array to it and return the final sum.
console.log("Sum of numbers array using reduce():", sumReduce);

console.log("Sum of all elements in the numbers array using reduce() with arrow function:");
sumReduce = numbersArray.reduce((total, currentValue) => total + currentValue, 0);
// Here 0 is initial value for total. It will start with 0 and add each element of the array to it and return the final sum.
console.log("Sum of numbers array using reduce() with arrow function:", sumReduce);

//Example2: Get the product of all elements in the array
console.log("Original numbers array:", numbersArray);

console.log("Product of all elements in the numbers array using for loop:");
let product: number = 1;
for (let i: number = 0; i < numbersArray.length; i++) {
    product *= numbersArray[i];
}
console.log("Product of numbers array using for loop:", product);

console.log("Product of all elements in the numbers array using reduce():");
let productReduce = numbersArray.reduce((product, currentValue) => product * currentValue, 1);
// Here 1 is initial value for product. It will start with 1 and multiply each element of the array to it and return the final product.
console.log("Product of numbers array using reduce():", productReduce);

//Example3: Get the longest fruit name from the array
console.log("Original fruits array:", fruitsArray);

console.log("Longest fruit name from the fruits array using for-of loop:");
let longestFruitForIn = "";
for (let fruit of fruitsArray) {
    if (fruit.length > longestFruitForIn.length) {
        longestFruitForIn = fruit;
    }
}
console.log("Longest fruit name from the fruits array using for-of loop:", longestFruitForIn);

console.log("Longest fruit name from the fruits array using reduce():");
let longestFruit = fruitsArray.reduce((longest, currentFruit) => {
    return currentFruit.length > longest.length ? currentFruit : longest;
}, "");
// Here "" is initial value for longest. It will start with "" and compare the length of each fruit name with the longest and return the longest fruit name.
console.log("Longest fruit name from the fruits array using reduce():", longestFruit);

//5. some() - It tests whether at least one element in the array passes the test implemented by the provided function. If atleast one element passes the test, it returns true. Otherwise, it returns false.
// It takes function as a parameter.
// It returns a boolean value.

//Syntax: array.some(function(currentValue, index, arr){})

//Example1: Check if there is any even number in the array
console.log("Original numbers array:", numbersArray);
let hasEvenNumber = numbersArray.some((num) => num % 2 === 0 && num >= 4);
console.log("Is there any even number in the numbers array and greater than or equal to 4?", hasEvenNumber);

//6. every() - It tests whether all elements in the array pass the test implemented by the provided function. If all elements pass the test, it returns true. Otherwise, it returns false.
// It takes function as a parameter.
// It returns a boolean value.

//Syntax: array.every(function(currentValue, index, arr){})

//Example1: Check if all numbers in the array are greater than 0
console.log("Original numbers array:", numbersArray);
let allGraterThanZero = numbersArray.every((num) => num > 0);
console.log("Are all numbers in the numbers array greater than 0?", allGraterThanZero);

