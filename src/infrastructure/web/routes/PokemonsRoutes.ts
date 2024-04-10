import express from "express";
import {
  getPokemonById,
  getAllPokemons,
  getRandomPokemons,
} from "@/infrastructure/web/controllers/PokemonsController";
import { idChecker, setChecker } from "@/middlewares/paramChecker";

const router = express.Router();

router.get("/", getAllPokemons);

router.get("/:id", idChecker, getPokemonById);

router.get("/randoms/:set", setChecker, getRandomPokemons);

export default router;
