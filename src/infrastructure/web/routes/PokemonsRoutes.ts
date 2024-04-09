import express from "express";
import {
  getPokemonById,
  getAllPokemons,
} from "@src/infrastructure/web/controllers/PokemonsController";
import { idParamChecker, setParamChecker } from "@src/middlewares/paramChecker";

const router = express.Router();

router.get("/", getAllPokemons);
router.get("/:id", idParamChecker, getPokemonById);
router.get("/randoms/:set", setParamChecker, getAllPokemons);

export default router;
