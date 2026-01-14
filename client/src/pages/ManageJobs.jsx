import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const ManageJobs = () => {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const { backendUrl, companyToken } = useContext(AppContext)

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setJobs([...data.jobsData].reverse())
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-visiblity',
        { id },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message)

        setJobs(prev =>
          prev.map(job =>
            job._id === id
              ? { ...job, visible: !job.visible }
              : job
          )
        )
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
    console.log(jobs)
  }, [companyToken])

  return (
    <div className="container -4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job.date).format('ll')}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {job.applications}
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    className="scale-125 ml-4"
                    checked={job.visible}
                    onChange={() => changeJobVisiblity(job._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="py-4 px-2 text-white bg-black rounded border"
          onClick={() => navigate('/dashboard/add-job')}
        >
          Add New Job
        </button>
      </div>
    </div>
  )
}

export default ManageJobs
