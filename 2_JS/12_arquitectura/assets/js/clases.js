// CLASE PERSONA
export class Persona {
  // El constructor recibe los datos al crear una persona
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  // Método para saludar
  saludar() {
    return "Hola, soy " + this.nombre;
  }

  // Método para mostrar la edad
  mostrarEdad() {
    return "Tengo " + this.edad + " años";
  }

  // Método para cumplir años
  cumplirAnios() {
    this.edad++;
  }
}

// CLASE COCHE
export class Coche {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  mostrarCoche() {
    return "Mi coche es un " + this.marca + " " + this.modelo;
  }
}

// OBJETO NORMAL (SIN CLASE)
export const entrenador = {
  nombre: "Carlos",
  ciudad: "Madrid",
};
