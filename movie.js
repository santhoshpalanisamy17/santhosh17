const movies = [
    {
        name: "Inception",
        price: 150
    },
    {
        name: "Interstellar",
        price: 120
    },
    {
        name: "Avengers: Endgame",
        price: 180
    }
];

const bookingForm = document.getElementById("bookingForm");
const movieSelect = document.getElementById("movie");
const showtimeSelect = document.getElementById("showtime");
const emailInput = document.getElementById("email");
const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const bookingList = document.getElementById("bookingList");
const bookingCount = document.getElementById("bookingCount");
const searchBooking = document.getElementById("searchBooking");
const message = document.getElementById("message");

let bookings = [];
let nextBookingId = 1;

function getMoviePrice(movieName) {
    const selectedMovie = movies.find(function(movie) {
        return movie.name === movieName;
    });
    if (selectedMovie) {
        return selectedMovie.price;
    }
    return 0;
}

function calculateTotal() {
    const movieName = movieSelect.value;
    const quantity = Number(quantityInput.value);
    const price = getMoviePrice(movieName);
    if (movieName !== "" && Number.isInteger(quantity) && quantity > 0) {
        totalPrice.textContent = price * quantity;
    } else {
        totalPrice.textContent = 0;
    }
}

function showMessage(text, type) {
    message.textContent = text;
    message.style.backgroundColor =
        type === "success" ? "#d1fae5" : "#fee2e2";
    message.style.color =
        type === "success" ? "#065f46" : "#991b1b";
    message.style.border =
        type === "success" ? "1px solid #a7f3d0" : "1px solid #fecaca";
}

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const movieName = movieSelect.value;
    const showtime = showtimeSelect.value;
    const email = emailInput.value.trim();
    const quantity = Number(quantityInput.value);

    if (movieName === "") {
        showMessage("Please select a movie.", "error");
        return;
    }

    if (showtime === "") {
        showMessage("Please select a showtime.", "error");
        return;
    }

    if (email === "" ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
        {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        showMessage("Ticket quantity must be a positive whole number.","error");
        return;
    }

    const price = getMoviePrice(movieName);
    const total = price * quantity;
    const booking = { id: nextBookingId++, movie: movieName, showtime: showtime, email: email, quantity: quantity, total: total};
    bookings.push(booking);

    displayBookings();
    showMessage("Booking created successfully! Total: ₹" + total + ". Email confirmation has NOT been sent yet.", "success");

    bookingForm.reset();
    totalPrice.textContent = 0;

});

function displayBookings() {
    const searchText = searchBooking.value
        .trim()
        .toLowerCase();
    const filteredBookings = bookings.filter(function(booking) {
        return booking.movie.toLowerCase() .includes(searchText);
    });

    bookingList.replaceChildren();
    bookingCount.textContent = bookings.length;
    if (filteredBookings.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-message";
        const heading = document.createElement("h3");
        heading.textContent = bookings.length === 0 ? "No bookings yet." : "No matching bookings found.";
        const description = document.createElement("p");
        description.textContent = bookings.length === 0 ? "Book your favourite movies and see them here!" : "Try searching for another movie.";
        emptyMessage.append(heading, description);
        bookingList.appendChild(emptyMessage);
        return;
    }

    filteredBookings.forEach(function(booking) {
        const card = document.createElement("div");
        card.className = "booking-card";
        const title = document.createElement("h3");
        title.textContent = booking.movie;
        const showtime = document.createElement("p");
        showtime.textContent = "Showtime: " + booking.showtime;
        const quantity = document.createElement("p");
        quantity.textContent = "Tickets: " + booking.quantity;
        const email = document.createElement("p");
        email.textContent = "Email: " + booking.email;
        const total = document.createElement("p");
        total.textContent = "Total: ₹" + booking.total;
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel Booking";
        cancelButton.className = "cancel-btn";
        cancelButton.addEventListener("click", function() {
            cancelBooking(booking.id);
        });
        card.append(title, showtime, quantity, email, total, cancelButton);
        bookingList.appendChild(card);
    });
}

function cancelBooking(bookingId) {
    const previousCount = bookings.length;
    bookings = bookings.filter(function(booking) {
        return booking.id !== bookingId;
    });
    if (bookings.length < previousCount) {
        displayBookings(); showMessage("Booking cancelled successfully.", "success");
    }
}

searchBooking.addEventListener("input", function() {
    displayBookings();
});

movieSelect.addEventListener("change", calculateTotal);
quantityInput.addEventListener("input", calculateTotal);
bookingForm.addEventListener("reset", function() {
    totalPrice.textContent = 0;
    message.textContent = "";
});

displayBookings();