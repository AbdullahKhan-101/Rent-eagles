import { API } from "@/Api";
import { SetUserState } from "@/Utils/states";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { setHost } from "@/redux/slices/hostSlice";
import { setUser } from "@/redux/slices/userSlice";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateNumberModal from "../Modals/UpdateNumber";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const OtpVerificationHost = () => {
  const dispatch = useDispatch();
  const host = useSelector((state) => state.host.host);
  const [phone, setPhone] = useState(host?.phone_number || "");
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [openPhoneModal, setOpenModal] = useState(false);

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
    setPhone(data.phone);
    setOtpLoading(true);
    try {
      const response = await API.SendOtpHost({ phone: data.phone });
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
    setPhone(host?.phone_number || "");
    setOtp("");
  }, [host?.phone_number]);
  const [verify, setVerify] = useState(false);

  return (
    <div className="lg:max-w-[70%] px-4 my-12 w-full mx-auto flex flex-col justify-center items-start gap-8">
      <h1>Get Approved To List Cars</h1>
      <p>Contact Information</p>

      <form
        onSubmit={handleSubmit(handleSendOtp)}
        className="px-3 sm:max-w-[45%] w-full"
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
          defaultValue={`${host?.phone_number ?? "+1"}`}
        />
        {errors.phone && (
          <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>
        )}
        {!verify ? (
          <div className="flex justify-end w-full items-center gap-4 my-6">
            {!host?.is_phone_verified ? (
              <Button
                className={`bg-red-700 text-white ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                // onClick={handleSendOtp}
                disabled={isButtonDisabled}
                isLoading={otpLoading}
              >
                Send OTP
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
          <div className="flex justify-end w-full items-center gap-4 my-6">
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
          {!host?.is_phone_verified && (
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
          {!host?.is_phone_verified ? (
            <OtpInput
              remainingTime={remainingTime}
              isButtonDisabled={isButtonDisabled}
              phone={phone}
              setVerify={setVerify}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      <UpdateNumberModal isModalOpen={openPhoneModal} type={2} />
    </div>
  );
};

export default OtpVerificationHost;

const OtpInput = ({ remainingTime, setVerify, isButtonDisabled, phone }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (data) => {
    if (!phone) {
      toast.error("Phone number is required");
    } else {
      setLoading(true);
      try {
        const response = await API.VerifyOtpHost({ phone, otp: data.otp });
        ToastSuccess(response);
        setLoading(false);
        setVerify(true);
        dispatch(
          setHost({ ...host, is_phone_verified: true, phone_number: phone })
        );
      } catch (error) {
        ToastError(error);
        setLoading(false);
      } finally {
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
          className="bg-red-700 text-white"
          // onClick={handleVerifyOtp}
          type="submit"
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
