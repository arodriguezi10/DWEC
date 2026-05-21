// -----------------------------
// IMPORT MODULES
// -----------------------------
// Import Express framework and CORS middleware
const express = require("express");
// CORS is used to allow cross-origin requests
const cors = require("cors");

// -----------------------------
// CREATE EXPRESS APP
// -----------------------------
const app = express();

// Enable CORS so the frontend can connect
app.use(cors());

// Enable JSON parsing in request bodies
app.use(express.json());

// -----------------------------
// DATABASE SIMULATION
// -----------------------------

// Users list
const users = [
    { username: "alumno", password: "agora" },
    { username: "admin", password: "1234" }
];

// Coupons list
const coupons = [
    { code: "DISCOUNT10", discount: 10 },
    { code: "CHRISTMAS20", discount: 20 },
    { code: "BLACKFRIDAY30", discount: 30 }
];

// -----------------------------
// LOGIN ENDPOINT
// -----------------------------
// Handle POST requests to /login
app.post("/login", (req, res) => {

    // Get username and password from request body
    const { username, password } = req.body;

  // Check if the user exists in the list
    let validUser = null;

    for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                validUser = users[i];
                break; // stop the loop once we find the user
            }
        }

    if (validUser) 
        res.json({ ok: true });
     else 
        res.json({ ok: false, message: "Incorrect username or password" });
    
});

// -----------------------------
// COUPON VALIDATION ENDPOINT
// -----------------------------
app.get("/coupon/:code", (req, res) => {

    // Get the coupon code from URL and make it uppercase
    const code = req.params.code.toUpperCase();

    // Check if the coupon exists in the list
    let couponFound  = null;

    for (let i = 0; i < coupons.length; i++) {
        if (coupons[i].code === code) {
            couponFound = coupons[i];
            break; // stop the loop once we find the coupon
        }
    }

    if (couponFound) {
        res.json({ valid: true, discount: couponFound.discount });
    } else {
        res.json({ valid: false });
    }
});

// -----------------------------
// START SERVER
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
