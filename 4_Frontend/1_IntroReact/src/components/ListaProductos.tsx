import { useState } from "react";
import { obtenerProductos } from "../services/datos.service";
import { TarjetaProducto } from "./TarjetaProducto";

interface ListaProductosProps {
  onLike: () => void;
}

export function ListaProductos({ onLike }: ListaProductosProps) {
  const [soloDestacados, setSoloDestacados] = useState(false);

  const productos = obtenerProductos();

  // Filtramos los productos según el estado
  let visibles;

  if (soloDestacados) {
    visibles = productos.filter((producto) => producto.destacado);
  } else {
    visibles = productos;
  }

  // Cambiamos el estado al pulsar el botón
  function cambiarFiltro() {
    if (soloDestacados === true) {
      setSoloDestacados(false);
    } else {
      setSoloDestacados(true);
    }
  }

  // Cambiamos el texto del botón
  let textoBoton;

  if (soloDestacados) {
    textoBoton = "Ver todos";
  } else {
    textoBoton = "Ver solo destacados";
  }

  return (
    <section className="container py-4">
      <h2 className="mb-3">Nuestra carta</h2>

      <button className="btn btn-outline-dark mb-3" onClick={cambiarFiltro}>
        {textoBoton}
      </button>

      <div className="row g-3">
        {visibles.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            onLike={onLike}
          />
        ))}
      </div>
    </section>
  );
}
