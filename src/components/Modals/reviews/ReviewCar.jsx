import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Controller, useForm } from "react-hook-form";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";

const ReviewCar = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [allRatings, setAllRatings] = useState([
    {
      type: "cleanliness",
      id: 1,
      rating: 0,
    },
    {
      type: "maintenance",
      id: 2,
      rating: 0,
    },
    {
      type: "communication",
      id: 3,
      rating: 0,
    },
    {
      type: "convenience",
      id: 4,
      rating: 0,
    },
    {
      type: "accuracy",
      id: 5,
      rating: 0,
    },
  ]);

  const handleStarClick = (clickedRating, id) => {
    const updatedRatings = allRatings.map((item) =>
      item.id === id ? { ...item, rating: clickedRating } : item
    );
    setAllRatings(updatedRatings);
  };

  const onSubmit = async (data) => {
    try {
      const submittedData = {
        description: data.feedback,
        rating:
          allRatings.reduce((sum, rating) => sum + rating.rating, 0) /
          allRatings.length,
        cleanliness: allRatings.find((rating) => rating.type === "cleanliness")
          .rating,
        maintenance: allRatings.find((rating) => rating.type === "maintenance")
          .rating,
        communication: allRatings.find(
          (rating) => rating.type === "communication"
        ).rating,
        convenience: allRatings.find((rating) => rating.type === "convenience")
          .rating,
        accuracy: allRatings.find((rating) => rating.type === "accuracy")
          .rating,
      };

      const response = await API.PostCarReview(id, submittedData);
      ToastSuccess(response);
      setAllRatings([
        { type: "cleanliness", id: 1, rating: 0 },
        { type: "maintenance", id: 2, rating: 0 },
        { type: "communication", id: 3, rating: 0 },
        { type: "convenience", id: 4, rating: 0 },
        { type: "accuracy", id: 5, rating: 0 },
      ]);
      onClose();
      reset();
    } catch (error) {
      ToastError(error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="max-w-[200px] w-full bg-red-700 text-white"
      >
        Submit your experience
      </Button>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={isOpen}
        classNames={{
          body: "py-6",
          header: "border-b-[1px] border-red-700",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        onClose={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Write Review
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-5">
                {allRatings?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-start"
                  >
                    <p>{item?.type}</p>
                    <div className="flex justify-center items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-7 w-8 cursor-pointer ${
                            star <= item?.rating
                              ? "text-[#FFC123]"
                              : "text-gray-400"
                          }`}
                          onClick={() => handleStarClick(star, item?.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-3 w-full">
                <Controller
                  name="feedback"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Feedback is required" }}
                  render={({ field }) => (
                    <>
                      <Textarea
                        {...field}
                        label="Feedback"
                        labelPlacement="outside"
                        classNames={{
                          label: "text-medium",
                        }}
                        placeholder="Enter your Review"
                      />
                      {errors.feedback && (
                        <p className="text-red-500 py-3">
                          {errors.feedback.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewCar;
