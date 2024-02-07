import Image from "next/image";
import Link from "next/link";
import React from "react";

const ImageWithtext = ({ mainheading, imagefirst, keypoints }) => {
  return (
    <div className="pb-16">
      <div className="container mx-auto px-5">
        <div className="pb-16">
          <h2 className="text-center text-4xl md:text-5xl my-5 font-bold">
            {mainheading}
          </h2>
        </div>
        {keypoints.map((item, index) => {
          const isLeftAligned = index % 2 === 0; // Check if it's an even index
          return (
            <div
              key={index}
              className={`flex  gap-10 xl:gap-28 lg:items-center py-6 
               ${
                 isLeftAligned || imagefirst
                   ? "flex-col lg:flex-row-reverse"
                   : "flex-col lg:flex-row"
               }`}
            >
              <div className="flex-1">
                <Image
                  src={item.img}
                  width={520}
                  height={280}
                  alt=""
                  className={`w-full max-h-[500px] `}
                />
              </div>
              <div className={`textarea flex-1`}>
                <h4 className="text-black font-bold text-2xl mb-3">
                  {item.sub_heading}
                </h4>
                <h3 className="text-black font-bold text-3xl lg:text-4xl mb-3">
                  {item.heading}
                </h3>
                <p className={`text-black font-normal text-base mb-4 `}>
                  {item.para}
                </p>
                {item.para2 && (
                  <p className={`text-black font-normal text-base mb-4`}>
                    {item.para2}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageWithtext;
