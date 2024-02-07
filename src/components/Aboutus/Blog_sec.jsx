import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog_sec = ({ img, heading, para }) => {
  return (
    <div className="blog-sec py-16">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-between gap-5 items-top py-6">
          <div className="imagearea w-full lg:w-[49%] flex flex-wrap justify-center">
            <Image src={img} width={520} height={280} alt="" className="" />
          </div>
          <div className="textarea w-full lg:w-[49%] pt-16">
            <h3 className="text-black font-bold text-3xl mb-3">{heading}</h3>
            <p className="text-black font-normal text-base mb-4">{para}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog_sec;
