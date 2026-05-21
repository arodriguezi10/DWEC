función calcular() {
  entradas constantes = [
    document.getElementById("op1"),
    document.getElementById("op2")
  ];

  deje valores = [];
  para (dejar entrada de entradas) {
    if (input.value.trim() === "") {
      alert("Todos los campos deben completarse.");
      retorno;
    }
    si (isNaN(entrada.valor)) {
      alert("Todos los campos deben ser números".);
      retorno;
    }
    values.push(parseFloat(input.value));
  }

  // Recoger operación³n como en tu versión³n original
  const form = document.getElementById("calcForm");
  let operación = form.elements["operación"].valor;

  deje resultado;
  cambiar (operación) {
    caso "agregar":
      resultado = valores[0] + valores[1];
      romper; romper
    caso "restar":
      resultado = valores[0] - valores[1];
      romper; romper
    caso "multiplicar":
      resultado = valores[0] * valores[1];
      romper; romper
    caso "dividir":
      si (valores[1] === 0) {
        alert("¡No se puede dividir por cero!");
        retorno;
      }
      resultado = valores[0] / valores[1];
      romper; romper
    predeterminado:
      alert("No se seleccionó ninguna operación".);
      retorno;
  }

  alert("Resultado: " + resultado);
}