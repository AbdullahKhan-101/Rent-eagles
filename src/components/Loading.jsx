import React from "react";
import { MoonLoader, SquareLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[50vh] ">
      <MoonLoader color="#99000B" cssOverride={{}} loading />
    </div>
  );
};

export default Loading;
