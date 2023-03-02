'use strict';

import Express from "express";
import sequlize from "./Models";


const PORT = 8080;
const HOST = '0.0.0.0';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

console.log(`Hello from Node.js ${process.version}!`);
console.log('Press Ctrl+C to quit.');


(async () => {
  try {
    await sequlize.authenticate();
    console.log('Connection has been established successfully.');
    await sequlize.sync();
    console.log("All models were synchronized successfully.");
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()