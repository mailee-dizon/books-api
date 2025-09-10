import express from "express"
import { getWTRByUsername, addBooks, getReadByUsername, getCurrentReadByUsername, getUsersBooks, changeBookStatus, removeBook } from "../controllers/userBooksController.js"

const router = express.Router()

router.post("/", addBooks)

router.put("/:user_id/:work", changeBookStatus)

router.get("/:user_id/want-to-read", getWTRByUsername)
router.get("/:user_id/read", getReadByUsername)
router.get("/:user_id/currently-reading", getCurrentReadByUsername)
router.get("/:user_id", getUsersBooks)

router.delete("/:user_id/:work", removeBook)    

export default router