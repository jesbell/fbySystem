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

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req,res) => {
    const { email, password } = req.body;
    
    const agente = agentes.find((a) => a.email === email && a.password === password);

    if(agente){
        const token = jwt.sign({ data: agente }, secretKey, { expiresIn: "2m" });
        res.send(`
        <a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>
        Bienvenido, ${email}.
        <script>
            localStorage.setItem('token', '${token}')
        </script>
    `);

    }else{
        res.status(401).send("Usuario o contraseña incorrecta");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});