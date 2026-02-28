//  object in typescript or javascript:
// An object is a collection of properties (variables) and behaviors (methods).
// In javascript and typescript, objects are used to store data in key-value pairs. The keys are strings (or symbols) and the values can be of any type, including other objects.
/*
Different ways to create an object in JavaScript/TypeScript:
1. Object Literal or object type: 
- The most common way to create an object is using an object literal, which is a comma-separated list of key-value pairs enclosed in curly braces {}.
- It is supported in both JavaScript and TypeScript. In TypeScript, you can also define the type of the object using an interface or a type alias.
*/
//Example of object literal or object type:
let car = {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    start: function () {
        console.log(`The ${this.make} ${this.model} is starting in the year ${this.year}.`);
    }
}
console.log("Car object:", car);
car.start();
console.log("Car make:", car.make); // It is recommended to use dot notation to access properties of the object because it is more readable and it provides better autocompletion in most code editors. 
console.log("Car model:", car["model"]); // It is also possible to use bracket notation to access properties of the object, but it is less common and it does not provide autocompletion in most code editors. It is usually used when the property name is stored in a variable or when the property name is not a valid identifier (e.g., contains spaces or special characters).

car.year = 2021; // We can change the value of the property of the object because it is mutable.
console.log("Updated car object:", car.year);

// When you define type as object you can not create methods inside the object. It will give you error. You can only create properties inside the object when you define type as object.
// If you going to access properties of the object then it will give you error because it is of type object and it does not know what properties are there in the object. It is a general type for all objects. It does not provide any information about the properties or methods of the object. 
// It is not recommended to use object type for defining objects in TypeScript because it does not provide any type safety and it can lead to runtime errors. It is better to use interfaces or type aliases to define the shape of the object and provide better type safety.

let bike: object = {
    make: "Honda",
    model: "CBR",
    year: 2021,
}
console.log("Car object:", car);
// console.log("Bike make:", bike.make); // Error: Property 'make' does not exist on type 'object'.

/*
2. Inline Object Type:
- It is same as object type only difference is we need to specify the data type of each property directly within the object literal, which provides better type safety and autocompletion in TypeScript.
- It is supported only in TypeScript.
- Problem in this approach is each time we need to define structure of the object again and again which is not efficient and it can lead to errors if we forget to define the structure of the object or if we define it incorrectly. It is better to use interfaces or type aliases to define the shape of the object and provide better type safety.
*/
// Example of inline object type:
let student: { name: string; age: number; grade: string; getStudentInfo: () => string } = {
    name: "Indrajit",
    age: 30,
    grade: "A",
    getStudentInfo: function () {
        return `Student name is ${this.name}, age is ${this.age} and grade is ${this.grade}`;
    }
};
console.log("Student object:", student);
console.log("Student name:", student.name);
student.grade = 'A+';
console.log(student.getStudentInfo());

/*
3. Using Type Alias or Interface:
- In this approach, we can define structure once and reuse it multiple times to create objects of the same shape. It provides better type safety and autocompletion in TypeScript.
- This is useful for complex objects or when you want to reuse the type definition.
- A type alias is defined using the `type` keyword, while an interface is defined using the `interface` keyword. Both can be used to define the structure of an object, but interfaces also support features like declaration merging and can be implemented by classes.
- It is supported only in TypeScript. In JavaScript, there is no built-in way to define types, but you can use JSDoc comments to provide type information for better tooling support.
*/
// Example1 of using type alias or interface:
type Employee = {
    name: string;
    age: number;
    department: string;
    getEmployeeInfo: () => string;
};

let employee1: Employee = {
    name: "Vishal",
    age: 30,
    department: "IT",
    getEmployeeInfo: function () {
        return `Employee name is ${this.name}, age is ${this.age} and department is ${this.department}`;
    }
};

let employee2: Employee = {
    name: "Suhel",
    age: 35,
    department: "HR",
    getEmployeeInfo: function () {
        return `Employee name is ${this.name}, age is ${this.age} and department is ${this.department}`;
    }
};

console.log("Employee 1 object:", employee1.getEmployeeInfo())
console.log("Employee 2 object:", employee2.getEmployeeInfo())

// Example2 of using intersection type:
type Person = {
    name: string;
    age: number;
};

type Address = {
    city: string;
    country: string;
};

type DetailedInfo = {
    personDetails: () => string;
}

type PersonWithAddress = Person & Address & DetailedInfo;

let person1: PersonWithAddress = {
    name: "Indrajit",
    age: 30,
    city: "Mumbai",
    country: "India",
    personDetails: function () {
        return `Person name is ${this.name}, age is ${this.age}, city is ${this.city} and country is ${this.country}`;
    }
};

console.log("Person 1 object:", person1.personDetails())

//Example3 of using type alias or interface:
interface Product {
    name: string;
    price: number;
    category: string;
    getProductInfo: () => string;
}

let product1: Product = {
    name: "Laptop",
    price: 1000,
    category: "Electronics",
    getProductInfo: function () {
        return `Product name is ${this.name}, price is ${this.price} and category is ${this.category}`;
    }
};

let product2: Product = {
    name: "Mobile",
    price: 500,
    category: "Electronics",
    getProductInfo: function () {
        return `Product name is ${this.name}, price is ${this.price} and category is ${this.category}`;
    }
};

console.log("Product 1 object:", product1.getProductInfo())
console.log("Product 2 object:", product2.getProductInfo())



/*
4. Using classes or constructor functions:
- In JavaScript and TypeScript, you can create objects using classes or constructor functions. A class is a blueprint for creating objects, and it can contain properties and methods. A constructor function is a regular function that is used to create and initialize an object.
- In TypeScript, you can define the types of the properties and methods in the class, which provides better type safety and autocompletion.
- In JavaScript, classes and constructor functions do not have built-in type definitions, but you can use JSDoc comments to provide type information for better tooling support.
*/
// Example of using class:
class Planet {
    name: string;
    distanceFromSun: number;

    constructor(name: string, distanceFromSun: number){
        this.name = name;
        this.distanceFromSun = distanceFromSun;
    }

    getPlanetInfo(): string {
        return `Planet name is ${this.name} and distance from sun is ${this.distanceFromSun} million kilometers.`;
    }
}

let planet = new Planet("Earth", 149.6);
let planet2 = new Planet("Mars", 227.9);
console.log("Planet object:", planet.getPlanetInfo())
console.log("Planet 2 object:", planet2.getPlanetInfo())

// Example of using constructor function:
function Animal(this: any, name: string, species: string) {
    this.name = name;
    this.species = species;
    this.getAnimalInfo = function() {
        return `Animal name is ${this.name} and species is ${this.species}.`;
    }
}

let animal = new (Animal as any)("Lion", "Panthera leo");
console.log("Animal object:", animal.getAnimalInfo())

