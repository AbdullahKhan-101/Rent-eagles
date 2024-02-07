import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ListingForm4 = ({ bankData }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data, "data");
    try {
      const response = await API.UpdateBankDetails(data);
      ToastSuccess(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastError(error);
    }
  };

  return (
    <>
      <div className=" px-3 flex py-20 justify-center items-center h-full w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-12  lg:max-w-[70%] px-4 w-full  "
        >
          <h2 className="text-xl sm:text-2xl font-bold ">
            Enter your Bank Details
          </h2>

          <div className="flex justify-start flex-wrap sm:flex-nowrap items-center gap-12 w-full">
            <div className="flex flex-col  w-full h-[80px]">
              <Input
                size="md"
                defaultValue={bankData?.bank_name}
                classNames={{
                  label: "text-md font-medium",
                }}
                labelPlacement="outside"
                label="Bank Name"
                placeholder="Name"
                {...register("bank_name", { required: true })}
              />
              {errors.bank_name && (
                <p className="text-red-700">Bank Name is required</p>
              )}
            </div>
            <div className="flex flex-col w-full h-[80px]">
              <Input
                size="md"
                defaultValue={bankData?.account_holder_name}
                classNames={{
                  label: "text-md font-medium",
                }}
                labelPlacement="outside"
                label="Account Holder Name"
                placeholder="Name"
                {...register("account_holder_name", { required: true })}
              />
              {errors.account_holder_name && (
                <p className="text-red-700">Account Holder Name is required</p>
              )}
            </div>
          </div>

          <div className="flex justify-start items-center flex-wrap sm:flex-nowrap gap-12 w-full">
            <div className="flex flex-col w-full h-[80px]">
              <Input
                size="md"
                defaultValue={bankData?.routing_no}
                classNames={{
                  label: "text-md font-medium",
                }}
                labelPlacement="outside"
                label="Routing No"
                placeholder="Number"
                {...register("routing_no", { required: true })}
              />
              {errors.routing_no && (
                <p className="text-red-700">Routing Number is required</p>
              )}
            </div>
            <div className="flex flex-col w-full h-[80px]">
              <Input
                size="md"
                defaultValue={bankData?.account_no}
                classNames={{
                  label: "text-md font-medium",
                }}
                labelPlacement="outside"
                label="Account No"
                placeholder="Number"
                {...register("account_no", { required: true })}
              />
              {errors.account_no && (
                <p className="text-red-700">Account Number is required</p>
              )}
            </div>
          </div>

          <div className="flex justify-start items-center py-6 gap-6">
            <Button
              isLoading={loading}
              className="bg-[#99000B] text-white w-[150px] rounded-none"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ListingForm4;
