'use strict';

import Express from "express";

import router from "./Routers";

const app = Express();
app.use(Express.json());

app.use(router)

export default app;