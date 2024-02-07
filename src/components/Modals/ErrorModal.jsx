"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const ErrorModal = ({ from, isOpen, onOpenChange }) => {
  console.log(from, "from");
  const router = useRouter();

  const handleClose = () => {
    onOpenChange(false);
    if (from === "host") {
      // console.log("I am here")
      router.push("/host/profile/edit-profile");
    } else if (from === "driver") {
      router.push("/driver/profile/edit-profile");
    }
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
              <ModalBody className="p-6">
                <p>
                  Please Upload your documents to access this site. Thank you!{" "}
                </p>
                <p></p>
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

export default ErrorModal;
