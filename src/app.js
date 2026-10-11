import express from 'express';
import api from './api/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api/v1', api);

export default app;
