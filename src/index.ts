'use strict';

import Express from "express";
const { Pool, Client } = require('pg');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

const client = new Client({
  user: 'user',
  host: 'postgres',
  database: 'db',
  password: 'password',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to postgres');
  })
  .catch((err: Error) => {
    console.log('Error connecting to postgres', err);
  });

client.query('SELECT NOW()', (err: Error, res: any) => {
  console.log(err, res);
  client.end();
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});