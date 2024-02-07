import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import {
  clearStepForm,
  setStepForm,
  setStepNumber,
} from "@/redux/slices/formSlice";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ListingForm5 = ({ stepform }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleBack = () => {
    dispatch(setStepNumber());
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      for (let i = 0; i < 10; i++) {
        formdata.append(`photo${i + 1}`, stepform?.car_images[i]?.image);
      }
      const response = await API.ImageCDN(formdata);
      // ToastSuccess(response);
      const id = response?.data?.data[0]?.id;
      const response2 = await API.ListCar(id, stepform);
      dispatch(clearStepForm());
      ToastSuccess(response2);
      setLoading(false);
      router.push("/host/dashboard/my-cars");
    } catch (error) {
      setLoading(false);
      ToastError(error);
    }
  };
  return (
    <div className="w-full max-w-[90%] flex justify-center items-center">
      <div className=" flex flex-col w-full gap-5">
        <h3 className="text-start  text-lg sm:text-2xl font-bold ">
          Submit your listing
        </h3>

        <div className="max-w-[600px] w-full flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="!font-bold !text-xl">Car Details</h2>
              <div className="flex justify-end items-center gap-2">
                <p className="text-red-700">
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - -
                </p>
                <CheckCircleIcon className="w-7 h-7 text-red-700" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="!font-bold !text-xl">Car Availibility</h2>
              <div className="flex justify-end items-center gap-2">
                <p className="text-red-700">
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - -
                </p>
                <CheckCircleIcon className="w-7 h-7 text-red-700" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="!font-bold !text-xl">Payout Details</h2>
              <div className="flex justify-end items-center gap-2">
                <p className="text-red-700">
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - -
                </p>
                <CheckCircleIcon className="w-7 h-7 text-red-700" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="!font-bold !text-xl">Submit your listing</h2>
              <div className="flex justify-end items-center gap-2">
                <p className="text-gray-700">
                  - - - - - - - - - - - - - - - - - - - - - - - - -
                </p>
                <CheckCircleIcon className="w-7 h-7 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col gap-6 w-full  ">
          <div className="flex justify-end items-center py-6 gap-6">
            <Button
              onClick={handleBack}
              className="bg-[#99000B] text-white w-[150px] rounded-none"
            >
              Back
            </Button>

            <Button
              isLoading={loading}
              className="bg-[#99000B] text-white w-[150px] rounded-none"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingForm5;
