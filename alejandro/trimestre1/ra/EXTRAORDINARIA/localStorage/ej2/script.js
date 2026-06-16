const inputNota = document.getElementById("inputNota");
const btnGuardarNota = document.getElementById("btnGuardarNota");
const listaNotas = document.getElementById("listaNotas");

btnGuardarNota.addEventListener("click", guardarLocal);

let misNotas = JSON.parse(localStorage.getItem("misNotas")) || [];

function guardarLocal() {
  const nota = inputNota.value.trim();

  if (nota === "") return;

  misNotas.push(nota);

  localStorage.setItem("misNotas", JSON.stringify(misNotas));

  inputNota.value = "";

  renderizarNotas();
}

function renderizarNotas() {
  let html = "";

  misNotas.forEach((notas) => {
    html += `
            <li>${notas}</li>
        `;
  });

  listaNotas.innerHTML = html;
}

renderizarNotas();
