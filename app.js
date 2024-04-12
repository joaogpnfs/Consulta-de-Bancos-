const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GABRIEL0519',
  database: 'testeestagio'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de consulta de bancos!');
});

app.get('/bancos', (req, res) => {
  const sql = 'SELECT * FROM tabelabanquinho';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/banco/:codigoCompensacao', (req, res) => {
  const codigoCompensacao = req.params.codigoCompensacao;
  const sql = `SELECT * FROM tabelabanquinho WHERE codigo_compensacao = ${codigoCompensacao}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Banco não encontrado' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});