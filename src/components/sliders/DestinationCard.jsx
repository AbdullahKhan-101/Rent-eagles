import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DestinationCard = ({ item }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/browse?location=${item?.name.toLowerCase()}`)
      }
      className="scale-[.96] group mx-auto pt-4 cursor-pointer custom_shadow rounded-2xl overflow-hidden max-w-[240px] focus-visible:outline-none transition"
    >
      <div className="max-h-[160px] overflow-hidden object-contain group-hover:-translate-y-2 transition-all delay-100 !duration-500 ease-out">
        <Image
          alt="card-img"
          width={1000}
          height={1000}
          src={item.img}
          className="w-full  h-[160px] group-hover:scale-[.93] transition-all !duration-300 ease-out object-contain"
        />
      </div>
      <div className="pt-2 pb-3 text-center">
        <p className="text-lg font-bold line-clamp-1">{item.name}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
