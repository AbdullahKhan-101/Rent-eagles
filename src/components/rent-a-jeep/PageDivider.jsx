import { pagedivider } from '@/Assets'
import Image from 'next/image'
import React from 'react'

const PageDivider = () => {
  return (
    <div className='pagedivider'>
      <Image src={pagedivider} width={1650} height={220} className='w-[100%]' alt=''/>
    </div>
  )
}

export default PageDivider
