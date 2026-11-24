import { useState } from "react";
import { obtenerProductos } from "../services/datos.service";
import { TarjetaProducto } from "./TarjetaProducto";

interface ListaProductosProps {
  onLike: () => void;
}

export function ListaProductos({ onLike }: ListaProductosProps) {
  const productos = obtenerProductos();
  const [soloDestacados, setSoloDestacados] = useState(false);

  //   Decidimos que productos mostrar
  let visibles;

  if (soloDestacados) {
    visibles = productos.filter((producto) => producto.destacado);
  } else {
    visibles = productos;
  }

  //   Cambiamos el filtro cuando el usuario pulsa el boton
  function cambiarFiltro() {
    if (soloDestacados === true) {
      setSoloDestacados(false);
    } else {
      setSoloDestacados(true);
    }
  }

  //   Decidimos que texto mostrar en el boton
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
