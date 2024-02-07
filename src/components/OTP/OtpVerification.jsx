import { API } from "@/Api";
import { SetUserState } from "@/Utils/states";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { setUser } from "@/redux/slices/userSlice";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateNumberModal from "../Modals/UpdateNumber";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const user = useSelector((state) => state.user.user);
  // console.log(user, "otp");
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20);
  const [openPhoneModal, setOpenModal] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const startTimer = () => {
    setButtonDisabled(true);
    setRemainingTime(20);
  };

  const handleInputChange = (field, value) => {
    if (field === "phone") {
      setPhone(value);
    } else if (field === "otp") {
      setOtp(value);
    }
  };

  const handleSendOtp = async (data) => {
    // console.log(data, "data...");
    setPhone(data.phone);
    setOtpLoading(true);
    try {
      const response = await API.SendOtp({ phone: data.phone });
      startTimer();
      ToastSuccess(response);
    } catch (error) {
      ToastError(error);
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setButtonDisabled(false);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, [openPhoneModal]);
  useEffect(() => {
    setPhone(user?.phone_number || "");
    setOtp("");
  }, [user?.phone_number]);

  const [verify, setVerify] = useState(false);

  // const [driverData, setDriverData] = useState("");
  // const getDriverData = async () => {
  //   const res = await API.getDriver();
  //   console.log(res?.data?.data[0]?.user, "res........");
  //   // setDriverData()
  // };
  // useEffect(() => {
  //   getDriverData();
  // }, []);

  return (
    <div className="lg:max-w-[70%] px-4 my-12 w-full mx-auto flex flex-col justify-center items-start gap-8">
      <h1>Get Approved To Drive</h1>
      <p>Contact Information</p>

      <form
        onSubmit={handleSubmit(handleSendOtp)}
        className="px-3  sm:max-w-[45%] w-full"
      >
        <Input
          type="text"
          label="Phone Number"
          placeholder="+1 555-555-5555"
          labelPlacement="outside"
          size="lg"
          // value={phone}
          // onChange={(e) => handleInputChange("phone", e.target.value)}
          // pattern="^\+[1-9]\d{0,14}$"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+1[0-9]{10}$/,
              message: "Invalid phone number.",
            },
          })}
          defaultValue={`${user?.phone_number ?? "+1"}`}
        />
        {errors.phone && (
          <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>
        )}
        {!verify ? (
          <div className="flex  justify-end items-center gap-4 my-6">
            {!user?.is_phone_verified ? (
              <Button
                className={`bg-red-700 text-white ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                // onClick={handleSendOtp}
                disabled={isButtonDisabled}
                isLoading={otpLoading}
              >
                {"Send OTP"}
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white float-right  "
                onClick={() => setOpenModal(true)}
              >
                Update
              </Button>
            )}
          </div>
        ) : (
          <div className="flex  justify-end items-center gap-4 my-6">
            <Button
              className="bg-red-700 text-white float-right  "
              onClick={() => setOpenModal(true)}
            >
              Update
            </Button>
          </div>
        )}
      </form>
      {!verify ? (
        <>
          {!user?.is_phone_verified && (
            <div className="sm:max-w-[55%] px-3 w-full ">
              <Divider orientation="horizontal" className=" " />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {!verify ? (
        <>
          {!user?.is_phone_verified ? (
            <OtpInput
              remainingTime={remainingTime}
              isButtonDisabled={isButtonDisabled}
              phone={phone}
              setVerify={setVerify}
            />
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <></>
      )}

      <UpdateNumberModal isModalOpen={openPhoneModal} type={1} />
    </div>
  );
};

export default OtpVerification;

const OtpInput = ({ remainingTime, isButtonDisabled, phone, setVerify }) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (data) => {
    // console.log(phone, "phone...");
    if (!phone) {
      toast.error("Phone number is required");
    } else {
      setLoading(true);
      try {
        const response = await API.VerifyOtp({ phone, otp: data.otp });
        ToastSuccess(response);
        setVerify(true);
        setLoading(false);
        dispatch(
          setUser({ ...user, is_phone_verified: true, phone_number: phone })
        );
        reset();
      } catch (error) {
        ToastError(error);
        setLoading(false);
        reset();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="px-3 sm:max-w-[45%] w-full"
    >
      <Input
        type="text"
        label="Enter Your OTP"
        placeholder="6 digits code"
        labelPlacement="outside"
        size="lg"
        // value={otp}
        // onChange={(e) => handleInputChange("otp", e.target.value)}
        {...register("otp", {
          required: "OTP is required",
          pattern: {
            value: /^[0-9]{1,6}$/,
            message: "Invalid OTP. Please enter up to 6 numeric digits.",
          },
        })}
      />
      {errors.otp && (
        <p className="text-red-500 mt-1 text-sm">{errors.otp.message}</p>
      )}
      <div className="flex justify-end items-center gap-4 my-6">
        <Button
          isLoading={loading}
          type="submit"
          className="bg-red-700 text-white"
          // onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>
      </div>
      {isButtonDisabled && (
        <p>{`Resend in ${Math.floor(remainingTime / 60)}:${
          remainingTime % 60
        }`}</p>
      )}
    </form>
  );
};
