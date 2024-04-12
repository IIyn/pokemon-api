import express from "express";
import authRoutes from "@/infrastructure/web/routes/AuthRoutes";
import pokemonRoutes from "@/infrastructure/web/routes/PokemonsRoutes";
import trainerRoutes from "@/infrastructure/web/routes/TrainerRoutes";
import bagRoutes from "@/infrastructure/web/routes/BagRoutes";

const router = express.Router();

router.use("/pokemons", pokemonRoutes);
router.use("/auth", authRoutes);
router.use("/trainers", trainerRoutes);
router.use("/bag", bagRoutes);

export default router;
