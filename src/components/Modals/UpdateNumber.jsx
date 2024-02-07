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
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { SetUserState } from "@/Utils/states";
import { setHost } from "@/redux/slices/hostSlice";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

const UpdateNumberModal = ({ isModalOpen, type }) => {
  const host = useSelector((state) => state.host.host);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [phone, setPhone] = useState(null);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      onOpen();
    }
  }, [isModalOpen]);

  const handleNumberChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpdateNumber = async () => {
    try {
      if (type === 2) {
        const response = await API.UpdatePhoneNumberHost({ phone });
        dispatch(
          setHost({ ...host, is_phone_verified: false, phone_number: phone })
        );

        setContent(response?.data?.message[0]);
        ToastSuccess(response);
      } else {
        const response = await API.UpdatePhoneNumber({ phone });
        dispatch(
          setUser({ ...user, is_phone_verified: false, phone_number: phone })
        );
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Your Phone Number
              </ModalHeader>
              <ModalBody>
                {content ? (
                  <p>{content}</p>
                ) : (
                  <Input
                    endContent={<PhoneIcon className="text-2xl w-12 h-8" />}
                    label="Phone Number"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={handleNumberChange}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => onClose()}>
                  Close
                </Button>

                {content ? null : (
                  <Button color="primary" onPress={handleUpdateNumber}>
                    Update
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

export default UpdateNumberModal;
