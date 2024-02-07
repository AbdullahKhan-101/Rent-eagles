import { lines } from "@/Assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MultiplePara = ({
  heading,
  sub_heading,
  MultiplePara,
  btn_text,
  btn_link,
  line,
}) => {
  return (
    <div className="MultiplePara py-16">
      <div className="container max-w-6xl mx-auto px-5">
        {heading && (
          <h2 className="md:text-center font-bold text-3xl md:text-5xl mb-6">
            {heading}
          </h2>
        )}
        {sub_heading && (
          <p
            className={`md:text-center max-w-[600px] mx-auto font-semibold ${
              line ? "mb-6" : "mb-12"
            }`}
          >
            {sub_heading}
          </p>
        )}
        {line && (
          <Image className="text-center mx-auto mb-6" alt="lines" src={lines} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 pt-5 gap-4 mb-6">
          {MultiplePara.map((item, index) => {
            return (
              <div key={index} className="container max-w-[310px] ">
                <h4 className="text-black font-bold text-2xl mb-3">
                  {item.heading}
                </h4>
                <p className="text-black font-normal text-sm mb-4">
                  {item.para}
                </p>
              </div>
            );
          })}
        </div>
        {btn_text && (
          <div className="flex flex-wrap justify-center">
            <Link
              href={btn_link}
              className="bg-[#99000B] py-3 px-7 text-white table"
            >
              {btn_text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplePara;
