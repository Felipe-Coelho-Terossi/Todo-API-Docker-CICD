require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/todos', require('./routes/todos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));

module.exports = app;