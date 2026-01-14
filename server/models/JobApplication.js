import mongoose from "mongoose";

const jobApplicationSchema= new mongoose.Schema({
    userId:{type:String,required:true, ref:'User'},
    companyId:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Company'},
    jobId:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Job'},
    status:{type:String ,default:"Pending"},
    date:{type:Number,reqired:true}
})

const jobApplication= mongoose.model('JobApplication',jobApplicationSchema)

export default jobApplication

