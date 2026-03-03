export { }
//Statements 
//1) Conditional Statements OR Decision Making Statements
//2) Looping Statements OR Iterative Statements

// 1) if condition
/*
if(condition){
    //statements
}
*/

//Example:
let age: number = 20;
if (age >= 18) {
    console.log("You are eligible for vote");
}

// 2) if else condition
/*
if(condition){
    statements
}else{
 statements
}
*/

//Example:
let num: number = 19;
if (num % 2 == 0) {
    console.log(`${num} number is even number`);
} else {
    console.log(`${num} number is odd number`)
}

// 3) Nested if else
/*
if(condition 1){
    statements;
} else if(condition 2){
    statements;
}
else{
    statements;
}
*/

//Example
let marks: number = 68;
if (marks >= 90 && marks <= 100) {
    console.log("Grade A");
} else if (marks >= 75 && marks < 90) {
    console.log("Grade B");
} else if (marks >= 60 && marks < 75) {
    console.log("Grade C");
} else {
    console.log("Grade D");
}

//4) switch case statement
/*
switch(expression){
    case value1: statements;
                 break;
    case value2: statements;
                 break;
    case value3: statements;
                 break;
    default: statements;                                       
}
*/

//Example:
let valueOfDay: number = 4;
switch (valueOfDay) {
    case 1: console.log("Monday");
        break;
    case 2: console.log("Tuesday");
        break;
    case 3: console.log("Wednesday");
        break;
    case 4: console.log("Thursday");
        break;
    case 5: console.log("Friday");
        break;
    case 6: console.log("Saturday");
        break;
    case 7: console.log("Sunday");
        break
    default: console.log("Please provide valid day value");
}