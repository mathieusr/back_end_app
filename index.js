const express = require('express');
const routes = require('./route');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found'
  })
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

module.exports = app