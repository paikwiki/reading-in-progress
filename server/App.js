/* eslint no-unused-vars: 0 */
import express from 'express';

const app = express();

app.use('/', express.static(__dirname + '/../dist'));

const server = app.listen(3000, () => {
  console.log('Express application is ready for you on http://localhost:3000 ~😎');
});