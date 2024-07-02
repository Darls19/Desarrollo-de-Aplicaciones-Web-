const express = require('express');
const sql = require('mssql');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

let pool;

const connectToDatabase = async () => {
    try {
        pool = await sql.connect(config);
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar con SQL Server:', err);
    }
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/questions', async (req, res) => {
    try {
        if (!pool) {
            await connectToDatabase();
        }
        const result = await pool.request().query('SELECT * FROM Preguntas');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al realizar la consulta:', err);
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    connectToDatabase(); 
});
