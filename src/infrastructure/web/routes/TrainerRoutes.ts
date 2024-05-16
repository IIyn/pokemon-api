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
import { verifyToken } from "@/middlewares/validateToken";

const router = express.Router();

router.use(verifyToken);

router.get("/:id", getTrainerById);
router.get("/user/:id", getTrainerByUserId);
router.get("/self/all", getSelfTrainers);

router.post("/add", addTrainer);
router.post("/pokemon", addPokemonToTrainer);
router.post("/team", addTeamToTrainer);

router.delete("/pokemon", removePokemonFromTrainer);

export default router;
