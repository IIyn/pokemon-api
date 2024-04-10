import express from "express";
import {
  getPokemonById,
  getAllPokemons,
  getRandomPokemons,
} from "@/infrastructure/web/controllers/PokemonsController";
import { idChecker, setChecker } from "@/middlewares/paramChecker";
import { verifyToken } from "@/middlewares/validateToken";

const router = express.Router();

router.get("/", verifyToken, getAllPokemons);

router.get("/:id", idChecker, getPokemonById);

router.get("/randoms/:set", setChecker, getRandomPokemons);

export default router;
