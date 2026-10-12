function displayMenu(){
    console.log("1. Diary milk silk - Rs 250");
    console.log("2. Monster - Rs 120");
    console.log("3. Sprit - Rs 100");
    console.log("4. 5 Star - Rs 50");
    console.log("5. Fizz - Rs 80");
}

alert("Welcome!");
alert("What do you want?");

displayMenu();

let item = Number(prompt("Enter the item number:"));
let amount = Number(prompt("Enter your amount:"));

let price = 0;
let name = "";

if (item === 1) {
    price = 250;
    name = "Dairy Milk Silk";
} 
else if (item === 2) {
    price = 120;
    name = "Monster";
} 
else if (item === 3) {
    price = 100;
    name = "Sprite";
} 
else if (item === 4) {
    price = 50;
    name = "5 Star";
} 
else if (item === 5) {
    price = 80;
    name = "Fizz";
} 
else {
    alert("Invalid item number!");
}

if (price > 0) {
    if (amount < 0 || !Number.isFinite(amount)) {
        alert("Enter a valid amount!");
    } 
    else if (amount < price) {
        alert("Insufficient balance!");
    } 
    else {
        let change = amount - price;

        alert("You selected " + name);
        alert("Your change is Rs. " + change);
        alert("Your item is ready!");
    }
}

again = confirm("Do you want to buy another item?");

let again = true;

while (again) {
    alert("Welcome!");
    displayMenu();

    let item = Number(prompt("Enter the item number:"));
    let amount = Number(prompt("Enter your amount:"));

    let price = 0;
    let name = "";

    if (item === 1) {
        price = 250;
        name = "Dairy Milk Silk";
    } else if (item === 2) {
        price = 120;
        name = "Monster";
        } else if (item === 3) {
        price = 100;
        name = "Sprite";
    } else if (item === 4) {
        price = 50;
        name = "5 Star";
    } else if (item === 5) {
        price = 80;
        name = "Fizz";
    } else {
        alert("Invalid item number!");
    }

    if (price > 0) {
        if (amount < 0 || !Number.isFinite(amount)) {
            alert("Enter a valid amount!");
        } else if (amount < price) {
            alert("Insufficient balance!");
        } else {
            let change = amount - price;

            alert("You selected " + name);
            alert("Your change is Rs. " + change);

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

            alert("Your item is ready!");
        }
    }

    again = confirm("Do you want to buy another item?");
}

alert("Thank you! Have a nice day!")







