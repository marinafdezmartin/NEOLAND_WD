// store.ts: crea el almacén central que contiene el estado del carrito

import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./carritoSlice";

// En mi estado global tengo una sección llamada carrito, y sus cambios los gestiona carritoReducer
export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
  },
});

// RootState - representa la estructura completa del estado global de Redux
// En vez de escribir esa estructura manualmente, quiero que TypeScript la deduzca a partir de lo que devuelve store.getState()
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch - describe la función dispatch de mi store
// dispatch - sirve para enviar acciones a Redux
export type AppDispatch = typeof store.dispatch;
