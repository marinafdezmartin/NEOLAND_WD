import express from 'express';
import dotenv from 'dotenv';

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

// Arranca el servidor en el puerto configurado.
app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});

export default app;
