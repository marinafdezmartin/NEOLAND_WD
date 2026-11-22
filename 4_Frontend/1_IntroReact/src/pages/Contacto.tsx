import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

export function Contacto() {
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (nombre.trim() === "") {
      return;
    }

    navigate("/gracias", {
      state: { nombre: nombre },
    });
  }

  return (
    <section className="container py-5" style={{ maxWidth: 500 }}>
      <h1>Contacto</h1>

      <form onSubmit={enviar}>
        <input
          className="form-control mb-3"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
        />

        <button className="btn btn-primary" disabled={nombre.trim() === ""}>
          Enviar
        </button>
      </form>
    </section>
  );
}
