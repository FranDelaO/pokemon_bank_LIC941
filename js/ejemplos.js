// ===== Ejemplos de librerías para el Proyecto Pokémon Bank =====

// ---------- 1. SweetAlert ----------
// Ejemplo 1: alerta simple de éxito
document.getElementById("swal1").addEventListener("click", function () {
  swal("¡Depósito exitoso!", "Se depositaron $150.00 a su cuenta.", "success");
});

// Ejemplo 2: alerta de confirmación con botones
document.getElementById("swal2").addEventListener("click", function () {
  swal({
    title: "¿Confirmar retiro?",
    text: "Se retirarán $40.00 de su cuenta.",
    icon: "warning",
    buttons: ["Cancelar", "Sí, retirar"],
    dangerMode: true
  }).then(function (confirmado) {
    if (confirmado) {
      swal("Retiro realizado", "Retire su dinero.", "success");
    } else {
      swal("Operación cancelada");
    }
  });
});

// ---------- 2. Chart.js ----------
const tipos = ["Depósitos", "Retiros", "Servicios", "Consultas"];
const colores = ["#2e9e5b", "#e3350d", "#f08c00", "#2a3d9e"];

// Ejemplo 1: gráfico de barras (cantidad de transacciones)
new Chart(document.getElementById("chart1"), {
  type: "bar",
  data: {
    labels: tipos,
    datasets: [{ label: "Cantidad", data: [1, 2, 2, 1], backgroundColor: colores }]
  },
  options: { plugins: { legend: { display: false } } }
});

// Ejemplo 2: gráfico de dona (montos por tipo)
new Chart(document.getElementById("chart2"), {
  type: "doughnut",
  data: {
    labels: ["Depósitos", "Retiros", "Servicios"],
    datasets: [{ data: [150, 90, 60], backgroundColor: colores.slice(0, 3) }]
  }
});

// ---------- 3. jsPDF ----------
const { jsPDF } = window.jspdf;

// Ejemplo 1: comprobante de una transacción
document.getElementById("pdf1").addEventListener("click", function () {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Pokémon Bank - Comprobante", 20, 20);
  doc.setFontSize(12);
  doc.text("Titular: Juan Pérez", 20, 35);
  doc.text("Cuenta: 0987-6543-2100", 20, 43);
  doc.text("Transacción: Depósito", 20, 51);
  doc.text("Monto: $150.00", 20, 59);
  doc.text("Fecha: " + new Date().toLocaleString(), 20, 67);
  doc.save("comprobante.pdf");
});

// Ejemplo 2: historial recorriendo un arreglo
document.getElementById("pdf2").addEventListener("click", function () {
  const historial = [
    { tipo: "Depósito", monto: 150 },
    { tipo: "Retiro", monto: -40 },
    { tipo: "Pago energía", monto: -32.5 },
    { tipo: "Pago internet", monto: -27.5 },
    { tipo: "Retiro", monto: -50 }
  ];
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Historial de transacciones", 20, 20);
  doc.setFontSize(12);
  let y = 35;
  historial.forEach(function (t, i) {
    doc.text((i + 1) + ". " + t.tipo, 20, y);
    doc.text("$" + t.monto.toFixed(2), 150, y);
    y += 8;
  });
  doc.save("historial.pdf");
});

// ---------- 4. Validate.js ----------
function mostrarResultado(idElemento, errores) {
  const el = document.getElementById(idElemento);
  if (errores) {
    el.className = "form-text text-danger";
    el.textContent = errores[0];
  } else {
    el.className = "form-text text-success";
    el.textContent = "Dato válido ✔";
  }
}

// Ejemplo 1: PIN de 4 dígitos numéricos
document.getElementById("btnValPin").addEventListener("click", function () {
  const valor = document.getElementById("valPin").value;
  const errores = validate.single(valor, {
    presence: { allowEmpty: false, message: "^El PIN es obligatorio" },
    format: { pattern: "^[0-9]{4}$", message: "^El PIN debe tener 4 dígitos" }
  });
  mostrarResultado("resPin", errores);
});

// Ejemplo 2: monto numérico entre 0 y 500
document.getElementById("btnValMonto").addEventListener("click", function () {
  const valor = document.getElementById("valMonto").value;
  const errores = validate.single(valor === "" ? null : Number(valor), {
    presence: { message: "^Ingrese un monto" },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 500,
      notValid: "^Debe ser un número",
      notGreaterThan: "^Debe ser mayor a $0",
      notLessThanOrEqualTo: "^El máximo es $500"
    }
  });
  mostrarResultado("resMonto", errores);
});
