// Access Modifiers in TypeScript:
// 1. public: The default access modifier. Members are accessible from anywhere.
// 2. private: Members are only accessible within the class they are declared.
// 3. protected: Members are accessible within the class and its subclasses.

// Note: In TypeScript, you cannot access private members of a class from outside the class, and protected members can only be accessed within the class and its subclasses.

// Example of Access Modifiers:

class Example {
    public publicProperty: string;
    private privateProperty: string;
    protected protectedProperty: string;

    constructor(publicProperty: string, privateProperty: string, protectedProperty: string) {
        this.publicProperty = publicProperty;
        this.privateProperty = privateProperty;
        this.protectedProperty = protectedProperty;
    }

    public publicMethod() {
        console.log(`Public method called. Public property: ${this.publicProperty}`);
    }

    private privateMethod() {
        console.log(`Private method called. Private property: ${this.privateProperty}`);
    }

    protected protectedMethod() {
        console.log(`Protected method called. Protected property: ${this.protectedProperty}`);
    }
}

let exampleInstance = new Example("Public Value", "Private Value", "Protected Value");
exampleInstance.publicMethod(); // Accessible
// exampleInstance.privateMethod(); // Error: Property 'privateMethod' is private and only accessible within class 'Example'.
// exampleInstance.protectedMethod(); // Error: Property 'protectedMethod' is protected and only accessible within class 'Example' and its subclasses.

// Example of Access Modifiers with Inheritance for protected members:

class BaseClass {
    protected protectedProperty: string;

    constructor(protectedProperty: string) {
        this.protectedProperty = protectedProperty;
    }

    protected protectedMethod() {
        console.log(`Protected method in BaseClass. Protected property: ${this.protectedProperty}`);
    }
}

class DerivedClass extends BaseClass {
    constructor(protectedProperty: string) {
        super(protectedProperty); // Call the constructor of the BaseClass
    }

    public accessProtected() {
        console.log(`Accessing protected property in DerivedClass: ${this.protectedProperty}`); // Accessible
        this.protectedMethod(); // Accessible
    }
}

let derivedInstance = new DerivedClass("Protected Value in Derived Class");
derivedInstance.accessProtected(); // This will call the method that accesses the protected property and method from the BaseClass  

//Example of Access Modifiers private members:

class BaseClassWithPrivate {
    private privateProperty: string;
    constructor(privateProperty: string) {
        this.privateProperty = privateProperty;
    }

    private privateMethod() {
        console.log(`Private method in BaseClassWithPrivate. Private property: ${this.privateProperty}`);
    }

    public accessPrivate() {
        console.log(`Accessing private property in BaseClassWithPrivate: ${this.privateProperty}`); // Accessible within the class
        this.privateMethod(); // Accessible within the class
    }
}

let baseInstance = new BaseClassWithPrivate("Private Value in Base Class");
baseInstance.accessPrivate(); // This will call the method that accesses the private property and method from the BaseClassWithPrivate
// baseInstance.privateMethod(); // Error: Property 'privateMethod' is private and only accessible within class 'BaseClassWithPrivate'.
// console.log(baseInstance.privateProperty); // Error: Property 'privateProperty' is private and only accessible within class 'BaseClassWithPrivate'.