"use client";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { mainlogo } from "@/Assets";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "@/redux/slices/userSlice";
import { ToastError, ToastLogout, ToastSuccess } from "@/Utils/toast";
import { deleteCookie } from "@/hooks/cookies";
import { LogoutHost } from "@/redux/slices/hostSlice";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import NavbarSearchBar from "./NavbarSearchBar";
import { SetUserState } from "@/Utils/states";
import { setCookie } from "@/hooks/cookies";
import { setHost } from "@/redux/slices/hostSlice";
import { setUser } from "@/redux/slices/userSlice";

import { API } from "@/Api";
import ErrorModal from "./Modals/ErrorModal";

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const host = useSelector((state) => state.host.host);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(LogoutUser());
    dispatch(LogoutHost());
    deleteCookie("token");
    window.location.reload();
    router.push("/");
    ToastLogout();
  };

  useEffect(() => {
    setSidebar(false);
  }, [pathname]);

  // console.log(host, "hosthost");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  // console.log(host, "host...");
  // console.log(user, "driver...");

  const switchRole = async (host) => {
    setLoading(true);
    try {
      let response;
      if (host) {
        response = await API.SwitchToHost();
        dispatch(LogoutUser());
        dispatch(setHost(SetUserState(response)));
      } else {
        response = await API.SwitchToDriver();
        dispatch(LogoutHost());
        dispatch(setUser(SetUserState(response)));
      }
      setCookie("token", response);

      // console.log(response?.data?.data[0], "apicall....");
      if (host) {
        if (response?.data?.data[0]?.user?.is_approved == true) {
          setUserRole(response?.data?.data[0].role);
          router.push("/host/home");
        } else {
          setUserRole(response?.data?.data[0].role);
          console.log(userRole, "userRole");
          onOpen();
        }
      } else {
        if (response?.data?.data[0]?.user?.is_approved_to_drive == true) {
          setUserRole(response?.data?.data[0].role);
          router.push("/");
        } else {
          setUserRole(response?.data?.data[0].role);
          console.log(userRole, "userRole");
          onOpen();
        }
      }
    } catch (error) {
      ToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, [openModal]);

  return (
    <>
      <div
        className={`bg-white ${
          pathname.startsWith("/host/dashboard") ? " " : "shadow-md"
        }  py-2 lg:px-6 px-2 flex justify-between items-center`}
      >
        <Link href={"/"}>
          <Image
            className="sm:block hidden"
            src={mainlogo}
            alt="logo"
            width={130}
            height={130}
          />
        </Link>
        <Link href={"/"}>
          <Image
            className="sm:hidden block"
            src={mainlogo}
            alt="small logo"
            width={100}
            height={70}
          />
        </Link>
        {pathname === "/search" && <NavbarSearchBar absolute={false} />}

        <div className="flex sm:gap-5 justify-end   items-center max-w-[400px] w-full">
          {!user?.authenticated && !host?.authenticated && (
            <div className="">
              <Link
                href={"/host/home"}
                className="hover:bg-gray-100 transition  border-[1px] border-black py-2 sm:px-5 px-2 sm:text-base text-sm"
              >
                Become a Host
              </Link>
            </div>
          )}

          {host?.authenticated && (
            <Button
              isLoading={loading}
              onClick={() => switchRole(false)}
              className="bg-gray-200 font-medium"
            >
              Switch To Driver
            </Button>
          )}

          {user?.authenticated && (
            <Button
              onClick={() => switchRole(true)}
              isLoading={loading}
              className="bg-gray-200 font-medium"
            >
              Switch To Host
            </Button>
          )}

          <div className="md:block hidden">
            <Dropdown placement="bottom-end" backdrop="blur" size="xl">
              <DropdownTrigger>
                <div className="flex items-center hover:bg-gray-100 py-2 px-3 cursor-pointer transition rounded-lg gap-4">
                  <Bars3Icon className="w-6 h-6 text-black" />
                  <Avatar
                    isBordered
                    showFallback
                    as="button"
                    className="transition-transform"
                    src={user?.profile_photo || host?.profile_photo}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {user?.authenticated && (
                  <DropdownItem key="1" className="h-14 gap-2">
                    <p className="font-semibold">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                )}
                {host?.authenticated && (
                  <DropdownItem key="1" className="h-14 gap-2">
                    <p className="font-semibold">
                      {host?.first_name + " " + host?.last_name}
                    </p>
                    <p className="font-semibold">{host?.email}</p>
                  </DropdownItem>
                )}

                {host?.authenticated && (
                  <DropdownItem key="2" color="default">
                    <Link className="block w-full" href={"/host/profile"}>
                      Profile
                    </Link>
                  </DropdownItem>
                )}
                {user?.authenticated && (
                  <DropdownItem key="2" color="default">
                    <Link className="block w-full" href={"/driver/profile"}>
                      Profile
                    </Link>
                  </DropdownItem>
                )}
                {host?.authenticated && (
                  <DropdownItem key="2" color="default">
                    <Link
                      className="block w-full"
                      href={"/host/dashboard/my-cars"}
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                )}
                {user?.authenticated && (
                  <DropdownItem key="2" color="default">
                    <Link
                      className="block w-full"
                      href={"/driver/dashboard/booked"}
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                )}

                {!host?.authenticated && (
                  <DropdownItem key="3" color="default">
                    <Link className="block w-full" href={"/"}>
                      Home
                    </Link>
                  </DropdownItem>
                )}
                {host?.authenticated && (
                  <DropdownItem key="3" color="default">
                    <Link className="block w-full" href={"/"}>
                      Home
                    </Link>
                  </DropdownItem>
                )}
                {!user?.authenticated && !host?.authenticated && (
                  <DropdownItem key="4" color="success">
                    <Link className="block w-full" href={"/driver/log-in"}>
                      Log In
                    </Link>
                  </DropdownItem>
                )}
                {!user?.authenticated && !host?.authenticated && (
                  <DropdownItem key="5" color="success">
                    <Link className="block w-full" href={"/driver/sign-up"}>
                      Sign Up
                    </Link>
                  </DropdownItem>
                )}
                {!user?.authenticated && !host?.authenticated && (
                  <DropdownItem showDivider key="6">
                    <Link className="block w-full" href={"/host/log-in"}>
                      {" "}
                      Become A Host{" "}
                    </Link>
                  </DropdownItem>
                )}
                <DropdownItem key="8">
                  <Link className="block w-full" href={"/about-us"}>
                    {" "}
                    About Us
                  </Link>
                </DropdownItem>
                {user?.authenticated && (
                  <DropdownItem
                    className="border-t rounded-sm"
                    onClick={handleLogout}
                    color="danger"
                    key="9"
                  >
                    Log out
                  </DropdownItem>
                )}
                {host?.authenticated && (
                  <DropdownItem onClick={handleLogout} color="danger" key="9">
                    Log out
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* mobile sidebar */}
          <div className="md:hidden">
            <div
              onClick={() => setSidebar(true)}
              className="flex items-center hover:bg-gray-100 py-1 px-3 cursor-pointer transition rounded-lg gap-4"
            >
              <Bars3Icon className="w-6 h-6 text-black" />
              <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform"
                src={user?.profile_photo || host?.profile_photo}
              />
            </div>
            <div
              className={`border transition-all !duration-700 ease-out ${
                sidebar ? "translate-x-0" : "translate-x-[800px]"
              } p-10 pt-16 fixed top-0 right-0 left-0 bottom-0 z-[51] bg-white`}
            >
              <div
                onClick={() => setSidebar(false)}
                className="!-translate-y-[44px] translate-x-5 w-8 flex items-center justify-center h-8 border rounded-full p-1 float-right border-black"
              >
                <XMarkIcon className="w-7 h-7" />
              </div>
              {user?.authenticated && (
                <div className="">
                  <p className="font-semibold pb-4">
                    {user?.first_name + " " + user?.last_name}
                  </p>
                  <p className="font-semibold pb-4">{user?.email}</p>
                </div>
              )}
              {host?.authenticated && (
                <div className="">
                  <p className="font-semibold pb-4 ">
                    {host?.first_name + " " + host?.last_name}
                  </p>
                  <p className="font-semibold pb-4 ">{host?.email}</p>
                </div>
              )}

              {host?.authenticated && (
                <Link className="pb-4 block w-full" href={"/host/profile"}>
                  Profile
                </Link>
              )}

              {user?.authenticated && (
                <Link className="pb-4 block w-full" href={"/driver/profile"}>
                  Profile
                </Link>
              )}
              {host?.authenticated && (
                <Link
                  className="pb-4 block w-full"
                  href={"/host/dashboard/my-cars"}
                >
                  Dashboard
                </Link>
              )}

              {user?.authenticated && (
                <Link
                  className="pb-4 block w-full"
                  href={"/driver/dashboard/booked"}
                >
                  Dashboard
                </Link>
              )}

              {!host?.authenticated && (
                <Link className="pb-4  block w-full" href={"/"}>
                  Home
                </Link>
              )}

              {host?.authenticated && (
                <Link className="pb-4 block w-full" href={"/"}>
                  Home
                </Link>
              )}

              {!user?.authenticated && !host?.authenticated && (
                <Link className="pb-4 block w-full" href={"/driver/log-in"}>
                  Log In
                </Link>
              )}

              {!user?.authenticated && !host?.authenticated && (
                <Link className="pb-4 block w-full" href={"/driver/sign-up"}>
                  Sign Up
                </Link>
              )}
              {!user?.authenticated && !host?.authenticated && (
                <Link className="pb-4 block w-full" href={"/host/log-in"}>
                  {" "}
                  Become A Host{" "}
                </Link>
              )}
              <Link className="pb-4 block w-full" href={"/host/log-in"}>
                {" "}
                How Rent Eagle Work
              </Link>
              <Link className="pb-4 block w-full" href={"/about-us"}>
                {" "}
                About Us
              </Link>
              {user?.authenticated && (
                <p onClick={handleLogout} className="text-red-500">
                  Log out
                </p>
              )}
              {host?.authenticated && (
                <p onClick={handleLogout} className="text-red-500">
                  Log out
                </p>
              )}
            </div>
          </div>
          {/* mobile sidebar end */}
        </div>
      </div>

      {userRole && (
        <ErrorModal
          from={userRole}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
};
