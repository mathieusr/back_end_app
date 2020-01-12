const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/health', (req, res) => {
  res.send('The API is healthy, thanks for checking!\n');
});

app.listen(PORT, HOST);