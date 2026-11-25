import { TarjetaProducto } from "../components/TarjetaProducto";
import { productos, type Producto } from "../data/productos";
import { agregarProducto } from "../redux/carritoSlice";
import { useAppDispatch } from "../redux/hooks";

export function Catalogo() {
  const dispatch = useAppDispatch();

  function agregarAlCarrito(producto: Producto) {
    dispatch(agregarProducto(producto));
  }

  return (
    <section className="contenedor">
      <h1>Catálogo</h1>
      <p>Elige tus productos favoritos</p>
      <div className="cuadricula">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          ></TarjetaProducto>
        ))}
      </div>
    </section>
  );
}
