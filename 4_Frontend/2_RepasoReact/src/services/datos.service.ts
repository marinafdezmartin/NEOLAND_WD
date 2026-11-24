export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  destacado: boolean;
}

export function obtenerProductos(): Producto[] {
  return [
    {
      id: 1,
      nombre: "Espresso",
      precio: 1.5,
      destacado: true,
    },
    {
      id: 2,
      nombre: "Capuchino",
      precio: 2.3,
      destacado: false,
    },
    {
      id: 3,
      nombre: "Latte",
      precio: 2.5,
      destacado: true,
    },
    {
      id: 4,
      nombre: "Tarta de queso",
      precio: 3.9,
      destacado: false,
    },
  ];
}

export function formatearPrecio(precio: number): string {
  return precio.toFixed(2) + " €";
}
