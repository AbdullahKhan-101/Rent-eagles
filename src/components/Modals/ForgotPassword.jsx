import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";

const ForgotPassword = ({ isModalOpen, type }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
    }
  }, [isModalOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = async () => {
    try {
      if (type === 2) {
        const response = await API.ResetPasswordHost({ email });
        setContent(response?.data?.message[0]);
        ToastSuccess(response);
      } else {
        const response = await API.ResetPassword({ email });
        setContent(response?.data?.message[0]);
        ToastSuccess(response);
      }
    } catch (error) {
      setContent(error?.response?.data?.message[0]);
      ToastError(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reset Password
              </ModalHeader>
              <ModalBody>
                {content ? (
                  <p>{content}</p>
                ) : (
                  <Input
                    endContent={<EnvelopeIcon className="text-2xl w-12 h-8" />}
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>

                {content ? null : (
                  <Button color="primary" onPress={handleReset}>
                    Reset
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassword;
