import type { Producto } from "../data/productos";

interface TarjetaProductoProps {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export function TarjetaProducto({ producto, onAgregar }: TarjetaProductoProps) {
  return (
    <article className="tarjeta">
      <p className="categoria"> {producto.categoria} </p>
      <h3> {producto.nombre} </h3>
      <p> {producto.precio.toFixed(2)} €</p>

      <button onClick={() => onAgregar(producto)}>Añadir al carrito</button>
    </article>
  );
}
