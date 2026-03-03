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
// Syntax: array.splice(start, removedCount, item1,....itemN)

console.log("fruits array:", fruits);
//Example i): Removing elements using splice()
let removedFruits = fruits.splice(1, 2); //here 1 is starting index and 2 is removed count. It will remove 2 elements from index 1
console.log("After splice():", fruits);
console.log("Removed fruits:", removedFruits);

//Example ii): Adding elements using splice()
console.log("fruits array:", fruits);
fruits.splice(1, 0, "grapes", "watermelon"); //here 1 is starting index and 0 is removed count. It will add 2 elements at index 1
console.log("After splice():", fruits);

//Example iii): Removing and Adding elements using splice()
console.log("fruits array:", fruits);
fruits.splice(2, 2, "custard apple", "watermelon"); //here 2 is starting index and 2 is removed count. It will remove 2 elements from index 2 and add 2 elements at index 2
console.log("After splice():", fruits);

//8. indexOf(): Returns the first index at which a given element can be found in the array, or -1 if it is not present.
// Syntax: array.indexOf(searchElement, fromIndex)
console.log("fruits array:", fruits);
let index = fruits.indexOf("grapes");
console.log("Index of grapes:", index);

//9. includes(): It returns a true if the element is present in the array else returns false.
// Syntax: array.includes(searchElement, fromIndex)
console.log("fruits array:", fruits);
let isPresent = fruits.includes("banana");
console.log("Is banana present in fruits array?", isPresent);

//10. toString(): It converts an array to a string and returns the result.
// Syntax: array.toString()
console.log("fruits array:", fruits);
let fruitsString = fruits.toString();
console.log("Fruits array as string:", fruitsString);

//11. join(): It joins all elements of an array into a string and returns this string.
// Syntax: array.join(separator)
console.log("fruits array:", fruits);
let joinedFruits = fruits.join(", ");
console.log("Joined fruits:", joinedFruits);

//12. reverse(): It reverses the order of the elements in an array in place and returns the reference to the same array.
// Syntax: array.reverse()
console.log("fruits array:", fruits);
fruits.reverse();
console.log("Reversed fruits array:", fruits);

//13. sort(): It sorts the elements of an array in place and returns the reference to the same array.
// Syntax: array.sort(compareFunction)
console.log("fruits array:", fruits);
fruits.sort();
console.log("Sorted fruits array:", fruits);
