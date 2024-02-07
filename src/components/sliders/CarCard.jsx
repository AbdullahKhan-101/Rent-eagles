import { Searchparams } from "@/Utils/searchParams";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CarCard = ({ item, cat }) => {
  const router = useRouter();
  // console.log(cat, "cat.....");

  const location = Searchparams("location");
  // const category = Searchparams("category");

  const modifiedName =
    item?.name && item?.name.endsWith("s")
      ? item?.name.slice(0, -1)
      : item?.name;

  return (
    <div
      onClick={() => {
        if (!cat) {
          router.push(`/rent?brand=${item?.name.toLowerCase()}`);
        } else {
          router.push(
            `/browse?location=${location}&category=${modifiedName.toLowerCase()}`
          );
        }
      }}
      className="scale-[.96] mx-auto cursor-pointer custom_shadow rounded-2xl overflow-hidden max-w-[300px]  focus-visible:outline-none transition-all ease-out duration-300"
    >
      <div className="max-h-[220px] overflow-hidden min-h-[200px] sm:min-h-[220px] ">
        <Image
          alt="card-img"
          width={1000}
          height={220}
          src={item.img}
          className="w-full hover:scale-105 h-full transition min-h-[200px] sm:min-h-[220px] "
        />
      </div>
      <div className="bg-white py-5 text-center">
        <p className="text-lg font-bold line-clamp-1">{item.name}</p>
      </div>
    </div>
  );
};

export default CarCard;
