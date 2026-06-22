const inputInvitado = document.getElementById("inputInvitado");
const btnAnadir = document.getElementById("btnAnadir");
const listaInvitados = document.getElementById("listaInvitados");

btnAnadir.addEventListener("click", añadirInvitado);

const invitados = JSON.parse(localStorage.getItem("invitados")) || [];

function añadirInvitado() {
  const nombreInvitado = inputInvitado.value.trim();

  if (nombreInvitado === "") return;

  invitados.push(nombreInvitado);

  localStorage.setItem("invitados", JSON.stringify(invitados));

  inputInvitado.value = "";

  renderizarInvitados();
}

function renderizarInvitados() {
  let html = "";

  invitados.forEach((i, index) => {
    html += `
            <li>
                ${i} 
                <button class="btn-borrar" onclick="borraInvitado(${index})">Delete</button>
            </li>
        `;
  });

  listaInvitados.innerHTML = html;
}

function borraInvitado(index) {
  invitados.splice(index, 1);

  localStorage.setItem("invitados", JSON.stringify(invitados));

  renderizarInvitados();
}

renderizarInvitados();
