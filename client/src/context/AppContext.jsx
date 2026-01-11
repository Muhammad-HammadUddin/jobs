import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";


export const AppContext=createContext()
export const AppContextProvider=(props)=>{
    const [searchFilter,setSearchFilter]=useState({
        title:"",
        location:"",
    })
    const [jobs,setJobs]=useState([])
    const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    // Function to fetch jo"
    const fetchJobs=async()=>{
        setJobs(jobsData)

    }
    useEffect(()=>{
        fetchJobs()
    },[])
    const [isSearched,setisSearched]=useState(false)
    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setisSearched,
        jobs,setJobs,
        setShowRecruiterLogin,
        showRecruiterLogin

    }
    return (<AppContext.Provider value={value}>
         {props.children}
    </AppContext.Provider>)

}
