// carritoSlice.ts: define qué operaciones podemos realizar sobre el carrito.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Producto } from "../data/productos";

// Un producto guardado en el carrito, junto con su cantidad.
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CarritoState {
  items: ItemCarrito[];
}

// Representa cómo empieza el carrito (vacío)
const initialState: CarritoState = {
  items: [],
};

// crear una parte del estado llamada carrito
// Su estado inicial será el que acabamos de definir
// Y dentro de reducers voy a escribir todas las operaciones que permito realizar sobre el carrito
const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  // funciones encargadas de modificar el estado
  reducers: {
    // state: es el carrito tal y como está ahora mismo.
    // action: es la acción que se ha enviado a Redux, incluyendo la información necesaria para ejecutarla.
    agregarProducto(state, action: PayloadAction<Producto>) {
      // Voy a guardar en una variable el producto que venía dentro de la acción
      const productoRecibido = action.payload;

      // Busca dentro de los productos que ya hay en el carrito uno cuyo ID coincida con el ID del producto que acabamos de recibir.
      // Si lo encuentras, guárdalo en la variable existente
      const existente = state.items.find(
        (item) => item.producto.id === productoRecibido.id,
      );

      if (existente) {
        existente.cantidad += 1;
      } else {
        state.items.push({
          producto: productoRecibido,
          cantidad: 1,
        });
      }
    },

    incrementarCantidad(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items.find((item) => item.producto.id === id);

      if (item) {
        item.cantidad += 1;
      }
    },

    disminuirCantidad(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items.find((item) => item.producto.id === id);

      if (item) {
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          // Crea una nueva lista con todos los productos cuyo ID sea diferente del ID que quiero quitar
          state.items = state.items.filter(
            (producto) => producto.producto.id !== id,
          );
        }
      }
    },

    eliminarProducto(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.producto.id !== id);
    },

    vaciarCarrito(state) {
      state.items = [];
    },
  },
});

export const {
  agregarProducto,
  incrementarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito,
} = carritoSlice.actions;

export default carritoSlice.reducer;
