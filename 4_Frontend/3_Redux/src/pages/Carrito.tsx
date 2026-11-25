import {
  disminuirCantidad,
  eliminarProducto,
  incrementarCantidad,
  vaciarCarrito,
} from "../redux/carritoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export function Carrito() {
  const items = useAppSelector((state) => state.carrito.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0,
  );

  if (items.length === 0) {
    return (
      <section className="contenedor">
        <h1>Tu carrito</h1>
        <p>Todavía no has añadido ningún producto</p>
      </section>
    );
  }

  return (
    <section className="contenedor">
      <h1>Tu carrito</h1>
      {items.map((item) => (
        <article className="fila-carrito" key={item.producto.id}>
          <div>
            <h3> {item.producto.nombre} </h3>
            <p> {item.producto.precio.toFixed(2)} € por unidad</p>
          </div>
          <div className="controles">
            <button
              onClick={() => dispatch(disminuirCantidad(item.producto.id))}
            >
              -
            </button>
            <span> {item.cantidad} </span>
            <button
              onClick={() => dispatch(incrementarCantidad(item.producto.id))}
            >
              +
            </button>
            <button
              onClick={() => dispatch(eliminarProducto(item.producto.id))}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
      <h2>Total: {total.toFixed(2)} €</h2>
      <button onClick={() => dispatch(vaciarCarrito())}>Vaciar carrito</button>
    </section>
  );
}
