"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NestedHostedNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-[20vh] sm:h-[10vh] flex justify-start items-end  bg-white border-b-gray-500-2 border border-t-0">
      <div className="w-full lg:max-w-[70%] px-4 mt-[10%] sm:mt-0  sm:mx-auto flex flex-col sm:flex-row sm:justify-start sm:items-end gap-2 sm:gap-8">
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("my-cars")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/host/dashboard/my-cars"}>My cars</Link>
        </div>
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("my-renters")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/host/dashboard/my-renters"}>My Renters</Link>
        </div>
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("history")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/host/dashboard/history"}>History</Link>
        </div>
  
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("calender")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/host/dashboard/calender"}>Calender</Link>
        </div>
      </div>
    </div>
  );
};

export default NestedHostedNavbar;
