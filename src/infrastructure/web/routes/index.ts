import express from "express";
import pokemonRoutes from "@/infrastructure/web/routes/PokemonsRoutes";
import authRoutes from "@/infrastructure/web/routes/AuthRoutes";

const router = express.Router();

router.use("/pokemons", pokemonRoutes);
router.use("/auth", authRoutes);

export default router;
