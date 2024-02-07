import Image from 'next/image'
import React from 'react'

const Mission = ({img, title1, title2}) => {
  return (
    <div className='mission-area py-16 bg-[#F4F4F4]'>
      <div className='container mx-auto px-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'>
            <div className='imagearea flex justify-center md:justify-end'>
                <Image src={img} width={460} height={560} alt='mission' className=''/>
            </div>
            <div className='textarea relative'>
                <div className=' bg-black w-full md:w-96 py-3 px-4 md:absolute  md:-left-12 -top-36'>
                    <h4 className='text-white font-bold font-2xl mb-4'>{title1}</h4>
                    <h3 className='text-white font-bold text-3xl'>{title2}</h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Mission
