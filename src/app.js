import express from 'express';
import api from './api/index.js';

import {
  notFoundHandler,
  errorHandler,
} from './middlewares/error-handlers.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api/v1', api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
