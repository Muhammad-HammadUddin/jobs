import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar'


const Applyjob = () => {
  const {id}=useParams()
  const [jobData,setJobData]=useState(null);

  const {jobs}=useContext(AppContext)

  const fetchJob=async()=>{
   try {
    const data= jobs.filter(job=>job._id===id)
    if (data.length!=0){
      setJobData(data[0]);
      console.log(data[0]);
    }
   } catch (error) {
    console.log(error);
    
   }

  }

  useEffect(()=>{
    if(jobs.length>0){
      fetchJob()
    }
    
  },[id,jobs])
  return jobData? (
    <>
    <Navbar/>
    <div>
      <div>
        <div>
          <div>
            <img src={assets.company_icon} alt="" />
            <div>
              <h1>
                {jobData.title}
              </h1>
              <div>
                <span>
                  <img src={assets.suitcase_icon} alt="" srcset="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  
  ) :(
    <Loading/>

     
  )
}

export default Applyjob