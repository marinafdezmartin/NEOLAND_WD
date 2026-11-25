import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Catalogo } from "./pages/Catalogo";
import { Carrito } from "./pages/Carrito";
import { NoEncontrado } from "./pages/NoEncontrado";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </>
  );
}
