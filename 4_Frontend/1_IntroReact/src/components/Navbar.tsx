import { Link } from "react-router";

interface NavbarProps {
  totalLikes: number;
}

export function Navbar({ totalLikes }: NavbarProps) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Mi Cafetería
      </Link>

      <div className="d-flex gap-3">
        <Link className="nav-link text-white" to="/">
          Inicio
        </Link>

        <Link className="nav-link text-white" to="/nosotros">
          Nosotros
        </Link>

        <Link className="nav-link text-white" to="/contacto">
          Contacto
        </Link>
      </div>

      <span className="text-white">❤️ {totalLikes}</span>
    </nav>
  );
}
