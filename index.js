// functions

// let name = "sandy";

// function greetUser(name){
//     console.log( "HI i m " + name + "i m from clover kingdom" );
// }

// greetUser("sandy")

// function add(a,b){
//     return a+b
// }
 
// console.log(add(1,2))

// function sub(a,b){
//     return a-b
// }
 
// console.log(sub(5,2))

// function multiply(a,b){
//     return a*b
// }
 
// console.log(multiply(2,4))

// function divid(a,b){
//     return a/b
// }
 
// console.log(divid(6,2))

// function modulus(a,b){
//     return a%b
// }
 
// console.log(modulus(8,2))

// function power(a,b){
//     return a**b
// }
 
// console.log(power(9,2))
// console.log(add(1,2))
// console.log(sub(1,2))
// console.log(mutiply(1,2))
// console.log(divid(1,2))
// console.log(power(1,2))

// console.log(false && false)



let name = prompt("Enter student name:");

let m1 = Number(prompt("Enter Subject 1 marks:"));
// if(m1 < 0 || m1 > 100 ){
//     alert("Error: Marks must be between 0 and 100.");
// }
let m2 = Number(prompt("Enter Subject 2 marks:"));
// if(m2 < 0 || m2 > 100 ){
//     alert("Error: Marks must be between 0 and 100.");
// }
let m3 = Number(prompt("Enter Subject 3 marks:"));
// if(m3 < 0 || m3 > 100 ){
//     alert("Error: Marks must be between 0 and 100.");
// }

function calculateTotal() {
    return m1 + m2 + m3;
}

function calculateAverage(total) {
    return total / 3;
}

let total = calculateTotal();
let average = calculateAverage(total);
let grade;

if (m1 < 0 || m1 > 100 ||
    m2 < 0 || m2 > 100 ||
    m3 < 0 || m3 > 100) {

    alert("Error: Marks must be between 0 and 100.");

} 
else {

    if (average >= 90) {
        grade = "A";
    } else if (average >= 75) {
        grade = "B";
    } else if (average >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    alert(
        "Student Name: " + name +"Total Marks: " + total + "Average: " + average.toFixed(2) +"Grade: " + grade
    );


    confirm("Do you want to calculate another student's result?");
}