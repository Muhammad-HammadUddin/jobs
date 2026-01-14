import express from 'express';
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router()

// Register a company

router.post("/register", upload.single('image'), registerCompany)

router.post("/login", loginCompany)

// Get company data


router.get("/company", protectCompany, getCompanyData)


router.post("/post-job", protectCompany, postJob)

router.get("/applicants", protectCompany, getCompanyJobApplicants)


router.get('/list-jobs', protectCompany, getCompanyPostedJobs)


router.post('/change-status', protectCompany, changeJobApplicationStatus)

router.post('/change-visiblity', protectCompany, changeJobVisibility)

export default router;