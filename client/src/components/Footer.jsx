import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex container px-4 2xl:px-20 mx-auto items-center justify-between gap-4 py-3 mt-20  '>
        <img src={assets.logo} alt="" width={160}/>
        <p className='flex-1 border-1 border-gray-400 text-sm text-gray-500 max-sm:hidden'>Copyright @GreatStack.dev | All rights reserved.</p>
        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon}  width={38}alt="" />
            <img src={assets.twitter_icon}  width={38}alt="" />
            <img src={assets.instagram_icon}  width={38}alt="" />
        </div>
    </div>
  )
}

export default Footer