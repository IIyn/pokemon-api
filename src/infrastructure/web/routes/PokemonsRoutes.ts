import express from "express";
import {
  getPokemonById,
  getAllPokemons,
} from "@/infrastructure/web/controllers/PokemonsController";
import { idChecker, setChecker } from "@/middlewares/paramChecker";
import { verifyToken } from "@/middlewares/validateToken";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllPokemons);

router.get("/:id", idChecker, getPokemonById);

export default router;
