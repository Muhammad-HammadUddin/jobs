import Job from "../models/Job.js"
import jobApplication from "../models/JobApplication.js"
import User from "../models/User.js"

import { v2 as cloudinary } from "cloudinary"

export const getUserData = async(req, res) => {

    const userId = req.auth().userId
    console.log("userId", userId)
    try {

        const users = await User.find({ _id: userId })
        console.log(users)


        if (!users) {
            return res.json({ success: false, message: 'User Not Found' })
        }
        return res.json({ success: true, users })

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }

}


export const applyForJob = async(req, res) => {
    const { jobId } = req.body

    const userId = req.auth.userId

    try {

        const isAlreadyApplied = await jobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" })
        }

        const jobData = await Job.find(jobId)

        if (!jobData) {
            return res.json({ success: false, message: "Job Not found" })
        }

        await jobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now(),
        })


        res.json({ success: true, message: "Applied Successfully" })






    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const getUserJobApplication = async(req, res) => {

    try {
        const userId = req.auth.userId

        const applications = await jobApplication.find({ userId }).populate('companyId', "name email image").populate('jobId', 'title description location category level salary').exec()

        if (!applications) {
            return res.json({ success: false, message: "No Job Applications found for this user" })
        }
        return res.json({
            success: true,
            applications
        })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }


}


export const updateUserResume = async(req, res) => {


    try {
        const userId = req.auth.userId;
        const resumeFile = req.resumeFile
        const userData = await User.findById(userId)


        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)

            userData.resume = resumeUpload.secure_url


        }
        await userData.save()
        return res.json({ success: true, message: "Resume Updated" })


    } catch (error) {
        res.json({ success: false, message: error.message })


    }

}