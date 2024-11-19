import express from 'express';
import bodyParser from 'body-parser';

import router from './router/index.js';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app
  .listen(port, () => {
    console.log('Server running at PORT: ', port);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
