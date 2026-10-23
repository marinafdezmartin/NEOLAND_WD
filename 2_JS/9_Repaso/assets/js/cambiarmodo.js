// EJERCICIO 4
let modoOscuro = false;

export function cambiarModo() {
  const cuerpo = document.getElementById("cuerpo");

  if (modoOscuro === false) {
    cuerpo.style.backgroundColor = "#1f1f1f";
    cuerpo.style.color = "#f8fafd";

    modoOscuro = true;
  } else {
    cuerpo.style.backgroundColor = "#f8fafd";
    cuerpo.style.color = "#1f1f1f";

    modoOscuro = false;
  }
}
