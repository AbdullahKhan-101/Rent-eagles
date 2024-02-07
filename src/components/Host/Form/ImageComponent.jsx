import { picture } from '@/Assets';
import { CameraIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useRef, useState } from 'react'

const ImageComponent = React.memo(({ item, handleImageChange }) => {
    const [hover, setHover] = useState(false);
    const inputRef = useRef(null);
  
    return (
      <div
        className="relative h-[150px] w-[150px]"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={item?.image?.name ? URL.createObjectURL(item?.image) : picture}
          width={1000}
          height={1000}
          alt="image"
          className=" object-center  h-[150px] w-[150px]"
        />
        <div
          onClick={() => {
            inputRef.current.click();
          }}
          className={`absolute ${
            hover ? "" : "hidden"
          } cursor-pointer bg-black opacity-80 top-0 bottom-0 left-0 right-0 flex items-center justify-center`}
        >
          <input
            type="file"
            onChange={(e) => handleImageChange(e, item?.id)}
            accept="image/*"
            ref={(e) => {
              inputRef.current = e;
            }}
            className="hidden"
          />
          <CameraIcon color="white" width={70} />
        </div>
      </div>
    );
  });

ImageComponent.displayName = 'ImageComponent';

export default ImageComponent