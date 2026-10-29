// DATOS DE EJEMPLO

// Simulamos una pequeña base de datos de productos.
// Cada producto es un objeto dentro de un array.

const productos = [
  {
    id: 1,
    nombre: "Auriculares Bluetooth",
    precio: 39.99,
    stock: 8,
  },
  {
    id: 2,
    nombre: "Teclado mecánico",
    precio: 69.99,
    stock: 0,
  },
  {
    id: 3,
    nombre: "Ratón inalámbrico",
    precio: 24.99,
    stock: 15,
  },
];

// CONSULTAR DISPONIBILIDAD DE UN PRODUCTO

// Exportamos la función para poder utilizarla
// desde otro archivo mediante import.

// No necesitamos async porque devolveremos
// manualmente una Promise.

export function consultarStock(idProducto) {
  // Creamos una promesa.
  // resolve: la operación termina correctamente.
  // reject: la operación termina con un error.

  return new Promise((resolve, reject) => {
    // Simulamos que el servidor tarda 1,5 segundos
    // en consultar los datos y responder.

    setTimeout(() => {
      // Buscamos el producto cuyo id coincida
      // con el que hemos recibido como argumento.

      const producto = productos.find((item) => item.id === idProducto);

      // CASO 1: El producto no existe.

      if (!producto) {
        reject(new Error("El producto no existe"));
        return;
      }

      // CASO 2: El producto existe, pero está agotado.

      if (producto.stock === 0) {
        reject(new Error("El producto está agotado"));
        return;
      }

      // CASO 3: El producto existe y tiene stock.
      // Resolvemos la promesa devolviendo sus datos.

      resolve(producto);
    }, 1500);
  });
}
