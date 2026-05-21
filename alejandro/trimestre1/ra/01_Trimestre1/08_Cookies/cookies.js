// ================= COOKIE FUNCTIONS =================

// Function to create or update a cookie
// name: cookie name, value: cookie value, days: expiration in days
function setCookie(name, value, days, age) {
  // Create a new Date object representing the current time
  const d = new Date();
  // Set the time of the cookie to now + (days * 24h * 60m * 60s * 1000ms)
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  // Assign the cookie with name, value, expiration date, and path
  // path=/ ensures the cookie is available across the entire site
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;

}

// Function to read a specific cookie by name
function getCookie(name) {
  // Split all cookies into an array of "key=value" strings
  const cookies = document.cookie.split('; ');
  // Iterate through all cookies
  for (const cookie of cookies) {
    // Split each cookie into key and value
    const [key, value] = cookie.split('=');
    // If the cookie name matches the one we are looking for, return its value
    if (key === name) return value;
  }
  // If the cookie is not found, return null
  return null;
}

// Function to display all cookies in the page
function showAllCookies() {
  // document.cookie returns all cookies in "key=value; key2=value2" format
  document.getElementById('cookieRead').textContent = `All cookies: ${document.cookie}`;
}

// Function to display a specific cookie on the page
function showCookie(name) {
  // Use getCookie to get the value
  const value = getCookie(name);
  // If the cookie exists, show "name=value", else indicate it's not found
  document.getElementById('cookieRead').textContent = value 
    ? `${name}=${value}` 
    : `Cookie "${name}" not found`;
}

// Function to delete a cookie
function deleteCookie(name) {
  // To delete a cookie, set its expiration date to a date in the past
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  // Update page to indicate deletion
  document.getElementById('cookieDelete').textContent = `Cookie "${name}" deleted`;
}


// ================= EVENT LISTENERS =================

// Add event listeners to buttons to make the page interactive

/*
    <button id="btnupdateCookie">Update Cookie 'username'</button>
    <button id="createCookieEdad">Create Cookie 'age'</button>
    <button id="updateCookieEdad">Update Cookie 'age'</button>
    <div id="DivcookieCreate" class="output"></div>
    <div id="DivcookieCreateEdad" class="output"></div>
*/



// Create / Update cookie buttons
document.getElementById('btncreateCookie').addEventListener('click', () => {
  setCookie('username', 'JohnDoe', 7); // Create 'username' cookie valid for 7 days
  document.getElementById('DivcookieCreate').textContent = `Cookie "username" set to "JohnDoe"`;
});

document.getElementById('btnupdateCookie').addEventListener('click', () => {
  setCookie('username', 'JaneDoe', 7); // Update 'username' cookie value
  document.getElementById('DivcookieCreate').textContent = `Cookie "username" updated to "JaneDoe"`;
});


document.getElementById('createCookieEdad').addEventListener('click', () => {
  setCookie('age', '30', 7); // Create 'age' cookie valid for 7 days
  document.getElementById('DivcookieCreateEdad').textContent = `Cookie "age" set to "30"`;
});

document.getElementById('updateCookieEdad').addEventListener('click', () => {
  setCookie('age', '1', 7); // Update 'age' cookie value
  document.getElementById('DivcookieCreateEdad').textContent = `Cookie "age" updated to "1"`;
});



// Read cookie buttons
document.getElementById('showAllCookies').addEventListener('click', showAllCookies); // Show all cookies
document.getElementById('showCookie').addEventListener('click', () => showCookie('username')); // Show specific cookie
document.getElementById('showCookieEdad').addEventListener('click', () => showCookie('age')); // Show specific cookie

// Delete cookie button
document.getElementById('deleteCookie').addEventListener('click', () => deleteCookie('username')); // Delete the cookie
document.getElementById('deleteCookieEdad').addEventListener('click', () => deleteCookie('age')); // Delete the cookie edad

// ================= NOTES =================
// 1. Cookies are small pieces of data stored in the browser.
// 2. Cookies can persist across sessions depending on the expiration date.
// 3. Cookies are sent to the server with each HTTP request for the domain/path.
// 4. Use encodeURIComponent/decodeURIComponent if cookie values may contain special characters.

