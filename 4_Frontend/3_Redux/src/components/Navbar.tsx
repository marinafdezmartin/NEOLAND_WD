import { Link } from "react-router";
import { useAppSelector } from "../redux/hooks";

export function Navbar() {
  // Quiero crear una constante llamada items.
  // Para obtener su valor, voy a consultar el estado global de Redux.
  // Dentro de ese estado, quiero acceder a la sección carrito y obtener su propiedad items
  const items = useAppSelector((state) => state.carrito.items);

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <nav className="barra">
      <Link to="/">Mi tienda</Link>
      <div className="enlaces">
        <Link to={"/"}>Catálogo</Link>
        <Link to={"/carrito"}>Carrito ({cantidadTotal}) </Link>
      </div>
    </nav>
  );
}
