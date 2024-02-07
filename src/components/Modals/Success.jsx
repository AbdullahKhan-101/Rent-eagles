"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Success = ({ isOpen, onOpenChange }) => {
    const router = useRouter();

  const handleClose = () => {
    onOpenChange(false);
  };

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
              <ModalHeader>
                <p className="text-center mx-auto text-xl font-bold">
                  Thank you for booking!
                </p>
              </ModalHeader>
              <ModalBody className="p-4">
                <div className="text-center">
                  <div className="w-16 p-2 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-16 h-16 mx-auto text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-lg font-semibold">
                    Payment has been successful done!
                  </p>
                  <p className="text-gray-500">
                    Return for more bookings soon!
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-green-500 w-full hover:bg-green-600  text-white hover:text-green-600"
                  color="success"
                  variant="light"
                  onPress={() => {
                    handleClose();
                    onClose();
                    router.push("/");
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

export default Success;
