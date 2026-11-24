import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

export function Contacto() {
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  function enviar(evento: SubmitEvent<HTMLFormElement>) {
    // preventDefault() - evita que el navegador recargue la página al enviar
    evento.preventDefault();

    if (nombre.trim() === "") {
      return;
    }

    navigate("/gracias", {
      // state: { nombre: nombre } - lleva un dato a la página de destino
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
          // onChange - se ejecuta cuando cambia el campo
          // evento.target.value - es el texto actual del input
          // setNombre(...) guarda ese texto en React
          onChange={(evento) => setNombre(evento.target.value)}
        />

        <button className="btn btn-primary" disabled={nombre.trim() === ""}>
          Enviar
        </button>
      </form>
    </section>
  );
}
