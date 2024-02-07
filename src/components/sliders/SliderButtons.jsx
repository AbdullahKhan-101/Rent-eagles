import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

export const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className="absolute -top-12 right-0 bg-gray-100/70 hover:bg-gray-200/70 transition rounded-md px-1 py-[2px] cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      <ChevronRightIcon className="w-8 h-8 opacity-80" />
    </div>
  );
};

export const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className="absolute right-12 bg-gray-100/70 hover:bg-gray-200/70 transition rounded-md px-1 py-[2px] -top-12 cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      <ChevronLeftIcon className="w-8 h-8 opacity-80" />
    </div>
  );
};
