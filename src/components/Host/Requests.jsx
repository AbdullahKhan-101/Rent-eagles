import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const Requests = () => {
  const [myBookings, setMyBookings] = useState(null);
  const [myColumns, setMyColumns] = useState(null);

  const bookings = async () => {
    try {
      const response = await API.HostBookingRequests();
      setMyBookings(response?.data?.data);
      setMyColumns(Object.keys(response?.data?.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproval = async (id) => {
    try {
      const response = await API.HostBookingAction({
        id: id,
        approved: true,
        reject: false,
      });
      await bookings();
      ToastSuccess(response);
    } catch (error) {
      ToastError(error);
    }
  };

  const handleCancellation = async (id) => {
    try {
      const response = await API.HostBookingAction({
        id: id,
        approved: false,
        reject: true,
      });
      ToastSuccess(response);
      await bookings();
    } catch (error) {
      ToastError(error);
    }
  };

  useEffect(() => {
    bookings();
  }, []);

  return myColumns ? (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto h-[70vh] scrolling overflow-y-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="tablecolor">
                <tr>
                  {myColumns?.map((column, index) =>
                    column === "id" ? (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                      >
                        <p>Approve/Reject</p>
                      </th>
                    ) : (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                      >
                        {column.replace(/_/g, " ")}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myBookings?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {myColumns?.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {column === "id" ? (
                          <div className="flex justify-start items-center gap-4">
                            <button
                              onClick={() => handleApproval(row["id"])}
                              className="text-green-500 hover:text-green-700 cursor-pointer"
                            >
                              <CheckCircleIcon className="h-8 w-8" />
                            </button>
                            <button
                              onClick={() => handleCancellation(row["id"])}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <XCircleIcon className="h-8 w-8" />
                            </button>
                          </div>
                        ) : (
                          // Render the content of other columns
                          row[column]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>No Bookings at the moment</p>
  );
};

export default Requests;
