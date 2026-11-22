import { formatearPrecio, type Producto } from "../services/datos.service";

interface TarjetaProductoProps {
  producto: Producto;
  onLike: () => void;
}

export function TarjetaProducto({ producto, onLike }: TarjetaProductoProps) {
  // Comprobamos si el producto es destacado
  let etiquetaDestacado = null;

  if (producto.destacado) {
    etiquetaDestacado = (
      <span className="badge bg-warning text-dark">Destacado</span>
    );
  }

  return (
    <div className="col-md-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>

          <p className="card-text">{formatearPrecio(producto.precio)}</p>

          {etiquetaDestacado}

          <div className="mt-3">
            <button className="btn btn-sm btn-outline-danger" onClick={onLike}>
              ❤️ Me gusta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
