import React from "react";

const Tips = ({ text1, text2 }) => {
  return (
    <div className="borderCarList p-4  flex flex-col justify-center items-start gap-6 max-w-[550px] w-full">
      <h2 className="text-xl font-bold  ">{text1}</h2>

      <div className="bg-[#F0D9DB] p-8 max-w-[450px] w-full rounded-[0.625rem] ">
        <p className="text-start ">{text2}</p>
      </div>
    </div>
  );
};

export default Tips;
