import React from "react";

const LeftRightText = ({ heading1, heading2, para1, para2 }) => {
  return (
    <div className="LeftRightText py-16">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center ">
          <div className=" heading-text-area md:pr-10">
            <h2 className="md:text-right font-bold text-5xl">{heading1}</h2>
            <h4 className="md:text-right font-bold text-2xl">{heading2}</h4>
          </div>
          <div className=" para-text-area">
            <p className="text-black text-base mb-3">{para1}</p>
            {para2 && <p className="text-black text-base">{para2}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftRightText;
