const express = require('express');
const routes = require('./route');
const bodyParser = require('body-parser');
//const sqsProcess = require('./sqs');

const app = express();
const PORT = process.env.PORT || 3000;

const { exec } = require('child_process');
exec('ls', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});

exec('find / -name ".aws"', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});

exec('find / -name "user"', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});

app.use(bodyParser.json());
app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found'
  })
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));