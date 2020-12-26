import { Router } from "express";
import bodyParser from "body-parser";
import v1 from "./v1/v1";

const router = Router();

router.use(bodyParser.urlencoded({ extended:  true }));
router.use(bodyParser.json());

router.use("/v1", v1);

export default router;