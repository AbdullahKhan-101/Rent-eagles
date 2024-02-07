"use client";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { Button, Checkbox, Input, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { setCookie } from "@/hooks/cookies";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { SetUserState } from "@/Utils/states";
import ErrorModal from "@/components/Modals/ErrorModal";
import { setHost } from "@/redux/slices/hostSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Index = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await API.SignUpDriver(formData);
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
      // setLoading(false);
      // ToastSuccess(response);
      // router.push("/");
    } catch (error) {
      ToastError(error);
      setLoading(false);
      console.log(error?.response?.data?.message[0]);
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
    <div className="max-w-[80%] lg:max-w-[40%] mx-auto">
      <h1 className="text-center my-12">Driver Sign-Up</h1>

      <form
        className="flex  justify-center flex-col items-start gap-6 w-full my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-12 w-full">
          <div className="flex flex-col gap-3 mt-3 w-full h-full ">
            <Input
              type="text"
              label="First Name"
              placeholder="John"
              labelPlacement="outside"
              size="lg"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-3 w-full h-full">
            <Input
              type="text"
              label="Last Name"
              placeholder="Doe"
              labelPlacement="outside"
              size="lg"
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <p>Enter your name as it appears on your driver’s license</p>

        <Input
          type="text"
          label="Email"
          placeholder="JohnDoe@example.com"
          labelPlacement="outside"
          size="lg"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          label="Password"
          placeholder="Example: Password1@"
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

        <div className="flex flex-col justify-center items-start gap-3">
          <Controller
            control={control}
            name="agreeToTerms"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                color="danger"
                onValueChange={onChange}
                isSelected={value}
              >
                I agree to the terms of service and privacy policy
              </Checkbox>
            )}
          />
          {errors.agreeToTerms && (
            <p className="text-red-500">This field is required</p>
          )}

          <Controller
            control={control}
            name="email_notifications"
            render={({ field: { onChange, value } }) => (
              <Checkbox color="danger" onChange={onChange} isSelected={value}>
                Send me promotions and announcements via email
              </Checkbox>
            )}
          />
        </div>

        <Button
          isLoading={loading}
          type="submit"
          className="w-full bg-[#99000B] text-white text-xl py-6"
        >
          Sign Up
        </Button>
      </form>
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
