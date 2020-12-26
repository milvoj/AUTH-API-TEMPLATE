import { Router } from "express";
import bodyParser from "body-parser";
import auth from "./Auth.Routes";

const v1 = Router();

v1.use(bodyParser.urlencoded({ extended: true }));
v1.use(bodyParser.json());

v1.use("/auth", auth);

export default v1;
