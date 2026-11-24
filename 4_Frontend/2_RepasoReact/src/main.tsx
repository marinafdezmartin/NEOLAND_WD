import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { Inicio } from "./pages/Inicio";
import { Nosotros } from "./pages/Nosotros";
import { NoEncontrado } from "./pages/NoEncontrado";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { Contacto } from "./pages/Contacto";
import { Gracias } from "./pages/Gracias";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Inicio,
      },
      {
        path: "/nosotros",
        Component: Nosotros,
      },
      {
        path: "/contacto",
        Component: Contacto,
      },
      {
        path: "/gracias",
        Component: Gracias,
      },
      {
        path: "*",
        Component: NoEncontrado,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
