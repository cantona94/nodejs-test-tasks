import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
const port = process.env.PORT || 3000;

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
