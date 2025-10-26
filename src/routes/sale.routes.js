import { Router } from "express";
import {
  getSale,
  createSale,
  getSales,
} from "../controllers/sale.controller.js";

const router = Router();

router.post("/", createSale);
router.get("/", getSales);
router.get("/:id", getSale);

export default router;
