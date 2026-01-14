import React, { useEffect, useRef, useState } from 'react'
import { Quill } from 'react-quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
const AddJob = () => {

    const [title,setTitle]=useState("")
    const [location,setLocation]=useState("Bangalore")
    const[category,setCategory]=useState("Programming")
    const [level,setLevel]=useState("Beginner level")
    const [salary,setSalary]=useState(0)
    const editorRef=useRef(null)
    const quillRef=useRef(null)
    const {backendUrl,companyToken}=useContext(AppContext)



    const onSubmitHandler =async(e)=>{
        e.preventDefault()
        try {
            const description = quillRef.current.root.innerHTML

            const {data}=await axios.post(backendUrl+'/api/company/post-job',{
                title,description,location, salary,category,level
            },{headers:{token:companyToken}}
            
        )
        console.log(data.success);
         if(data.success){
            toast.success(data.message)
            setTitle('')
            setSalary(0)
             
            
            quillRef.current.innerHTML=""
            console.log("here")
        }
        else{
            toast.error(data.message)

        }

            
        } catch (error) {
            toast.error(error.message)
            
        }


    }

    useEffect(()=>{
        if(!quillRef.current && editorRef.current){
            quillRef.current=new Quill(editorRef.current,{
                theme:"snow",
        })
        }

    },[])
  return (
   <form action="" className='container p-4 flex flex-col w-full items-start gap-3 ' onSubmit={onSubmitHandler}>

   <div className='w-full '>
    <p className='mb-2'>
        Job Title
    </p>

    <input type="text"  placeholder='Type Here' onChange={e=>setTitle(e.target.value)} value={title} required className='w-full max-w-lg px-3 py-2 border-gray-300 rounded '/>

       
   </div>
   <div className='w-full max-w-lg'>
    <p className='my-2'>Job Description</p>
    <div ref={editorRef}>

    </div>
   </div >
   <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
    <div>
        <p className='mb-2'>Job Category</p>
        <select name="" id="" onChange={e=>setCategory(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded '>
            {JobCategories.map((category,id)=> (<option key={id} value={category}>{category}</option>)
            )}
        </select>
    </div>


    <div>
        <p className='mb-2'>Job Location</p>
        <select name="" id="" onChange={e=>setLocation(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded '>
            {JobLocations.map((category,id)=> (<option key={id} value={category}>{category}</option>)
            )}
        </select>
    </div>


      <div>
        <p className='mb-2'>Job Label</p>
        <select name="" id="" onChange={e=>setLevel(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded '>
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
        </select>
    </div>
    <div>
        <p className='mb-2'>Job Salary</p>
        <input type="Number" placeholder='2500' onChange={e=>setSalary(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' min={0} value={salary}/>
    </div>
    <button className='w-28 py-3 mt-4 bg-black text-white rounded cursor-pointer'>ADD</button>
   </div>

   </form>
  )
}

export default AddJob