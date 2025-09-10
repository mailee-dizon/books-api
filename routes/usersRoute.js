import express from "express"
import { createUser, deleteUser, getUserByUsername, editUser } from "../controllers/usersController.js"

const router = express.Router()

router.get("/:username", getUserByUsername)
router.post("/", createUser)
router.put("/:id", editUser)
router.delete("/:id", deleteUser)

export default router