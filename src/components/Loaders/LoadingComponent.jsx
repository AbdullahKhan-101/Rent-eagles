import React from "react";
import { MoonLoader, SquareLoader } from "react-spinners";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <MoonLoader color="#99000B" cssOverride={{}} loading />
    </div>
  );
};

export default LoadingComponent;
