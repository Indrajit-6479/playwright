// super() : used to invoke immediate parent class constructor
// super : used to invoke immediate parent class method 
// in typescript using super we only able to invoke the immediate parent class method but we unable to access parent class property. In java we can able to access.

// Example1:
class Parent {
    parentProperty: string;

    constructor(parentProperty: string) {
        this.parentProperty = parentProperty;
    }

    parentMethod() {
        console.log(`This is a method in the Parent class. Parent property: ${this.parentProperty}`);
    }
}

class Child extends Parent {
    childProperty: string;

    constructor(parentProperty: string, childProperty: string) {
        super(parentProperty); // Call the constructor of the Parent class
        this.childProperty = childProperty; // Initialize child class property      
    }

    childMethod() {
        console.log(`This is a method in the Child class. Child property: ${this.childProperty}`);
        super.parentMethod(); // Call the method from the Parent class
    }
}

// Create an instance of the Child class
let childInstance: Child = new Child("Parent Property Value", "Child Property Value");
childInstance.childMethod(); // This will call the child method which in turn calls the parent method using super

//Example2:

class ParentClass {
    num: number = 10;

    constructor() {
        console.log("Parent class constructor called");
    }

    display() {
        console.log(`Parent class method called. num: ${this.num}`);
    }
}

class ChildClass extends ParentClass {
    num: number = 20; // This will hide the parent class property //overriding

    constructor() {
        super(); // Call the constructor of the ParentClass
        console.log("Child class constructor called");
    }

    show() {
        console.log(`num: ${this.num}`); //20
        // console.log(`num: ${super.num}`); in typescript we can't access parent class property using super
        console.log(`Child class method called.`);
    }

    // Override the display method of the ParentClass
    display() {
        console.log(`Child class method called. num: ${this.num}`);
        super.display(); // Call the display method of the ParentClass
    }
}

let childObj: ChildClass = new ChildClass();
childObj.show();
childObj.display();