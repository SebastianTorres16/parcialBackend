import { Router } from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
