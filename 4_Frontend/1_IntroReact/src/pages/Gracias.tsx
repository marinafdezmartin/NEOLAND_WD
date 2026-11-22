import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function Gracias() {
  const location = useLocation();
  const navigate = useNavigate();

  const nombre = location.state?.nombre;

  useEffect(() => {
    if (!nombre) {
      navigate("/contacto", { replace: true });
    }
  }, [nombre, navigate]);

  if (!nombre) {
    return null;
  }

  return (
    <section className="container py-5 text-center">
      <h1>¡Gracias, {nombre}!</h1>
      <p>Te contestaremos muy pronto.</p>
    </section>
  );
}
