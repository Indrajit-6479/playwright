// Inheritance in TypeScript:
// Inheritance is a fundamental object-oriented programming concept that allows  child or subclass to inherit properties and methods from an parent or superclass. 
// Inheritance allows you to reuse the functionality of existing class without re-writing it which promotes code reusability and maintainability.
// using the extends keyword, a class can inherit from another class. The child class can also override methods of the parent class to provide specific implementations.

// Example1: inheritance

// Base class (Parent class)
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating.`);
    }
}

// Derived class (Child class) that inherits from Animal
class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name); // Call the constructor of the base class/ parent class
        this.breed = breed;
    }

    bark() {
        console.log(`${this.name} is barking.`);
    }
}

// Create an instance of the Dog class
let myDog = new Dog("Buddy", "Golden Retriever");
myDog.eat(); // Inherited method from Animal class
myDog.bark(); // Method defined in Dog class


// Example2: inheritance with method overriding
// for method overriding, child class method should have the same name and signature as the parent class method. 
// When you call the method on an instance of the child class, the overridden method in the child class will be executed instead of the method in the parent class. 
// This allows you to provide specific implementations for methods in the child class while still maintaining the structure and behavior defined in the parent class.

class Vehicle {
    make: string;
    model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }

    vehicleInfo() {
        console.log(`${this.make} ${this.model} is starting the vehicle.`);
    }

    vehicleStart() {
        console.log("Vehicle is started.");
    }
}

class Car extends Vehicle {
    numberOfDoors: number;

    constructor(make: string, model: string, numberOfDoors: number) {
        super(make, model); // Call the constructor of the base class/ parent class
        this.numberOfDoors = numberOfDoors;
    }

    vehicleInfo() {
        console.log(`${this.make} ${this.model} has ${this.numberOfDoors} doors.. Starting the car!`);
    }

    carStart() {
        console.log("Car is started.");
    }
}

let myOldCar = new Car("Toyota", "Corolla", 4);
myOldCar.vehicleInfo(); // overridden method in Car class
myOldCar.vehicleStart(); // inherited method from Vehicle class

let myNewCar: Car = new Car("Honda", "Civic", 5); // child class object is created and stored in a child class reference variable
myNewCar.vehicleInfo(); // overridden method in Car class
myNewCar.vehicleStart(); // inherited method from Vehicle class

let myVehicle: Vehicle = new Car("Ford", "Mustang", 2); // child class object is created and stored in a parent class reference variable
myVehicle.vehicleInfo(); // overridden method in Car class (runtime polymorphism)
myVehicle.vehicleStart(); // inherited method from Vehicle class
// When you use a parent class reference variable to store a child class object, 
// you can only access methods and properties from the parent class. If the same method signature present in child class, the child class method is executed (runtime polymorphism). You CANNOT access methods or properties that are unique to the child class.

// Example:
// myVehicle.carStart(); // ERROR! carStart() only exists in Car class, not in Vehicle class
// myVehicle.numberOfDoors; // ERROR! numberOfDoors only exists in Car class, not in Vehicle class

// If you really need to access Car-specific features, you must cast (convert) it first:
// (myVehicle as Car).numberOfDoors; // This works, but be careful!

// Rule: Parent reference variable = Can only use parent class features
//       Child reference variable = Can use both parent and child class features





