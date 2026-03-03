// string - A string is a sequence of characters. It is used to represent text. In TypeScript, strings are enclosed in single quotes (' '), double quotes (" "), or backticks (` `).
// Index in string starts from 0.
// String is immutable, which means once a string is created, it cannot be changed. Any operation that modifies a string will create a new string.

// Example of string declaration
let myName: string = "Indrajit Rananavare";
let city: string = 'Pune';
let message: string = `Hello, my name is ${myName} and I live in ${city} and ${city} is my hometown.`;
console.log(message);

// String Methods
// 1. length: Returns the length of the string
// Syntax: string.length
// It is not a method, it is an attribute of the string object. 
// It will return the number of characters in the string including spaces and special characters.
console.log("Length of myName:", myName.length);

// 2. toUpperCase(): Converts the string to uppercase
// Syntax: string.toUpperCase()
console.log("myName in uppercase:", myName.toUpperCase());

// 3. toLowerCase(): Converts the string to lowercase
// Syntax: string.toLowerCase()
console.log("myName in lowercase:", myName.toLowerCase());

// 4. charAt(index): Returns the character at the specified index
// Syntax: string.charAt(index)
console.log("Character at index 0 in myName:", myName.charAt(0));
console.log("Character at index 5 in myName:", myName.charAt(5));

// 5. indexOf(substring): Returns the index of the first occurrence of the specified substring
// Syntax: string.indexOf(substring)
console.log("Index of 'Rananavare' in myName:", myName.indexOf("Rananavare"));
console.log("Index of 'Pune' in city:", city.indexOf("Pune"));

// 6. includes(substring): Returns true if the string contains the specified substring, otherwise false
// Syntax: string.includes(substring)
console.log("Does myName include 'Indrajit'?", myName.includes("Indrajit"));
console.log("Does city include 'Mumbai'?", city.includes("Mumbai"));

// 7. substring(start, end): Returns the substring from the start index to the end index (exclusive)
// Syntax: string.substring(start, end)
console.log("Substring of myName from index 0 to 7:", myName.substring(0, 8));
console.log("Substring of city from index 0 to 3:", city.substring(0, 3));

// 8. startsWith(substring): Returns true if the string starts with the specified substring, otherwise false
// Syntax: string.startsWith(substring)
console.log("Does myName start with 'Indrajit'?", myName.startsWith("Indrajit"));
console.log("Does city start with 'N'?", city.startsWith("N"));

// 9. endsWith(substring): Returns true if the string ends with the specified substring, otherwise false
// Syntax: string.endsWith(substring)
console.log("Does myName end with 'Rananavare'?", myName.endsWith("Rananavare"));
console.log("Does city end with 'o'?", city.endsWith("o"));

// 10. replace(searchValue, newValue): Returns a new string with the first occurrence of the searchValue replaced by newValue
// Syntax: string.replace(searchValue, newValue)
let newMessage = message.replace("Pune", "San Francisco");
console.log("Original message:", message);
console.log("New message after replace:", newMessage);

// 11. replaceAll(searchValue, newValue): Returns a new string with all occurrences of the searchValue replaced by newValue
// Syntax: string.replaceAll(searchValue, newValue)
newMessage = message.replaceAll("Pune", "New York");
console.log("Original message:", message);
console.log("New message after replaceAll:", newMessage);

// 12. split(separator): It will return an array of substrings by splitting the string at the specified separator. The separator can be a string or a regular expression. If the separator is not provided, it will return an array with the original string as the only element.
// Syntax: string.split(separator)
let wordsArray = message.split(" ");
console.log("Message split into words:", wordsArray);

// 13. trim(): It removes whitespace from both ends of the string and returns a new string without modifying the original string.
// Syntax: string.trim()
let stringWithSpaces: string = "   Hello World!   ";
console.log("Original string with spaces:", `"${stringWithSpaces}"`);
let trimmedString = stringWithSpaces.trim();
console.log("Trimmed string:", `"${trimmedString}"`);

//13. a) trimStart(): It removes whitespace from the beginning of the string and returns a new string without modifying the original string.
// Syntax: string.trimStart()
console.log("Original string with spaces:", `"${stringWithSpaces}"`);
let trimmedStartString = stringWithSpaces.trimStart();
console.log("Trimmed start string:", `"${trimmedStartString}"`);

//13. b) trimEnd(): It removes whitespace from the end of the string and returns a new string without modifying the original string.
// Syntax: string.trimEnd()
console.log("Original string with spaces:", `"${stringWithSpaces}"`);
let trimmedEndString = stringWithSpaces.trimEnd();
console.log("Trimmed end string:", `"${trimmedEndString}"`);

//14. concat(string2, string3, ..., stringN): It concatenates the string with one or more strings and returns a new string without modifying the original string.
// Syntax: string.concat(string2, string3, ..., stringN)
let firstName: string = "Indrajit";
let lastName: string = "Rananavare";
let fullName = firstName.concat(" ", lastName);
console.log("Full name using concat():", fullName);

//15. repeat(count): It returns a new string which is the original string repeated count times.
// Syntax: string.repeat(count)
let repeatedString = "Hello! ".repeat(3);
console.log("Repeated string:", repeatedString);

//16. toString(): It returns a string representing the object. For string objects, it returns the primitive string value.
let stringObject: String = new String("Hello World!");
console.log("Non-Primitive String object:", typeof stringObject);
console.log("Primitive string value of string object:", typeof stringObject.toString());
console.log("String object:", stringObject);
console.log("Primitive string value of string object:", stringObject.toString());

//17. valueOf(): It returns the primitive value of the string object. For string objects, it returns the primitive string value.
console.log("Primitive string value of string object using valueOf():", stringObject.valueOf());

// Concept of string immutability
// Even though we can perform various operations on strings, the original string remains unchanged. Any operation that modifies a string will create a new string. This is because strings in JavaScript (and TypeScript) are immutable.

let originalString: string = "Hello";
console.log("Original string:", originalString);
let modifiedString = originalString.toUpperCase();
console.log("Modified string (to uppercase):", modifiedString);
console.log("Original string after modification attempt:", originalString); // Original string remains unchanged due to immutability


