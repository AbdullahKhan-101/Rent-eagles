import { API } from "@/Api";
import StripeComponent from "@/components/Stripe/StripeComponent";
import { calculateTotal } from "@/Utils/Calculation";
import { Searchparams } from "@/Utils/searchParams";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BookingForm = ({ id, setAllowed, setPaymentID, price_per_day }) => {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const start_date = Searchparams("start_date");
  const start_time = Searchparams("start_time");
  const end_date = Searchparams("end_date");
  const end_time = Searchparams("end_time");

  const [total, setTotal] = useState(null);
  const [mydata, setMydata] = useState({});

  let pricingData;

  useEffect(() => {
    pricingData = getValues();
    setMydata(pricingData);
    setTotal(calculateTotal(mydata, price_per_day));
  }, [pricingData]);

  // const user = useSelector((state) => state.user.user);
  const host = useSelector((state) => state.host.host);

  const onSubmit = async (data) => {
    if (host) {
      toast.error("Please switch your profile to 'Driver' mode");
    } else {
      try {
        const response = await API.BookingDriver({
          ...data,
          carId: Number(id),
        });
        setPaymentID(response?.data?.data[0]?.client_secret);
        setAllowed(true);
        // ToastSuccess(response);
        reset();
      } catch (error) {
        ToastError(error);
      }
    }
  };
  const today = moment().format("YYYY-MM-DD");

  return (
    <>
      <div className="hidden sm:block" style={{ float: "inline-end" }}>
        <h2 className="font-bold text-xl sm:text-2xl  ">
          ${price_per_day}/day
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  w-full h-full flex flex-col justify-center items-start"
      >
        <div className="flex justify-start items-center gap-3 h-full w-full">
          <div className="w-full h-[120px]  ">
            <label className="">Start date</label>
            <Input
              type="date"
              defaultValue={start_date?.split("T")[0] || null}
              {...register("start_date", {
                required: "Start Date is required",
              })}
              min={today}
            />
            {errors.start_date && (
              <p className="text-red-700">{errors.start_date.message}</p>
            )}
          </div>
          <div className="w-full h-[120px]  ">
            <label className="">Start Time</label>
            <Input
              type="time"
              defaultValue={start_time || null}
              {...register("start_time", { required: "Time is required" })}
            />
            {errors.start_time && (
              <p className="text-red-700">{errors.start_time.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-start items-center gap-3 w-full">
          <div className="w-full h-[120px]  ">
            <label className="">End date</label>
            <Input
              type="date"
              defaultValue={end_date?.split("T")[0] || null}
              {...register("end_date", {
                required: "End Date is required",
              })}
            />
            {errors.end_date && (
              <p className="text-red-700">{errors.end_date.message}</p>
            )}
          </div>
          <div className="w-full h-[120px]  ">
            <label className="">End Time</label>
            <Input
              type="time"
              defaultValue={end_time || null}
              {...register("end_time", { required: "End Time is required" })}
            />
            {errors.end_time && (
              <p className="text-red-700">{errors.end_time.message}</p>
            )}
          </div>
        </div>

        <div className="w-full h-[120px]  ">
          <label className="">Pickup, Deliver & return location</label>
          <Input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-700">{errors.address.message}</p>
          )}
        </div>

        <div className=" flex justify-between w-full pb-8">
          <h2 className="font-bold text-xl sm:text-2xl  ">Total</h2>
          {total ? (
            <h2 className="font-bold text-xl sm:text-2xl  ">{total}$</h2>
          ) : (
            <h2 className="font-bold text-xl sm:text-2xl  ">
              {price_per_day}$
            </h2>
          )}
        </div>

        <div className="w-full">
          <Button type="submit" fullWidth className="bg-[#99000B] text-white  ">
            Book A Car
          </Button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
