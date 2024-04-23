// Importar o pacote dotenv
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json()); // Para que o servidor possa aceitar JSON no corpo da requisição

const connectDatabase = require('./config/database');
connectDatabase(); // Inicia a conexão com o banco de dados

const routes = require('./src/routes/index'); // Importa as rotas
app.use('/api', routes); // Define o prefixo '/api' para as rotas

const PORT = process.env.PORT || 3000; // Definindo a porta
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
