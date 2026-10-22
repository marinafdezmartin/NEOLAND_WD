// EJERCICIO 10
// Funcion ayudante: NO se exporta
function formatearNombre(nombre) {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

// Funcion principal: SI se exporta
export function saludar(nombre) {
  const nombreFormateado = formatearNombre(nombre);

  return `¡Hola, ${nombreFormateado}!`;
}