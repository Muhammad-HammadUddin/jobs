import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { assets } from '../assets/assets'

const ViewApplication = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  const { backendUrl, companyToken } = useContext(AppContext)

  const fetchCompanyJobApplications = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applicants.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobApplications()
        setOpenIndex(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // 🔹 Loading State
  if (loading) return <Loading />

  // 🔹 Empty State
  if (applicants.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications Available</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <table className="w-full max-w-4xl bg-white border border-gray-200 sm:text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
            <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
            <th className="py-2 px-4 text-left">Resume</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {applicants
            .filter(item => item.jobId && item.userId)
            .map((applicant, index) => (
              <tr key={applicant._id} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">
                  {index + 1}
                </td>

                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={applicant.userId.image}
                      className="w-10 h-10 rounded-full max-sm:hidden"
                      alt=""
                    />
                    <span>{applicant.userId.name}</span>
                  </div>
                </td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobId.title}
                </td>

                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobId.location}
                </td>

                <td className="py-2 px-4 border-b">
                  <a
                    href={applicant.userId.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>

                <td className="py-2 px-4 border-b relative">
                  {applicant.status === 'Pending' ? (
                    <>
                      <button
                        className="text-gray-500"
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      >
                        ...
                      </button>

                      {openIndex === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                          <button
                            onClick={() =>
                              changeJobApplicationStatus(applicant._id, 'Accepted')
                            }
                            className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              changeJobApplicationStatus(applicant._id, 'Rejected')
                            }
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <span
                      className={`font-semibold ${
                        applicant.status === 'Accepted'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {applicant.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewApplication
