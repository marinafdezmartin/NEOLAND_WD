class Computadora {
  marca = "Asus";
}

class Telefono {
  numero = "";
  llamar() {
    // return "Ring ring!";
    return `Llamando al ${this.numero}`;
  }
}

const miCompu = new Computadora();
miCompu.marca = "MSI";
console.log(miCompu.marca);

class Libro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
  }

  leerLibro(nombreLector) {
    return `Hola ${nombreLector}, estás leyendo ${this.titulo}`;
  }
}

const miLibro = new Libro("Harry Potter", "J.K. Rowling");

console.log(miLibro.leerLibro("Marina"));

class Vehiculo {
  arrancar() {
    return "Brum brum";
  }
}

class Moto extends Vehiculo {}

const miMoto = new Moto();
console.log(miMoto.arrancar());

class Bicicleta extends Vehiculo {
  arrancar() {
    return "No tengo motor, pedalea!";
  }
}

class BicicletaElectrica extends Bicicleta {}

class Piloto {
  conducir(maquina) {
    return `Estoy conduciendo y hace ${maquina.arrancar()}`;
  }
}

const miPiloto = new Piloto();
console.log(miPiloto.conducir(miMoto));

const elementos = [new Vehiculo(), new Moto(), new Bicicleta()];
for (const elemento of elementos) {
  console.log(elemento.arrancar());
}

// BLOQUE 2
// nivel 1
class Fruta {
  nombre = "Manzana";
}

class Calculadora {
  sumar() {
    return 5;
  }
}

const miFruta = new Fruta();
console.log(miFruta.nombre);

const miCalculadora = new Calculadora();
console.log(miCalculadora.sumar());

// nivel 2
class Estudiante {
  constructor(nombre, curso) {
    this.nombre = nombre;
    this.curso = curso;
  }
  presentarse() {
    return `Hola, me llamo ${this.nombre}, y estoy cursando ${this.curso}`;
  }
}

const estudiante1 = new Estudiante("Ana", "Matemáticas");
const estudiante2 = new Estudiante("Luis", "Historia");

console.log(estudiante1.presentarse());
console.log(estudiante2.presentarse());

class Animal {
  moverse() {
    return "Caminando";
  }
}

class Pajaro extends Animal {
  moverse() {
    return "Volando";
  }
}

const miPajaro = new Pajaro();
console.log(miPajaro.moverse());

// nivel 3
class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(cantidad) {
    this.saldo = cantidad + this.saldo;
    return this.saldo;
  }
}

const miCuentaBancaria = new CuentaBancaria("Marina", 200);
console.log(miCuentaBancaria.depositar(200));

class Guerrero {
  atacar() {
    return "Espadazo";
  }
}

class Mago {
  atacar() {
    return "Bola de fuego";
  }
}

class Batalla {
  iniciarPelea(luchador1, luchador2) {
    return `El primer luchador atacó con ${luchador1.atacar()} y el segundo respondió con ${luchador2.atacar()}`;
  }
}

const miGuerrero = new Guerrero();
const miMago = new Mago();
const miBatalla = new Batalla();

console.log(miBatalla.iniciarPelea(miGuerrero, miMago));

class Abuelo {
  dinero = 1000;
}

class Padre extends Abuelo {
  dinero = 500;
}

class Hijo extends Padre {
  gastar() {
    return this.dinero;
  }
}

const miHijo = new Hijo();
console.log(miHijo.gastar());

const luchadores = [
  new Guerrero(),
  new Guerrero(),
  new Guerrero(),
  new Mago(),
  new Mago(),
];

const ataques = luchadores.map((luchador) => {
  return luchador.atacar();
});

console.log(ataques);

// nivel 4
