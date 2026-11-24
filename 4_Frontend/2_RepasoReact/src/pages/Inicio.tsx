import { useOutletContext } from "react-router";
import { Hero } from "../components/Hero";
import { ListaProductos } from "../components/ListaProductos";

export function Inicio() {
  const { sumarLike } = useOutletContext<{ sumarLike: () => void }>();

  return (
    <>
      <Hero
        titulo={"El mejor café de la ciudad"}
        subtitulo={"Tostado aqui, cada mañana"}
        textoBoton="Contacta con nosotros"
      ></Hero>
      <ListaProductos onLike={sumarLike}></ListaProductos>
    </>
  );
}
