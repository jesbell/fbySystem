import { fileURLToPath } from 'url'; // función para convertir URL de archivo a ruta de sistema de archivos
import { dirname } from 'path'; // funciones para manejo de rutas de archivos y directorios
import agentes from "./data/agentes.js";
import express from "express";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const secretKey = "Mi Llave Ultra Secreta";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});