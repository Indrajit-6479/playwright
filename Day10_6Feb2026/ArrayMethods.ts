let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "mango", "banana", "orange"];

console.log("Numbers array:", numbers);
console.log("Fruits array:", fruits);

//length: attribute (Not a method)
console.log("Size of numbers array:", numbers.length);
console.log("Size of fruits array:", fruits.length);

//1. push(): Add single or multiple elements at the end of array
// Syntax: array.push(element1, element2, element3,.....elementN)
numbers.push(6, 7);
console.log("After push():", numbers);

//2. pop(): removes the last element from an array
// Syntax: array.pop()
numbers.pop();
console.log("After pop()", numbers);

//3. shift(): removes the first element from an array
// Syntax: array.shift()
let firstNumber = numbers.shift();
console.log("After shift()", numbers);
console.log("Removed Number:", firstNumber);

//4. unshift(): Add single/multiple elements to the beginning of an array
// Syntax: array.unshift(element1,....elementN)
fruits.unshift("kiwi", "pear");
console.log("After unshift:", fruits);

//5. concat(): Combines two or more arrays of same type
// Syntax: array.concat(array1,...arrayN)
let numArray: number[] = [1, 2, 3, 4];
let nameArray: string[] = ["Ram", "Sham", "Vijay"];

console.log(numArray, numbers);
numArray = numArray.concat(numbers);
console.log("Concatenated array:", numArray);

//6. slice(): Extract a section of an array
// starting index start from zero
// Ending index will be exclusive. Ex, if 3 is ending index it will consider 2 (3-1=2)
// Syntax: array.slice(start,end)
console.log("fruits array:", fruits);
let slicedArray = fruits.slice(1, 3);
console.log("fruits array slice:", slicedArray);

//7. splice(): Add/removes elements from an array (from everywhere)
// Syntax: array.splice(start, deleteCount, item1,....itemN)

console.log("fruits array:", fruits);
//Example i):
