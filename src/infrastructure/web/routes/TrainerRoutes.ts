import express from "express";
import {
  getTrainerById,
  getTrainerByUserId,
  getSelfTrainers,
  addTrainer,
  addPokemonToTrainer,
  removePokemonFromTrainer,
  addTeamToTrainer,
} from "@/infrastructure/web/controllers/TrainerController";
import { idChecker } from "@/middlewares/paramChecker";
import { verifyToken } from "@/middlewares/validateToken";

const router = express.Router();

router.use(verifyToken);

router.get("/:id", idChecker, getTrainerById);
router.get("/user/:id", idChecker, getTrainerByUserId);
router.get("/me", getSelfTrainers);

router.post("/", addTrainer);
router.post("/pokemon", addPokemonToTrainer);
router.post("/team", addTeamToTrainer);

router.delete("/pokemon", removePokemonFromTrainer);

export default router;
