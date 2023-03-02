'use strict';

import Express from "express";


const PORT = 8080;
const HOST = '0.0.0.0';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

console.log('Hello from Node.js v12.16.1!');
console.log('Press Ctrl+C to quit.');

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});