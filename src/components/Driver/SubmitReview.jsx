import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@nextui-org/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const SubmitReview = ({ from, id }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const rating = watch("rating", 0);

  const handleStarClick = (value) => {
    setValue("rating", value);
    clearErrors("rating");
  };

  const onSubmit = async (data) => {
    try {
      if (from === "driver") {
        let completeData = { ...data, driverId: +id };
        const response = await API.HostGivingReviewToDriver(completeData);
        ToastSuccess(response);
      } else {
        const response = await API.DriverGivingReviewToHost(id, data);
        ToastSuccess(response);
      }
    } catch (error) {
      ToastError(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>Submit your Review</div>
      <div className="flex justify-start items-center gap-3">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <StarIcon
            key={index}
            className={`w-7 h-8 cursor-pointer ${
              item <= rating ? "text-red-700" : "text-gray-500"
            }`}
            onClick={() => handleStarClick(item)}
          />
        ))}
        <span className="text-red-500">
          {errors.rating && errors.rating.message}
        </span>
      </div>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <>
            <Textarea
              {...field}
              label="Feedback"
              placeholder="Enter your description"
            />
            <span className="text-red-500">
              {errors.description && errors.description.message}
            </span>
          </>
        )}
      />
      <div className="py-3 w-full">
        <Button
          type="submit"
          className="max-w-[180px] w-full text-white bg-red-700"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SubmitReview;
