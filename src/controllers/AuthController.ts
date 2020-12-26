import { Request, Response } from "express";
import {createUser, findUserByEmail} from "../services/database/AuthDB.Service";
import {bcrypt, jwt, SECRET_KEY} from "../index";
import {User} from "../models/User";

class AuthController {
  static login = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    findUserByEmail(email, (err: any, user: User) => {
      if (err) return res.status(500).send("Server error!");
      if (!user) return res.status(404).send("User not found!");
      const result = bcrypt.compareSync(password, user.password);
      if (!result) return res.status(401).send("Password not valid!");

      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: expiresIn,
      });
      res
        .status(200)
        .send({ user: user, access_token: accessToken, expires_in: expiresIn });
    });
  };

  static register = (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);
    createUser([username, email, password], (err: any) => {
      if (err) return res.status(500).send("Server error 1!" + err);
      findUserByEmail(email, (err: any, user: User) => {
        if (err) return res.status(500).send("Server error 2!" + err);
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        res
          .status(200)
          .send({
            user: user,
            access_token: accessToken,
            expires_in: expiresIn,
          });
      });
    });
  };
}
export default AuthController;
