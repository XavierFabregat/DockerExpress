'use strict';

import Express from "express";

const PORT = 8080;
const HOST = '0.0.0.0';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});