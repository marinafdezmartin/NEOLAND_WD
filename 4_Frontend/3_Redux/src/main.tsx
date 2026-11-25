// main.tsx - Se encarga de poner en marcha y configurar nuestra aplicación

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

// React, prepara el elemento HTML llamado root para mostrar dentro de él mi aplicación y muestra los componentes React que voy a escribir dentro de los paréntesis
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provider - Quiero que todos los componentes que están dentro puedan acceder a esta store de Redux. */}
    <Provider store={store}>
      {/* BrowserRouter - Quiero que todos los componentes que estén dentro puedan utilizar las herramientas de navegación de React Router */}
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
