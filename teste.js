const mysql = require('mysql2');

// Configurar as informações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '96381823rj',
  database: 'bd_2',
});

// Dados a serem inseridos no banco de dados
const nome = 'Exemplo';
const email = 'exemplo@example.com';

// Consulta SQL para criar a tabela se ela não existir
const createTableSql = `CREATE TABLE IF NOT EXISTS tabela_usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)`;

// Consulta SQL para inserir os dados na tabela
const insertDataSql = 'INSERT INTO tabela_usuarios (nome, email) VALUES (?, ?)';
const values = [nome, email];

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  // Criar a tabela se ela não existir
  connection.query(createTableSql, (error) => {
    if (error) {
      console.error('Erro ao criar a tabela:', error);
      connection.end(); // Fechar a conexão com o banco de dados
      return;
    }

    // Inserir os dados na tabela
    connection.query(insertDataSql, values, (insertError, results) => {
      connection.end(); // Fechar a conexão com o banco de dados

      if (insertError) {
        console.error('Erro ao executar a consulta de inserção:', insertError);
        return;
      }

      console.log('Dados inseridos com sucesso!');
    });
  });
});
