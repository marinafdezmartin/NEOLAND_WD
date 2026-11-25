export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

export const productos: Producto[] = [
  { id: 1, nombre: "Café de especialidad", precio: 8.5, categoria: "Café" },
  { id: 2, nombre: "Té verde", precio: 5.2, categoria: "Té" },
  { id: 3, nombre: "Taza de cerámica", precio: 12, categoria: "Accesorios" },
  { id: 4, nombre: "Cafetera italiana", precio: 24.9, categoria: "Accesorios" },
  { id: 5, nombre: "Galletas artesanas", precio: 4.5, categoria: "Dulces" },
  { id: 6, nombre: "Chocolate negro", precio: 6.8, categoria: "Dulces" },
];
