const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cors({
  origin: true
}));

app.post('/api/dados', (req, res) => {
  // Aqui você pode processar os dados recebidos
  const data = req.body;

  // Simulando uma resposta com os dados recebidos
  res.json(data);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});