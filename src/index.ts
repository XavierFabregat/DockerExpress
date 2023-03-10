'use strict';

import Express from "express";
import sequlize from "./Models";

import router from "./Routers";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const app = Express();
app.use(Express.json());

app.use(router)

console.log(`Hello from Node.js ${process.version}!`);
console.log('Press Ctrl+C to quit.');


(async () => {
  try {
    await sequlize.authenticate();
    console.log('Connection has been established successfully.');
    await sequlize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    app.listen(Number(PORT), HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()