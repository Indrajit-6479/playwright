/* 
Tuples in Typescript:
----------------------
- A tuple is a fixed length array where each element has a specific type.
- It helps in storing multiple fields of different data types together.
*/

//Example 1: Tuple with 2 values of string, number
let person: [string, number] = ["John", 101];
console.log(person[0]);
console.log(person[1]);
console.log(person);

//Example 2: Tuple with multiple values
let user: [number, string, boolean, number, string] = [10, "John", true, 200, "Jay"];
console.log(user[2]);
console.log(user[4]);
console.log(user);

//Example 3: Iterating over a tuple using a traditional for loop
for (let i: number = 0; i < user.length; i++) {
    console.log(user[i]);
}

//Example 4: Iterating using the 'for....in' loop (index)
for (let i in user) { // i is store index not the values
    console.log(`User : ${user[i]}`);
}

//Example 5: Iterating using the 'for....of' loop (values)
for (let u of user) {
    console.log(`User Values : ${u}`);
}

//Example 6: Tuple Array (Array of Tuples)
let student: [number, string][] = [[101, "Vijay"], [102, "Vikash"], [103, "Yogesh"], [104, "Suhel"]];
console.log(student.length)
console.log(student[2]);
console.log(student[2][1]);


