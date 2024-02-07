"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";

const LockCar = ({ isOpen, onOpenChange, lockedDates, getLockedDates, id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  //   const getLockedDates = async () => {
  //     const res = await API.getLockDates({ car_id: id });
  //     console.log(res, "res....");
  //   };

  const callAddAPI = async () => {
    setLoading(true);
    try {
      const newRes = await API.addLockCar({
        carId: id,
        dates: [date],
      });
      if (newRes) {
        ToastSuccess(newRes);
        getLockedDates();
        handleClose();
      }
    } catch (error) {
      console.log(error, "error");
      ToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    onOpenChange(false);
  };

  //   useEffect(() => {
  //     getLockedDates();
  //   }, []);

  //   console.log(lockedDates?.data?.locked_dates, "map");

  const unlockNow = async (date) => {
    try {
      const newRes = await API.unlockCar({
        carId: id,
        date: date,
      });
      if (newRes) {
        ToastSuccess(newRes);
        getLockedDates();
      }
    } catch (error) {
      console.log(error, "error");
      ToastError(error);
    }
  };

  return (
    <>
      <Modal
        placement="center"
        className=""
        size="md"
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
                {lockedDates?.data?.locked_dates?.length && (
                  <h2 className="font-semibold text-lg border-b">
                    Car is Locked on the Following Dates
                  </h2>
                )}

                <div className="">
                  <div className="max-h-[400px] overflow-y-auto custom_scroll ">
                    {lockedDates?.data?.locked_dates?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex mb-2 bg-violet-50 py-1 px-2 rounded-lg items-center gap-4"
                        >
                          {/* <p className="">{`${new Date(item).getDay()} - ${
                            new Date(item).getMonth() + 1
                          } - ${new Date(item).getFullYear()}`}</p> */}
                          <p>{item}</p>
                          <LockClosedIcon className="w-4 h-4 text-red-500" />
                          <Tooltip
                            placement={"right"}
                            content={"Unlock on this date"}
                            color="default"
                            size="sm"
                          >
                            <LockOpenIcon
                              onClick={() => unlockNow(item)}
                              className="w-4 cursor-pointer h-4 text-green-500"
                            />
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>
                  <div className="py-2 border-y mt-4">
                    <label htmlFor="date" className="mr-2">
                      Add new date
                    </label>
                    <input
                      className="bg-gray-100 p-1 px-2 border-none outline-none rounded-lg"
                      type="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="date"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-sky-100"
                  color="primary"
                  variant="light"
                  isLoading={loading}
                  onPress={() => {
                    callAddAPI();
                    //   onClose();
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

export default LockCar;
