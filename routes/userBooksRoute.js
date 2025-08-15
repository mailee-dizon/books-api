import express from "express"
import { getWTRByUsername, addBooks, getReadByUsername, getCurrentReadByUsername, getAllUserBooks, changeBookStatus, removeBook } from "../controllers/userBooksController.js"

const router = express.Router()

router.post("/", addBooks)

router.put("/:user_id/changeBookStatus", changeBookStatus)

router.get("/:user_id/want-to-read", getWTRByUsername)
router.get("/:user_id/read", getReadByUsername)
router.get("/:user_id/currently-reading", getCurrentReadByUsername)
router.get("/:user-id", getAllUserBooks)

router.delete("/:user_id/remove", removeBook)    

export default router