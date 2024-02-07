"use client";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import ErrorModal from "@/components/Modals/ErrorModal";
import ForgotPassword from "@/components/Modals/ForgotPassword";
import { SetUserState } from "@/Utils/states";
import { setCookie } from "@/hooks/cookies";
import { setHost } from "@/redux/slices/hostSlice";
import { setUser } from "@/redux/slices/userSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Index = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.LoginDriverHost(data);
      if (response?.data?.data[0]?.role === "driver") {
        setCookie("token", response);
        dispatch(setUser(SetUserState(response)));
        if (response?.data?.data[0]?.user?.is_approved_to_drive) {
          ToastSuccess(response);
          router.push("/");
        } else {
          setUserRole("driver");
          ToastSuccess(response);
          onOpen();
        }
      } else if (response?.data?.data[0]?.role === "host") {
        setCookie("token", response);
        dispatch(setHost(SetUserState(response)));
        if (response?.data?.data[0]?.user?.is_approved) {
          ToastSuccess(response);
          router.push("/");
        } else {
          setUserRole("host");
          ToastSuccess(response);
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

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="max-w-[80%] md:max-w-[40%] mx-auto w-full pb-10">
      <h1 className="text-center my-12">Log In</h1>

      <form
        className="flex  justify-center flex-col items-start gap-6 w-full my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          label="Email"
          placeholder="JohnDoe@example.com"
          labelPlacement="outside"
          size="lg"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          label="Password"
          placeholder="*************"
          labelPlacement="outside"
          size="lg"
          {...register("password", { required: "Password is required" })}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeIcon className="w-6 h-6 text-default-400" />
              ) : (
                <EyeSlashIcon className="w-6 h-6 text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Button
          isLoading={loading}
          type="submit"
          className="w-full bg-[#99000B] text-white text-xl py-6"
        >
          Continue
        </Button>
      </form>

      <div className="flex justify-between sm:flex-row flex-col gap-1 item-center">
        <Link href="/driver/sign-up" className="text-[#99000B] text-md">
          Don’t have an account? Sign up
        </Link>

        <div
          className="cursor-pointer "
          onClick={() => setOpenModal(!openModal)}
        >
          <p className="text-[#99000B] text-md">Forgot Password? Click Here</p>
        </div>
      </div>

      <ForgotPassword isModalOpen={openModal} />

      <div className="flex my-4 gap-4 flex-col">
        <p className="text-sm">
          By logging in, you agree to Rent Eagle{" "}
          <span className="text-[#99000B] ">
            terms of service and privacy policy
          </span>{" "}
        </p>
      </div>
      {userRole && (
        <ErrorModal
          from={userRole}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
};

export default Index;
