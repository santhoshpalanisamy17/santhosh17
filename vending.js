function menu() {
    console.log("1. Diary milk silk - Rs.150");
    console.log("2. Monster - Rs.120");
    console.log("3. Sprite - Rs.80");
    console.log("4. Five star - Rs.50");
    console.log("5. Fizz - Rs.70");
}

alert("Welcome to vending machine" )
alert("What do you want")

function purchase(price, amount, item) {
    if (amount < price) {
        alert("Insufficient balance!");
    } else {
        console.log("Selected item: " + item);
        console.log("Change: Rs." + (amount - price));

        for (let i = 3; i >= 1; i--) {
            console.log(i);
        }

        console.log("Your item is ready!");

        for (let i = 1; i <= item; i++) {
            let row = "";
            for (let j = 1; j <= i; j++) {
                row += j + " ";
            }
            console.log(row);
        }

        alert("Purchase successful!");
    }
}

let again = true;

while (again) {
    menu();

    let item = Number(prompt("Enter item number (1-5):"));
    let amount = Number(prompt("Enter your amount:"));

    let prices = [150, 120, 80, 50, 70];
    let names = ["Diary milk silk", "Monster", "Sprite", "Five star", "Fizz"];

    if (item < 1 || item > 5 || !Number.isInteger(item)) {
        alert("Invalid item number!");
    } else if (amount < 0 || !Number.isFinite(amount) || amount === 0) {
        alert("Enter a valid amount!");
    } else {
        purchase(prices[item - 1], amount, names[item - 1]);
    }

    again = confirm("Do you want to buy another item?");
}

alert("Thank you! Have a nice day!");









