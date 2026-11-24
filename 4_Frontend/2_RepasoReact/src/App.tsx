import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);

  function sumarLike() {
    setTotalLikes((totalAnterior) => totalAnterior + 1);
  }
  return (
    <>
      <Navbar totalLikes={totalLikes}></Navbar>
      <main>
        <Outlet context={{ sumarLike }}></Outlet>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        © 2026 Mi Cafetería
      </footer>
    </>
  );
}

export default App;
