const inputConcepto = document.getElementById("inputConcepto");
const inputImporte = document.getElementById("inputImporte");
const btnAñadirGasto = document.getElementById("btnAñadirGasto");
const listaGastos = document.getElementById("listaGastos");

const gastos = JSON.parse(localStorage.getItem("misGastos")) || [];

btnAñadirGasto.addEventListener("click", añadirGasto);

function añadirGasto() {
  const concepto = inputConcepto.value.trim();
  const importe = inputImporte.value.trim();

  if (concepto === "" || importe === "") return;

  const nuevoGasto = {
    concepto: concepto,
    importe: importe,
  };

  gastos.push(nuevoGasto);

  localStorage.setItem("misGastos", JSON.stringify(gastos));

  inputConcepto.value = "";
  inputImporte.value = "";

  renderizarGastos();
}

function renderizarGastos() {
  let html = "";

  gastos.forEach((g) => {
    html += `
            <li>${g.concepto} = ${g.importe}</li>
        `;
  });

  listaGastos.innerHTML = html;
}

renderizarGastos();