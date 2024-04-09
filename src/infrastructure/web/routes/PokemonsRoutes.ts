import express from "express";
import {
  getPokemonById,
  getAllPokemons,
} from "@/infrastructure/web/controllers/PokemonsController";
import { paramChecker } from "@/middlewares/paramChecker";

const router = express.Router();

router.get("/", getAllPokemons);
router.get("/:id", paramChecker, getPokemonById);
router.get("/randoms/:set", paramChecker, getAllPokemons);

export default router;
