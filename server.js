require('dotenv').config();

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;

// Use as variáveis de ambiente como necessário


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurar as informações de conexão com o banco de dados
const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: 'uzuiwubt',
  port: 5432, // Porta padrão do PostgreSQL
});

app.get('/', (req, res) => {
  res.send('Página inicial');
});

// Middleware para habilitar o CORS
app.use(cors());

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post('/cadastrar', (req, res) => {
  const { nome, email, categoria} = req.body;

  // Consulta SQL para criar a tabela se ela não existir
  const createTableSql = `CREATE TABLE IF NOT EXISTS tabela_usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL
  )`;

  // Consulta SQL para inserir os dados na tabela
  const insertDataSql = 'INSERT INTO tabela_usuarios (nome, email, categoria) VALUES ($1, $2, $3)';
  const values = [nome, email,categoria];

  // Conectar ao banco de dados usando a pool de conexões
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      res.status(500).send('Erro ao cadastrar os dados');
      return;
    }

    // Criar a tabela se ela não existir
    client.query(createTableSql, (createTableError) => {
      if (createTableError) {
        console.error('Erro ao criar a tabela:', createTableError);
        release(); // Liberar o cliente de volta para a pool
        res.status(500).send('Erro ao cadastrar os dados');
        return;
      }

      // Inserir os dados na tabela
      client.query(insertDataSql, values, (insertError, results) => {
        release(); // Liberar o cliente de volta para a pool

        if (insertError) {
          console.error('Erro ao executar a consulta de inserção:', insertError);
          res.status(500).send('Erro ao cadastrar os dados');
          return;
        }

        res.status(200).send('Dados cadastrados com sucesso!');
      });
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
