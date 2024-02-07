import { about_bottom_banner } from '@/Assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopImageWithText = () => {
  return (
    <div className='top-image-text py-16 bg-[#F4F4F4]'>
      <div className='container mx-auto px-5'>
        <div className='w-full mb-8 '>
            <Image src={about_bottom_banner} width={1200} height={800} alt='' className='w-full'/>
        </div>
        <div className='w-full md:w-6/12 mx-auto text-center flex flex-wrap justify-center'>
            <h2 className='text-5xl font-bold text-black mb-8'>Sustainable car travel on Rent Eagles</h2>
            <p className='text-black font-normal text-base mb-4'>Rent Eagles offsets 100% of our estimated global carbon emissions by investing in greenhouse gas-reducing projects, so you can rest easy building your businesses and satisfying your wanderlust knowing that our carbon footprint is accounted for.</p>
        </div>
      </div>
    </div>
  )
}

export default TopImageWithText
