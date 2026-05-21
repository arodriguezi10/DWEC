// Sample data
var people = [
  { name: "Ana", role: "student", city: "Madrid" },
  { name: "Luis", role: "teacher", city: "Barcelona" },
  { name: "María", role: "student", city: "Sevilla" },
  { name: "Pedro", role: "teacher", city: "Valencia" },
  { name: "Lucía", role: "student", city: "Bilbao" },
  { name: "Josemi", role: "student", city: "Cáceres" },
  { name: "Nacho", role: "student", city: "Badajoz" },
  { name: "Jorge", role: "student", city: "Don Benito" },
  { name: "Jorge", role: "student", city: "Cáceres" },
  { name: "Juan Carlos", role: "student", city: "Cáceres" },
  { name: "Carlos", role: "student", city: "Cáceres" }


];
// Get DOM elements
var searchInput = document.getElementById("searchInput");
var results = document.getElementById("results");
var keyInfo = document.getElementById("keyInfo");

// Function to display results in the list element 
//@filteredPeople: array of person objects to display
function renderList(filteredPeople) {
  //clear previous results
  results.innerHTML = "";
  for (let i = 0; i < filteredPeople.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = filteredPeople[i].name + " - " + filteredPeople[i].role + " - " + filteredPeople[i].city;
    results.appendChild(li);
  }
}

// Function to filter data based on input value 
//@no parameters
function filterData() {
  let text = searchInput.value.toLowerCase();
  // Filter people array
  var filtered = [];
  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    // Search in multiple properties
    if (person.name.toLowerCase().includes(text) ||
    person.role.toLowerCase().includes(text) ||
    person.city.toLowerCase().includes(text)) 
                filtered.push(person);
    
   }
  // Render filtered results to the list element 
  renderList(filtered);
}

// Event: on keyup 
searchInput.addEventListener("keyup", filterData);

// Event: on keydown
searchInput.addEventListener("keydown", function(event) {
  keyInfo.innerHTML = "Key pressed: " + event.key;
});

// Event: while key is pressed (older method)
searchInput.addEventListener("keypress", function(event) {
  console.log("Keypress detected: " + event.key);
});

// Event: when input gains focus
searchInput.addEventListener("focus", function() {
  searchInput.style.backgroundColor = "#eef";
});

// Event: when input loses focus
searchInput.addEventListener("blur", function() {
  searchInput.style.backgroundColor = "";
});

// Show full list on page load
renderList(people);
