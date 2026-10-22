const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");
const expenseList = document.getElementById("expenseList");
const monthlySpending = document.getElementById("monthlySpending");
const totalExpenses = document.getElementById("totalExpenses");
const remainingBudget = document.getElementById("remainingBudget");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");
const budgetForm = document.getElementById("budgetForm");
const budgetAmount = document.getElementById("budgetAmount");
const budgetMessage = document.getElementById("budgetMessage");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const currentDate = document.getElementById("currentDate");
const budgetPercentage = document.getElementById("budgetPercentage");
const budgetProgress = document.getElementById("budgetProgress");
const budgetProgressBar = document.getElementById("budgetProgressBar");
const budgetStatus = document.getElementById("budgetStatus");

function loadExpenses() {
    try {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
        if (!Array.isArray(savedExpenses)) {
            return [];
        }
        return savedExpenses.filter(function(expense) {
            return (
                expense &&
                typeof expense.id === "number" &&
                typeof expense.name === "string" &&
                typeof expense.amount === "number" &&
                Number.isFinite(expense.amount) &&
                expense.amount > 0 &&
                typeof expense.category === "string" &&
                typeof expense.date === "string"
            );
        });
    } catch (error) {
        return [];
    }
}

function loadBudget() {
    const savedBudget = Number(localStorage.getItem("budget"));
    if (Number.isFinite(savedBudget) && savedBudget > 0) {
        return savedBudget;
    }
    return 0;
}

let expenses = loadExpenses();
let budget = loadBudget();

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

expenseDate.value = getTodayDate();
expenseDate.max = getTodayDate();

// Display today's date in the header
currentDate.textContent = new Date().toLocaleDateString(
    "en-IN",
    {
        day: "numeric",
        month: "short",
        year: "numeric"
    }
);

function saveExpenses() {
    try {
        localStorage.setItem( "expenses", JSON.stringify(expenses));
        return true;
    } catch (error) {
        return false;
    }
}

function saveBudget() {
    try {
        localStorage.setItem("budget", String(budget));
        return true;
    } catch (error) {
        return false;
    }
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = "message " + type;
}

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function isValidDate(dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }
    const date = new Date(dateString + "T00:00:00");
    return (
        !Number.isNaN(date.getTime()) &&
        date.getFullYear() === Number(dateString.slice(0, 4)) &&
        date.getMonth() + 1 === Number(dateString.slice(5, 7)) &&
        date.getDate() === Number(dateString.slice(8, 10))
    );
}

function isCurrentMonth(dateString) {
    const today = new Date();
    return (
        dateString.slice(0, 4) === String(today.getFullYear()) &&
        dateString.slice(5, 7) === String(today.getMonth() + 1).padStart(2, "0")
    );
}

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;

    if (name === "") {
        showMessage(message, "Please enter an expense name.", "error");
        expenseName.focus();
        return;
    }

    if (
        expenseAmount.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        showMessage(
            message,
            "Please enter a valid amount greater than zero.",
            "error"
        );
        expenseAmount.focus();
        return;
    }

    if (category === "") {
        showMessage(message, "Please select an expense category.","error");
        expenseCategory.focus();
        return;
    }

    // Validate date
    if (!isValidDate(date) || date > getTodayDate()) {
        showMessage( message, "Please select a valid date that is not in the future.", "error");
        expenseDate.focus();
        return;
    }

    // Create an expense object
    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(newExpense);
    const saved = saveExpenses();
    displayExpenses();
    updateDashboard();

    // Clear the form
    expenseForm.reset();
    expenseDate.value = getTodayDate();

    if (saved) {
        showMessage(message, "Expense added successfully!", "success" );
    } else {
        showMessage(message, "Expense added, but it could not be saved permanently.", "error");
    }
});

