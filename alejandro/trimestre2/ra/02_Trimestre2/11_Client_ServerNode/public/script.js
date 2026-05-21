// -----------------------------
// LOGIN FUNCTION
// -----------------------------
async function login() {

    // Get the values from the login inputs
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Get the paragraph where the message will be shown
    const loginMessage = document.getElementById("loginMessage");

    try {
        // Send a POST request to the server with user data
        // Fetch API is used to make HTTP requests
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        // Convert the response to JSON format
        const data = await response.json();

        // Check if login is correct
        if (data.ok === true) {
            loginMessage.style.color = "green";
            loginMessage.textContent = "Login successful";
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = data.message;
        }

    } catch (error) {
        // If the server is not reachable
        loginMessage.style.color = "red";
        loginMessage.textContent = "Server connection error";
    }
}

// -----------------------------
// COUPON VALIDATION FUNCTION
// -----------------------------
async function validateCoupon() {

    // Get the coupon value
    const coupon = document.getElementById("coupon").value;

    // Get the paragraph where the message will be shown
    const couponMessage = document.getElementById("couponMessage");

    try {
        // Send a GET request to the server to validate the coupon
        const response = await fetch(
            "http://localhost:3000/coupon/" + coupon
        );

        // Convert the response to JSON
        const data = await response.json();

        // Check if the coupon is valid
        if (data.valid === true) {
            couponMessage.style.color = "green";
            couponMessage.textContent =
                "Valid coupon: " + data.discount + "% discount";
        } else {
            couponMessage.style.color = "red";
            couponMessage.textContent = "Invalid coupon";
        }

    } catch (error) {
        // Error if the server is not reachable
        couponMessage.style.color = "red";
        couponMessage.textContent = "Error validating coupon";
    }
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------

// Use const because these elements will not change
const loginButton = document.getElementById("loginBtn");
const couponButton = document.getElementById("couponBtn");

// Add click events
loginButton.addEventListener("click", login);
couponButton.addEventListener("click", validateCoupon);
