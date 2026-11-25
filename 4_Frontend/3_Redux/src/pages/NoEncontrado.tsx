import { Link } from "react-router";

export function NoEncontrado() {
  return (
    <section className="contenedor">
      <h1>404</h1>
      <p>Esa página no existe</p>
      <Link to={"/"}>Volver al catálogo</Link>
    </section>
  );
}
