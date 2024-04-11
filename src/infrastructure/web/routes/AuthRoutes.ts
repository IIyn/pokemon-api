import express from "express";
import {
  authenticate,
  logout,
} from "@/infrastructure/web/controllers/AuthController";
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post("/register", urlencodedParser, authenticate);
router.post("/login", urlencodedParser, authenticate);
router.post("/logout", urlencodedParser, logout);

export default router;
