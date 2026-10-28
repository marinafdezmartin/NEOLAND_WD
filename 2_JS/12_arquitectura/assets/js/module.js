// IMPORTAR CLASES Y OBJETOS
import { Persona, Coche, entrenador } from "./clases.js";

// EJEMPLO 1: PERSONAS

// Crear objetos utilizando new
const persona1 = new Persona("Marina", 27);
const persona2 = new Persona("Laura", 30);

// Acceder a propiedades
console.log(persona1.nombre);
console.log(persona2.edad);

// Ejecutar métodos
console.log(persona1.saludar());
console.log(persona2.saludar());

console.log(persona1.mostrarEdad());

// Modificar una propiedad mediante un método
persona1.cumplirAnios();

console.log(persona1.mostrarEdad());

// EJEMPLO 2: COCHES

// Crear dos coches
const coche1 = new Coche("BMW", "Serie 1");
const coche2 = new Coche("Audi", "A3");

// Acceder a propiedades
console.log(coche1.marca);
console.log(coche2.modelo);

// Ejecutar métodos
console.log(coche1.mostrarCoche());
console.log(coche2.mostrarCoche());

// EJEMPLO 3: OBJETO NORMAL

// No utilizamos new porque ya es un objeto
console.log(entrenador.nombre);
console.log(entrenador.ciudad);
