import express from "express"
import { createUser, deleteUser, getUserByUsername } from "../controllers/usersController.js"

const router = express.Router()

router.get("/:username", getUserByUsername)
router.post("/", createUser)
router.delete("/:id", deleteUser)

export default router