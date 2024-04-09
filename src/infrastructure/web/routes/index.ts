import express from "express";
import pokemonRoutes from "@src/infrastructure/web/routes/PokemonsRoutes";

const router = express.Router();

router.use("/pokemons", pokemonRoutes);
