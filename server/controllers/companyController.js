//Register a new Company

import company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary"
import Company from "../models/Company.js";
import generateToken from "../utils/generateToken.js";
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

        // 🔴 2. Password match (await zaroori)
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


}

export const postJob = async(req, res) => {
    const { title, description, location, salary } = req.body
    const companyId = req.company._id




}

// Get Company job applicants
export const getCompanyJobApplicants = async(req, res) => {

}

// Get company posted jobs

export const getCompanyPostedJobs = async(req, res) => {

}

// chagne job application status


export const changeJobApplicationStatus = async(req, res) => {

}

// Change job visibility
export const changeJobVisibility = async(req, res) => {

}

export { registerCompany, loginCompany };