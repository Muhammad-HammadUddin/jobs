import express from "express"
import { getJobById, getjobs } from "../controllers/jobController.js"
const router = express.Router()


router.get("/", getjobs)
router.get("/:id", getJobById)








export default router