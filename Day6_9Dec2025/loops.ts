
/*1) while loop 
 - A while loop executes as long as the condition is true
 - if we have the starting point but we don't know the ending point as log as   condition is true it will get executed.
 - When condition never becomes false then it will go to infinite loop.
 */
/*
Syntax:
let i:number = 1;
while(condition){
    statements;
}
*/

//Example1: print 1 to 10 no's
let i: number = 1;
while (i <= 10) {
    console.log(i);
    i++;
}

//Example2: print even no between 1 to 10 
let m: number = 1;
while (m <= 10) {
    if (m % 2 == 0) {
        console.log(`Number ${m} is even number`);
    }
    m++;
}

let n: number = 2;
while (n <= 10) {
    console.log(`Number ${n} is even number`);
    n += 2;
}

/*2)do while loop 
- A do-while loop always executes at least once before checking the condition.

Syntax:
do{
    //statements
} while(condition);
 
*/
//Example1
let a: number = 20;
do {
    console.log(a++);
} while (a <= 5);

//Example2
let b: number = 0;
do {
    console.log(b++);
} while (b <= 5);

/*3)for loop 
- for loop is used when you exact know how much iteration need to perform. i.e. know starting and ending point 
- first value will be initialize then it will check the condition if condition is true then it will execute the statements then it will increment/decrement and so on

Syntax:
for(initialization; condition; inc/dec){
statements;
}
 
*/
//Example1: print 10....1 no's
for (let i: number = 10; i >= 1; i--) {
    console.log(i);
}

//Example2: print even no's
for (let j: number = 2; j <= 10; j += 2) {
    console.log(j);
}

//Example3:
let h: number; //global variable
for (let h = 1; h <= 5; h++) { //local variable
    console.log(h * 3);
}

//Example4:
let p: number;
for (p = 1; p <= 5; p++) {
    console.log(p);  //1....5
}
console.log(p); //6

//Example5:
let q: number;
for (q = 1; q <= 5; q++);
console.log(q); //6

/* Note: i)break ii)continue
i)break:- It will jump out from the loop
ii)continue:- It will only skip the current iteration and continue the loop
 */

//Example1: break
for (let i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    console.log(i); // 1...4
}

//Example2: continue
for (let i = 1; i <= 10; i++) {
    if (i == 5) {
        continue;
    }
    console.log(i); // 1234678910
}