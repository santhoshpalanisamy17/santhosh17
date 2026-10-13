function multiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        console.log(num + " x " + i + " = " + (num * i));
    }
}

let again = true;

while (again) {
    let num = Number(prompt("Enter a positive whole number:"));

    if (!Number.isInteger(num) || num <= 0) {
        alert("Please enter a valid positive whole number!");
    } else {
        let sum = 0;

        for (let i = 1; i <= num; i++) {
            sum = sum + i;
        }

        if (num % 2 === 0) {
            alert("The number is Even.\nSum = " + sum);

            console.log("Multiplication Table:");
            multiplicationTable(num);

            console.log("Square Pattern:");

            for (let i = 1; i <= num; i++) {
                let row = "";

                for (let j = 1; j <= num; j++) {
                    row += "* ";
                }

                console.log(row);
            }
        } else {
            alert("The number is Odd.\nSum = " + sum);

            console.log("Multiplication Table:");
            multiplicationTable(num);

            console.log("Triangle Pattern:");

            for (let i = 1; i <= num; i++) {
                let row = "";

                for (let j = 1; j <= i; j++) {
                    row += "* ";
                }

                console.log(row);
            }
        }
    }

    again = confirm("Do you want to run the program again?");
}

alert("Thank you");

