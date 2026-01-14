import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
const RecruiterLogin = () => {
    const [state,setState]=useState('Login')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const {setShowRecruiterLogin,backendUrl,setCompanyToken,setCompanyData}=useContext(AppContext)

    const [image,setImage]=useState(null) 
    const [isTextDataSubmitted,setIsTextDataSubmitted]=useState(false)

    const onSubmitHandler=async(e)=>{
        e.preventDefault()

        if(state==='Sign Up' && !isTextDataSubmitted){
            return setIsTextDataSubmitted(true)
        }
        try {
            if(state=="Login"){
                console.log(backendUrl)
                const {data}=await axios.post(backendUrl+'/api/company/login',{email,password})
                if(data.success){
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')

                }
                else{
                    toast.error(data.message)
                }


                
                
            }


            else{
                const formData =  new FormData();
                formData.append('name',name)
                formData.append('password',password)
                formData.append('email',email)
                formData.append('image',image)

                const {data}=await axios.post (backendUrl+'/api/company/register',formData)
                if(data.success){
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')

                }
                else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
       
    }

    useEffect(()=>{
        document.body.style.overflow='hidden'
        return ()=>{
            document.body.style.overflow='unset'
        }
    },[])
  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
     <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl font-medium text-neutral-700'>
            Recruiter {state} 
        </h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state==='Sign Up'&& isTextDataSubmitted
        ?
        <>
        <div className='flex items-center gap-4 my-10'>
            <label htmlFor="image">
                <img src={image ?URL.createObjectURL(image) :assets.upload_area } alt="" className='w-16 rounded-full' />
                <input type="file"  id='image' hidden onChange={e=>setImage(e.target.files[0])}/>
            </label>
            <p>Upload Company <br />Logo</p>
        </div>
        </>
        
        :
         <>
        {state!='Login'&&<div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 border:none'>
            <img src={assets.person_icon} alt="" />
            <input type="text" name="" id="" placeholder='Company Name' required onChange={e=>setName(e.target.value)} value={name} className='outline-none text-sm'/>

        </div>}

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 border:none'>
            <img src={assets.email_icon} alt="" />
            <input type="text" name="" id="" placeholder='Email' required onChange={e=>setEmail(e.target.value)} value={email} className='outline-none text-sm'/>

        </div>

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 border:none'>
            <img src={assets.lock_icon} alt="" />
            <input type="password" name="" id="" placeholder='Password' required onChange={e=>setPassword(e.target.value)} value={password} className='outline-none text-sm'/>

        </div>
        {state === "Login" && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>
            Forgot Password?
        </p>}
        
        </>

        }

       
        <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-4' type='submit'>
            {state==='Login'?'Login': isTextDataSubmitted ?'create account':'next'}
        </button>
{ state==='Login'?
        <p  className='mt-5 text-center '>
Don't have an account? <span onClick={()=>setState("Sign Up")} className='text-blue-600 cursor-pointer'>Sign Up</span>
        </p>:
            
        <p className='mt-5 text-center '>
          Already have an account? <span onClick={()=>setState("Login")} className='text-blue-600 cursor-pointer'>Login</span>
        </p>}

        <img src={assets.cross_icon} alt=""  className='absolute top-5 right-5 cursor-pointer ' onClick={e=>setShowRecruiterLogin(false)}/>
     </form>
    </div>
  )
}

export default RecruiterLogin