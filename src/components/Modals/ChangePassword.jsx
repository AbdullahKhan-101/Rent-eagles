// Import necessary libraries and modules
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Correct import for yupResolver
import * as yup from "yup"; // Import yup
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Define the validation schema using yup

const ChangePassword = ({ from, isOpen, onOpenChange }) => {
  const validationSchema = yup.object().shape({
    old_password: yup.string().required("Old password is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string().required("Confirm password is required"),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Set up yup resolver
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (from === "driver") {
        const response = await API.ChangeDriverPass(data);
        ToastSuccess(response);
      } else if (from === "host") {
        const response = await API.ChangeHostPass(data);
        ToastSuccess(response);
      }
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
      ToastError(error);
    } finally {
      setLoading(false);
      // handleClose();
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);
  const [isCPVisible, setIsCPVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const togglePVisibility = () => setIsPVisible(!isVisible);
  const toggleCPVisibility = () => setIsCPVisible(!isVisible);

  return (
    <>
      <Modal
        placement="center"
        className=""
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          handleClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-6">
                <div className="">
                  <h4 className="font-bold text-xl">Change Password</h4>
                  <form
                    className="flex  justify-center flex-col items-start gap-6 w-full my-12"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Input
                      // type="password"
                      label="Old Password"
                      placeholder="*************"
                      labelPlacement="outside"
                      size="lg"
                      {...register("old_password")}
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
                    {errors.old_password && (
                      <p className="text-red-500">
                        {errors.old_password.message}
                      </p>
                    )}
                    <Input
                      label="Password"
                      placeholder="*************"
                      labelPlacement="outside"
                      size="lg"
                      {...register("password")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={togglePVisibility}
                        >
                          {isPVisible ? (
                            <EyeIcon className="w-6 h-6 text-default-400" />
                          ) : (
                            <EyeSlashIcon className="w-6 h-6 text-default-400" />
                          )}
                        </button>
                      }
                      type={isPVisible ? "text" : "password"}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <Input
                      label="Confirm Password"
                      placeholder="*************"
                      labelPlacement="outside"
                      size="lg"
                      {...register("confirm_password")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleCPVisibility}
                        >
                          {isCPVisible ? (
                            <EyeIcon className="w-6 h-6 text-default-400" />
                          ) : (
                            <EyeSlashIcon className="w-6 h-6 text-default-400" />
                          )}
                        </button>
                      }
                      type={isCPVisible ? "text" : "password"}
                    />
                    {errors.confirm_password && (
                      <p className="text-red-500">
                        {errors.confirm_password.message}
                      </p>
                    )}
                    <Button
                      type="submit"
                      isLoading={loading}
                      className="bg-red-700 w-full text-white "
                    >
                      Change
                    </Button>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
