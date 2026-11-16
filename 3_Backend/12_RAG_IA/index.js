import express from 'express';
import dotenv from 'dotenv';
import productRouter from './src/routes/product.router.js';

// Carga las variables del archivo .env.
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Permite procesar cuerpos de peticiones en formato JSON.
app.use(express.json());

// Ruta inicial para comprobar que la API funciona.
app.get('/', (req, res) => {
  res.json({ status: 200, message: 'API RAG en funcionamiento' });
});

app.use('/api/productos', productRouter);

// Devuelve errores de JSON y del servidor sin exponer detalles internos.
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  let status = 500;
  let message = 'No se pudo procesar la petición.';

  if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'El cuerpo de la petición debe contener JSON válido.';
  } else if (error.type === 'entity.too.large') {
    status = 413;
    message = 'El cuerpo de la petición es demasiado grande.';
  }

  res.status(status).json({ status, message });
});

// Arranca el servidor en el puerto configurado.
app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});

export default app;
