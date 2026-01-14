import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  useEffect(() => {
    console.log(jobs)
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category)

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location)

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(job =>
        matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitle(job) &&
        matchesSearchLocation(job)
      )

    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)

  }, [jobs, selectedCategories, selectedLocations, searchFilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

      {/* Sidebar */}
      <div className='w-full lg:w-1/3 bg-white px-4'>

        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>

            <div className='mb-4 text-gray-600 flex gap-2 flex-wrap'>
              {searchFilter.title && (
                <span className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                  {searchFilter.title}
                  <img
                    src={assets.cross_icon}
                    className='cursor-pointer'
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                  />
                </span>
              )}

              {searchFilter.location && (
                <span className='inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                  {searchFilter.location}
                  <img
                    src={assets.cross_icon}
                    className='cursor-pointer'
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                  />
                </span>
              )}
            </div>
          </>
        )}

        <button
          className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobCategories.map((category, index) => (
              <li key={index} className='flex gap-3 items-center'>
                <input
                  type="checkbox"
                  className='scale-125'
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4'>Search by Location</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobLocations.map((location, index) => (
              <li key={index} className='flex gap-3 items-center'>
                <input
                  type="checkbox"
                  className='scale-125'
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Job Listings */}
      <section className='max-w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#job-list">
              <img
                src={assets.left_arrow_icon}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </a>

            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a href="#job-list" key={index}>
                <button
                  className={`w-10 h-10 border rounded flex items-center justify-center ${
                    currentPage === index + 1
                      ? 'bg-blue-100 text-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a href="#job-list">
              <img
                src={assets.right_arrow_icon}
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6))
                  )
                }
              />
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing
