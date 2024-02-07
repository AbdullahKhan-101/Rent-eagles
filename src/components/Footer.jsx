import { fb, insta, twitter, youtube } from "@/Assets";
import { carsCategoryData, carsData } from "@/data/slider";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  return !pathname.includes("/search") ? (
    <div className="bg-web_gray">
      <div className="container mx-auto pt-16 px-5">
        <p className="text-sm font-medium">
          * Any personal insurance you may have that covers damage to the host’s
          vehicle would kick in before your protection plan, except in limited
          situations for trips booked in Maryland, but this protects your own
          wallet. Liability insurance is provided under a policy issued to Rent
          Eagles by Travelers Excess and Surplus Lines Company. Terms,
          conditions, and exclusions apply. The policy does not provide coverage
          for damage to a host’s vehicle.
        </p>
        <p className="text-sm font-medium mt-4">
          For questions or information about the third party liability insurance
          that is included in protection plans in the US, consumers in Maryland
          and the licensed states listed
          <Link href={"#"} className="text-web_brown">
            here
          </Link>
          may contact Rent Eagles Insurance Agency at (415) 508-0283 or
          claims@RentEagles.agency. For questions about how damage to a host’s
          vehicle is handled, visit the
          <Link href={"#"} className="text-web_brown">
            Rent Eagles Support{" "}
          </Link>{" "}
          site.
        </p>
        <p className="text-sm font-medium mt-4">
          When a trip is booked in the state of Washington, physical damage to
          the host’s vehicle is covered by insurance purchased by Rent Eagles,
          but the Rent Eagles insurance does not change the contractual
          responsibilities of hosts or guests with respect to physical damage to
          a host’s vehicle.
        </p>
        <p className="text-sm font-medium mt-4">
          ** Terms, conditions, and exclusions apply.
        </p>
        <p className="text-sm font-medium mt-4">
          *** Review the{" "}
          <Link href={"#"} className="text-web_brown">
            {" "}
            Guest Product Disclosure Statement{" "}
          </Link>{" "}
          for more information.
        </p>
      </div>
      <div className="container mx-auto">
        <div className="container  px-5 py-16 flex items-start gap-4  flex-wrap ">
          <div className=" flex-1 max-w-[280px] ">
            <h4 className="text-lg font-bold mb-4">Rent Eagles</h4>
            <div className="flex flex-col ">
              <Link href={"/about-us"}>About</Link>
            </div>
          </div>
          <div className=" flex-1 max-w-[280px] ">
            <h4 className="text-lg font-bold mb-4">Locations</h4>
            <div className="flex flex-col ">
              <Link href={"/"}>USA (EN) </Link>
            </div>
          </div>
          <div className=" flex-1 max-w-[280px] ">
            <h4 className="text-lg font-bold mb-4">Explore</h4>
            <div className="flex flex-col ">
              <Link href={"/browse?location=los%20angeles"}>Book a car</Link>
              <Link href={"#"}>Trust & safety</Link>
              <Link href={"#"}>Sustainability</Link>
              <Link href={"#"}>Get help</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1  max-w-[280px] ">
            <Image
              alt="icon"
              width={1000}
              height={1000}
              src={fb}
              className="object-contain cursor-pointer max-w-[24px]"
            />
            <Image
              alt="icon"
              width={1000}
              height={1000}
              src={twitter}
              className="object-contain cursor-pointer max-w-[24px]"
            />
            <Image
              alt="icon"
              width={1000}
              height={1000}
              src={insta}
              className="object-contain cursor-pointer max-w-[24px]"
            />
            <Image
              alt="icon"
              width={1000}
              height={1000}
              src={youtube}
              className="object-contain cursor-pointer max-w-[30px]"
            />
          </div>
        </div>

        <div className="container px-5 py-16 flex gap-4">
          <div className=" flex-1 max-w-[280px] ">
            <h4 className="text-lg font-bold mb-4">Hosting</h4>
            <div className="flex flex-col ">
              <Link href={"/host/home"}>List your car</Link>
              <Link href={"#"}>Insurance & protection</Link>
            </div>
          </div>

          <div className="flex-1  max-w-[280px]">
            <h4 className="text-lg font-bold mb-4">Vehicle types</h4>
            <div className="flex flex-col ">
              {carsCategoryData.map((item, index) => {
                const modifiedName =
                  item?.name && item?.name.endsWith("s")
                    ? item?.name.slice(0, -1)
                    : item?.name;
                return (
                  <Link
                    href={
                      // `/rent?brand=${item?.name.toLowerCase()}`
                      `/browse?location=${"new york"}&category=${modifiedName.toLowerCase()}`
                    }
                    key={index}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex-1  max-w-[280px]">
            <h4 className="text-lg font-bold mb-4">Makes</h4>
            <div className="flex flex-col ">
              {carsData?.map((item, index) => (
                <Link
                  href={`/rent?brand=${item?.name.toLowerCase()}`}
                  key={index}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Footer;
