import { clearStepForm } from "@/redux/slices/formSlice";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormCard = ({ children, currentStep, prevFormStep }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(clearStepForm());
  // }, []);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="max-w-[85%] sm:max-w-[60%] w-full mx-auto my-20 flex flex-col justify-center gap-5">
      <h1>List your car</h1>
      <div>
        <p>{currentStep} of 4 steps</p>
      </div>
      <div className="flex items-center gap-8">
        <Progress
          className="bg-red-400 !p-0 rounded  "
          classNames={{
            indicator: "bg-red-700",
            value: "text-foreground/60",
          }}
          value={currentStep * 25}
        />
        <Button
          onClick={() => onOpen()}
          variant="bordered"
          className="rounded-md !px-5 font-medium"
        >
          View all steps
        </Button>
      </div>
      {children}

      <ViewAll
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        currentStep={currentStep}
      />
    </div>
  );
};

export default FormCard;

const ViewAll = ({ isOpen, onOpenChange, currentStep }) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <>
      <Modal
        placement="center"
        className=""
        size="xl"
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
                <div className="max-w-[600px] pt-4 w-full flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 justify-between items-center w-full">
                      <h2 className="!font-bold !text-xl">Car Details</h2>
                      <div className="flex flex-1 justify-end items-center gap-2">
                        <div
                          className={` border border-dashed flex-1 w-full  ${
                            currentStep > 1
                              ? "border-red-700"
                              : "border-gray-700"
                          } `}
                        ></div>
                        <CheckCircleIcon
                          className={`w-7 h-7 ${
                            currentStep > 1 ? "text-red-700" : "text-gray-700"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 justify-between items-center w-full">
                      <h2 className="!font-bold !text-xl">Car Availibility</h2>
                      <div className="flex flex-1 justify-end items-center gap-2">
                        <div
                          className={` border border-dashed flex-1 w-full  ${
                            currentStep > 2
                              ? "border-red-700"
                              : "border-gray-700"
                          } `}
                        ></div>
                        <CheckCircleIcon
                          className={`w-7 h-7 ${
                            currentStep > 2 ? "text-red-700" : "text-gray-700"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 justify-between items-center w-full">
                      <h2 className="!font-bold !text-xl">Payout Details</h2>
                      <div className="flex flex-1 justify-end items-center gap-2">
                        <div
                          className={` border border-dashed flex-1 w-full  ${
                            currentStep > 3
                              ? "border-red-700"
                              : "border-gray-700"
                          } `}
                        ></div>
                        <CheckCircleIcon
                          className={`w-7 h-7 ${
                            currentStep > 3 ? "text-red-700" : "text-gray-700"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 justify-between items-center w-full">
                      <h2 className="!font-bold !text-xl">
                        Submit your listing
                      </h2>
                      <div className="flex flex-1 justify-end items-center gap-2">
                        <div className=" border border-dashed flex-1 w-full border-gray-500"></div>
                        <CheckCircleIcon className="w-7 h-7 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-sky-100"
                  color="primary"
                  variant="light"
                  onPress={() => {
                    handleClose();
                    onClose();
                  }}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
