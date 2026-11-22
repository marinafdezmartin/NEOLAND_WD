import { useOutletContext } from "react-router";
import { Hero } from "../components/Hero";
import { ListaProductos } from "../components/ListaProductos";

export function Inicio() {
  const { sumarLike } = useOutletContext<{
    sumarLike: () => void;
  }>();

  return (
    <>
      <Hero
        titulo="El mejor café de la ciudad"
        subtitulo="Tostado aquí, cada mañana"
        textoBoton="Contacta con nosotros"
      />

      <ListaProductos onLike={sumarLike} />
    </>
  );
}
