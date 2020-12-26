// TUTORIAL: https://www.techiediaries.com/node-express-jwt-authentication/

import { closeDatabases } from "./services/DB.Service";
import * as dotenv from "dotenv";
import router from "./routes/Router";

dotenv.config({ path: __dirname + "/../" + process.env.ENV_FILE });

export const bcrypt = require("bcryptjs");
export const jwt = require("jsonwebtoken");
export const SECRET_KEY = process.env.SECRET_KEY;

const express = require("express");
const app = express();

app.use("/api", router);

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log("Server listening at http://localhost:" + port);
});
const listEndpoints = require("express-list-endpoints");
console.log(listEndpoints(app));

process.on("SIGINT", () => {
  closeDatabases();
});
