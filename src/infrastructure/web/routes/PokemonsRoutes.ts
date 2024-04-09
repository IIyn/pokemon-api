import express from "express";
import {
  getPokemonById,
  getAllPokemons,
} from "@src/infrastructure/web/controllers/PokemonsController";
import { paramChecker } from "@src/middlewares/paramChecker";

const router = express.Router();

router.get("/", getAllPokemons);
router.get("/:id", paramChecker, getPokemonById);
router.get("/randoms/:set", paramChecker, getAllPokemons);

export default router;
