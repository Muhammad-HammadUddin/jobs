//Register a new Company

import company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary"
import Company from "../models/Company.js";
import generateToken from "../utils/generateToken.js";
import Job from './../models/Job.js';
import jobApplication from "../models/JobApplication.js";
const registerCompany = async(req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingCompany = await Company.findOne({ email })

        if (existingCompany) {
            return res.status(400).json({ success: false, message: "Company already exists" })


        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        })



        return res.status(200).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image


            },
            token: generateToken(company._id)
        })
    } catch (error) {
        console.log(error)
        return res.error({ message: error.message })

    }


}

const loginCompany = async(req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    try {
        const company = await Company.findOne({ email })

        // 🔴 1. Company exist karti hai ya nahi
        if (!company) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            })
        }


        const isMatch = await bcrypt.compare(password, company.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        // ✅ Success
        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: "Server error"
        })
    }
}


export const getCompanyData = async(req, res) => {



    try {
        const company = req.company
        res.json({ success: true, company })
    } catch (error) {
        res.json({
            success: false,
            message: error.message

        })


    }



}

export const postJob = async(req, res) => {
    const { title, description, location, salary, level, category } = req.body
    const companyId = req.company._id

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            date: Date.now(),
            companyId,
            level,
            category



        })


        await newJob.save()

        return res.json({ success: true, newJob })

    } catch (error) {

        res.json({ succes: false, message: error.message })

    }




}

// Get Company job applicants
export const getCompanyJobApplicants = async(req, res) => {

    try {
        const companyId = req.company._id

        const applications = await jobApplication.find({ companyId }).populate('userId', 'name image resume').populate('jobId', 'title location category label salary').exec()


        return res.json({ success: true, applications })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

// Get company posted jobs



export const getCompanyPostedJobs = async(req, res) => {


    try {
        const companyId = req.company._id

        const jobs = await Job.find({ companyId })

        const jobsData = await Promise.all(jobs.map(async(job) => {


            const applicants = await jobApplication.find({ jobId: job._id })
            return {...job.toObject(), applications: applicants.length }

        }))

        return res.json({ success: true, jobsData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// change job application status


export const changeJobApplicationStatus = async(req, res) => {


    try {

        const { id, status } = req.body


        await jobApplication.findOneAndUpdate({ _id: id }, { status })


        res.json({ success: true, message: "Status Changed" })


    } catch (error) {
        res.json({ success: false, message: error.message })



    }


}

// Change job visibility
export const changeJobVisibility = async(req, res) => {

    try {

        const { id } = req.body
        const companyId = req.company._id


        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible

        }
        await job.save()
        return res.json({ success: true, job })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

export { registerCompany, loginCompany };