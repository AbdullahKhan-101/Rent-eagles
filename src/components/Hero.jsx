import { hero_img, hero_img_mobile } from "@/Assets";
import Image from "next/image";
import SearchBar from "./Search/SearchBar";

const Hero = () => {
  return (
    <div className="relative">
      <div className="w-full">
        <Image
          alt="banner-img"
          width={1000}
          height={1000}
          className="w-full hidden md:block h-[65vh] md:h-full object-center"
          src={hero_img}
        />
        <Image
          alt="banner-img"
          width={1000}
          height={1000}
          className="w-full h-[550px] md:hidden md:h-full object-center"
          src={hero_img_mobile}
        />
      </div>
      <SearchBar absolute={true} />
    </div>
  );
};

export default Hero;
