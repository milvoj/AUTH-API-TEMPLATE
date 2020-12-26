import { Router } from "express";
import AuthController from "../../controllers/AuthController";

const auth = Router();

auth.get("/", (req: any, res: any) => {
  res.status(200).send("This is an authentication server");
});

auth.post("/login", AuthController.login);
auth.post("/register", AuthController.register);

export default auth;