function displayExpenses() {
    expenseList.replaceChildren();
    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const selectedCategory = categoryFilter.value;

    // Filter expenses by name and category
    const filteredExpenses = expenses.filter(function(expense) {
        const matchesName = expense.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "All" || expense.category === selectedCategory;
        return matchesName && matchesCategory;
    });
    // Display the newest expense date first
    filteredExpenses.sort(function(a, b) {
        return b.date.localeCompare(a.date);
    });

    // Show or hide the empty message
    emptyMessage.style.display = filteredExpenses.length === 0 ? "block" : "none";

    // Display the appropriate empty message
    if (filteredExpenses.length === 0) {
        if (expenses.length === 0) {
            emptyMessage.querySelector("h3").textContent = "No expenses added yet.";
            emptyMessage.querySelector("p").textContent = "Add your first expense to start tracking your money!";
        } else {
            emptyMessage.querySelector("h3").textContent = "No matching expenses found.";
            emptyMessage.querySelector("p").textContent = "Try changing your search or category filter.";
        }
        return;
    }

    // Create a card for each expense
    filteredExpenses.forEach(function(expense) {

        const card = document.createElement("div");
        card.className = "expense-card";
        const details = document.createElement("div");
        details.className = "expense-details";
        const name = document.createElement("h3");
        name.textContent = expense.name;
        const category = document.createElement("p");
        category.textContent ="Category: " + expense.category;
        const date = document.createElement("p");
        date.textContent ="Date: " + expense.date;
        const amount = document.createElement("h3");
        amount.className = "expense-amount";
        amount.textContent = formatRupees(expense.amount);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.setAttribute("aria-label","Delete expense: " + expense.name );

        // Delete the selected expense
        deleteButton.addEventListener("click", function() {
            // Ask the user for confirmation
            const confirmed = confirm(
                "Are you sure you want to delete this expense?"
            );
            // Stop if the user selects Cancel
            if (!confirmed) {
                return;
            }
            // Keep all expenses except the selected one
            const previousExpenses = expenses;
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });
            // Save the updated array
            const saved = saveExpenses();
            // Refresh cards and dashboard
            displayExpenses();
            updateDashboard();
            // Show the result
            if (saved) {
                showMessage( message,"Expense deleted successfully!", "success"  );
            } else {
                showMessage( message, "Expense deleted from the page, but the change could not be saved permanently.", "error");
            }
        });
        // Add details to the details container
        details.append(name, category, date);
        // Add everything to the card
        card.append(details, amount, deleteButton);
        // Add the card to the expense list
        expenseList.append(card);
    });
}

budgetForm.addEventListener("submit", function(event) {
    // Prevent page refresh
    event.preventDefault();
    // Get the entered budget
    const enteredBudget = Number(budgetAmount.value);
    // Validate budget
    if (
        budgetAmount.value.trim() === "" ||
        !Number.isFinite(enteredBudget) ||
        enteredBudget <= 0
    ) {
        showMessage( budgetMessage, "Please enter a valid budget greater than zero.", "error" );
        budgetAmount.focus();
        return;
    }

    // Store the budget
    const previousBudget = budget;
    budget = enteredBudget;

    // Save the budget
    const saved = saveBudget();
    // Update the dashboard
    updateDashboard();

    // Show the result
    if (saved) {
        showMessage( budgetMessage, "Monthly budget updated successfully!", "success");
    } else {
        showMessage( budgetMessage, "Budget updated on the page, but it could not be saved permanently.", "error");
    }
});

function updateDashboard() {
    // Get only this month's expenses
    const monthlyExpenses = expenses.filter(function(expense) {
        return isCurrentMonth(expense.date);
    });

    // Calculate this month's total spending
    const totalSpending = monthlyExpenses.reduce(
        function(total, expense) {
            return total + expense.amount;
        },
        0
    );

    // Update monthly spending
    monthlySpending.textContent =
        formatRupees(totalSpending);

    // Update the number of expenses this month
    totalExpenses.textContent = monthlyExpenses.length;

    // Calculate remaining budget
    const remaining = budget - totalSpending;

    // Update the remaining budget display
    if (budget === 0) {
        remainingBudget.textContent = "Not set";
    } else {
        remainingBudget.textContent =
            formatRupees(remaining);
    }
    let percentage = 0;
    if (budget > 0) {
        percentage = (totalSpending / budget) * 100;
    }
    const progressWidth = Math.min(percentage, 100);
    budgetPercentage.textContent = Math.round(percentage) + "%";
    budgetProgressBar.style.width = progressWidth + "%";
    budgetProgress.setAttribute( "aria-valuenow", String(Math.round(progressWidth)));
    budgetProgressBar.style.background = "#7454e8";
    budgetStatus.className = "budget-status";

    // Show budget status
    if (budget === 0) {
        budgetStatus.textContent = "Set a budget to track your spending.";
    } else if (percentage > 100) {
        budgetProgressBar.style.background = "#d12f42";
        budgetStatus.classList.add("danger");
        budgetStatus.textContent = "⚠️ Budget exceeded by " + formatRupees(totalSpending - budget) + ". Try reducing your spending!";
    } else if (percentage >= 80) {
        budgetProgressBar.style.background = "#f0a020";
        budgetStatus.classList.add("warning");
        budgetStatus.textContent =
            "⚠️ You have used " +
            Math.round(percentage) +
            "% of your monthly budget.";
    } else {
        budgetStatus.classList.add("success");
        budgetStatus.textContent = "You have " + formatRupees(remaining) + " remaining in your budget.";
    }
}

searchInput.addEventListener("input", function() {
    displayExpenses();
});
categoryFilter.addEventListener("change", function() {
    displayExpenses();
});
displayExpenses();
updateDashboard();
if (budget > 0) {
    budgetAmount.value = budget;
}