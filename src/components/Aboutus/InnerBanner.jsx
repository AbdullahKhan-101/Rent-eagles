import { aboutbanner } from '@/Assets'
import Image from 'next/image'
import React from 'react'

const InnerBanner = () => {
  return (
    <div className='inner-banner py-16 md:py-20'>
        <div className='container mx-auto px-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6'>
                <div className='image-area relative flex flex-wrap justify-end'>
                    <div className='hidden md:block before bg-[#F0D9DB] w-4/5 h-full absolute -right-[18%] -bottom-[13%] -z-[10]'></div>
                    <Image src={aboutbanner} width={560} height={420} alt='aboutbanner' className='z-10 relative '/>
                </div>
                <div className='text-area w-full md:w-2/4 z-20'>
                    <h1 className='md:grid mb-3 font-5xl'>About <span>Rent Eagles</span></h1>
                    <p className='w-full md:w-3/5 text-black text-base'>Take a look under the hood of the world’s largest car sharing marketplace</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InnerBanner
