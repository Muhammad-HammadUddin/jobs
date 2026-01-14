import express from "express"
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from "../controllers/userController.js"
import Job from './../models/Job.js';
import upload from '../config/multer.js';



const router = express.Router()


//Get user data

router.get('/user', getUserData)


// Apply for Job

router.post('/apply', applyForJob)


//Get Aply jobs data
router.get('/applications', getUserJobApplication)


router.post('/update-resume', upload.single('resume'), updateUserResume)
export default router