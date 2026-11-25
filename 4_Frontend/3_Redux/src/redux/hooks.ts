// hooks.ts: nos proporciona las herramientas para consultar y modificar ese estado desde nuestros componentes.

// React Redux nos proporciona dos hooks:
// useSelector - Consultar información del estado de Redux.
// useDispatch - Enviar acciones para modificar ese estado.
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// crear y exportar un hook llamado useAppDispatch, basado en useDispatch, pero preparado con los tipos de mi aplicación.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// crear y exportar un hook llamado useAppSelector, basado en useSelector, que conoce la estructura de mi estado global
export const useAppSelector = useSelector.withTypes<RootState>();
