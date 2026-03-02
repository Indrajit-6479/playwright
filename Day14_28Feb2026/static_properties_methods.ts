// 4. static properties and methods:
// It is same working as java static properties and methods.
// Static properties and methods are defined using the static keyword in TypeScript.
// Static properties and methods belong to the class itself rather than to instances of the class. 
// Static members are often used for utility functions or to store data that is shared across all instances of a class.
// They can be accessed without creating an instance of the class. It can accessed using the class name directly.
// static properties and methods can be modified in any object which reflects other objects as well because they are shared across all instances of the class.

// Example of static properties and methods
class MathUtils {
    // static variable shared across all instances
    static pi: number = 3.14159;


    static calculateAreaOfCircle(radius: number): number {
        return MathUtils.pi * radius * radius;
    }
}

// Accessing static property
console.log(MathUtils.pi); // Output: 3.14159

// Accessing static method
const radius = 5;
const area = MathUtils.calculateAreaOfCircle(radius);
console.log(`Area of circle with radius ${radius} is ${area}`); // Output: Area of circle with radius 5 is 78.53975