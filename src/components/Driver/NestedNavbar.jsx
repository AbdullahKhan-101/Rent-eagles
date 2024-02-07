"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NestedNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-[10vh] flex justify-start items-end  bg-white border-b-gray-500-2 border border-t-0">
      <div className="lg:max-w-[70%] px-4 w-full mx-auto flex justify-start items-end gap-8">
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("booked")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/driver/dashboard/booked"}>Booked</Link>
        </div>
        <div
          className={`cursor-pointer whitespace-nowrap  ${
            pathname.includes("history")
              ? "border-b-2 border-red-800  font-bold"
              : ""
          } `}
        >
          <Link href={"/driver/dashboard/history"}>History</Link>
        </div>
      </div>
    </div>
  );
};

export default NestedNavbar;
