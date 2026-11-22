import { useNavigate } from "react-router";

interface HeroProps {
  titulo: string;
  subtitulo: string;
  textoBoton?: string;
}

export function Hero({
  titulo,
  subtitulo,
  textoBoton = "Saber más",
}: HeroProps) {
  const navigate = useNavigate();

  function irAContacto() {
    navigate("/contacto");
  }

  return (
    <section className="hero-section">
      <div className="container">
        <p className="hero-eyebrow">Café de especialidad · Desde 1999</p>

        <h1 className="hero-title">{titulo}</h1>

        <p className="hero-subtitle">{subtitulo}</p>

        <button className="btn btn-coffee" onClick={irAContacto}>
          {textoBoton}
        </button>
      </div>
    </section>
  );
}
