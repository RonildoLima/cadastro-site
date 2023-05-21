// Importar as dependências
const express = require('express');
const mysql = require('mysql2');

// Configurar as informações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '96381823rj',
  database: 'bd_2',
});

// Criar uma instância do servidor express
const app = express();

// Configurar o middleware para análise de corpo da requisição como JSON
app.use(express.json());

// Definir a rota /cadastrar para lidar com o POST enviado pelo formulário
app.post('/cadastrar', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos!' });
  }

  const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
  const values = [nome, email];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocorreu um erro ao cadastrar os dados.' });
    }

    return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
