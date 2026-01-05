import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from './../assets/assets'
import moment from 'moment'
import Footer from '../components/footer'

const Applications = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />

      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>

        <div className='flex gap-3 mb-6 mt-3'>
          {isEdit ? (
            <>
              <label htmlFor='resumeUpload' className='flex items-center'>
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>
                  Select Resume
                </p>
                <input
                  id='resumeUpload'
                  type='file'
                  accept='application/pdf'
                  onChange={e => setResume(e.target.files[0])}
                  className='hidden'
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>

              <button
                className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'
                onClick={() => setIsEdit(false)}
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>
                Resume
              </a>
              <button
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>

        <table className='min-w-full bg-white border rounded-lg '>
          <thead>
            <tr >
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left  max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>

          <tbody>
  {jobsApplied.map((job, index) => (
    true ? (
      <tr key={index} className='border-b last:border-b-0'>
        <td className='flex items-center py-3 px-4 gap-2'>
          <img src={job.logo} alt="" className='h-8 w-8' />
          {job.company}
        </td>
        <td className='py-3 px-4'>{job.title}</td>
        <td className='py-3 px-4 max-sm:hidden'>{job.location}</td>
        <td className='py-3 px-4 max-sm:hidden'>
          {moment(job.date).format('DD MMM YYYY')}
        </td>
        <td className='py-3 px-4'>
          <span className={`${job.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : job.status === 'Accepted' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} px-3 py-1 rounded text-sm`}>
            {job.status}

          </span>
        </td>
      </tr>
    ) : null
  ))}
</tbody>

        </table>
      </div>
      <Footer/>
    </>
  )
}

export default Applications
