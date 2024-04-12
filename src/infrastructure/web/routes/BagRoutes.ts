import express from "express";
import {
    getBagById,
    getBagByTrainerId,
    getSelfBags,
    addBag,
    addItemToBag,
    removeItemFromBag,
    addItemsToBag,
} from "@/infrastructure/web/controllers/BagController";
import { verifyToken } from "@/middlewares/validateToken";

const router = express.Router();

router.use(verifyToken);

router.get("/:id", getBagById);
router.get("/trainer/:id", getBagByTrainerId);
router.get("/me", getSelfBags);

router.post("/", addBag);
router.post("/item", addItemToBag);
router.post("/items", addItemsToBag);

router.delete("/item", removeItemFromBag);

export default router;
