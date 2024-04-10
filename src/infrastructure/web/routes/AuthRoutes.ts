import express from "express";
import {
  register,
  login,
  logout,
} from "@/infrastructure/web/controllers/AuthController";
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post("/register", urlencodedParser, register);
router.post("/login", urlencodedParser, login);
router.post("/logout", urlencodedParser, logout);

export default router;
