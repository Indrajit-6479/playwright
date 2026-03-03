// 1. class 
// A class is a blueprint for creating objects. It encapsulates data and functions that operate on that data. In TypeScript, you can define classes with properties, methods, and constructors.
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

let person1 = new Person("Alice", 30);
console.log(person1.getDetails());

// 2. readonly property
// A readonly property is a property that can only be assigned a value during initialization or in the constructor. Once assigned, its value cannot be changed. This is useful for properties that should not be modified after they are set.
class Car {
    readonly make: string;
    readonly model: string;
    readonly year: number;
    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}

let car1 = new Car("Toyota", "Corolla", 2020);
console.log(`Car: ${car1.make} ${car1.model}, Year: ${car1.year}`);

// Attempting to modify a readonly property will result in a compile-time error
// car1.make = "Honda"; // Error: Cannot assign to 'make' because it is a read-only property.
// car1.model = "Civic"; // Error: Cannot assign to 'model' because it is a read-only property.
// car1.year = 2021; // Error: Cannot assign to 'year' because it is a read-only property.

//3. Optional property
// An optional property is a property that may or may not be present in an object. In TypeScript, you can define optional properties using the '?' symbol. This allows you to create objects that do not require all properties to be defined.
class Employee {
    name: string;
    age: number;
    department?: string; // Optional property

    constructor(name: string, age: number, department?: string) {
        this.name = name;
        this.age = age;
        if (department) {
            this.department = department;
        }
    }
    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}, Department: ${this.department || "N/A"}`;
    }
}

let employee1 = new Employee("Bob", 25);
console.log(employee1.getDetails());
let employee2 = new Employee("Charlie", 28, "HR");
console.log(employee2.getDetails());
