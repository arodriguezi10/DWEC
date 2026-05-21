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

    // DOM elements
    var searchInput = document.getElementById("searchInput");
    var results = document.getElementById("results");
    var keyInfo = document.getElementById("keyInfo");
    var counter = document.getElementById("counter");

    // Log pointer events in console
    function logPointerEvent(event, action) {
      console.log(`${action}: ${event.type}, pointerType: ${event.pointerType}, x:${event.clientX}, y:${event.clientY}`);
    }

    // Add pointer event listeners to list item 
    //@li: list item element
    //@person: person object
    function addPointerEvents(li, person) {
   //li tiene solo texto, no el objeto persona
 //Si solo pasáramos li al listener, no tendríamos acceso directo a person.name, porque no guardamos el objeto en el DOM.
  // Por eso pasamos person como parámetro para usarlo dentro del listener.
  
  // Hover para mouse (no se verá en touch) 
  li.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") li.style.backgroundColor = "green";
    logPointerEvent(e, "pointerenter");
  });

  li.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") li.style.backgroundColor = "grey";
    logPointerEvent(e, "pointerleave");
  });

  // Touch / click / pen
  li.addEventListener("pointerdown", (e) => {
    li.style.backgroundColor = "yellow"; // visible en touch y mouse
    console.log("Selected: " + person.name);
    logPointerEvent(e, "pointerdown");
  });

  li.addEventListener("pointerup", (e) => {
    li.style.backgroundColor = "green"; // feedback de levantamiento del dedo
    logPointerEvent(e, "pointerup");

    // Opcional: volver al color original después de un pequeño retraso
    setTimeout(() => {
      li.style.backgroundColor = "";
    }, 300);
  });


  // PointerCancel el navegador o el sistema operativo deciden interrumpir el seguimiento del puntero
  li.addEventListener("pointercancel", (e) => {
    li.style.backgroundColor = "red";
    // feedback de cancelación (por ejemplo, el sistema cancela el touch)
    //Si el navegador interpreta que estás intentando "arrastrar" un elemento (como una imagen o texto seleccionado),
    //cancelará el seguimiento del puntero para iniciar la operación de arrastre
    logPointerEvent(e, "pointercancel");
  });

  // Siempre log de movimiento y otros eventos
  li.addEventListener("pointermove", (e) => logPointerEvent(e, "pointermove"));
  li.addEventListener("pointerover", (e) => logPointerEvent(e, "pointerover"));
  li.addEventListener("pointerout", (e) => logPointerEvent(e, "pointerout"));
}


    // Render list
    function renderList(filteredPeople, text = "") {
      results.innerHTML = "";
      counter.innerHTML = `Results: ${filteredPeople.length}`;

      for (let i = 0; i < filteredPeople.length; i++) {
        let li = document.createElement("li");

        let content = `${filteredPeople[i].name} - ${filteredPeople[i].role} - ${filteredPeople[i].city}`;
        

        li.innerHTML = content;

        // Add pointer events 
        //@li: list item element
        //@filteredPeople[i]: person object
        addPointerEvents(li, filteredPeople[i]);

        results.appendChild(li);
      }
    }

    // Filter data
    function filterData() {
      let text = searchInput.value.toLowerCase();
      var filtered = people.filter(person =>
        person.name.toLowerCase().includes(text) ||
        person.role.toLowerCase().includes(text) ||
        person.city.toLowerCase().includes(text)
      );

      renderList(filtered, text);
    }

    // Keyboard events
    searchInput.addEventListener("keyup", filterData);

       // Initial render
    renderList(people);
  