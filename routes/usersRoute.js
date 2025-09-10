import express from "express"
import { createUser, deleteUser, getUserByUsername, addUserId, editUser } from "../controllers/usersController.js"

const router = express.Router()

router.get("/:username", getUserByUsername)
router.post("/", createUser)
router.put("/:id", editUser)
router.post("/id", addUserId)
router.delete("/:id", deleteUser)

export default router