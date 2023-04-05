import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.saveUser);

export default router;
