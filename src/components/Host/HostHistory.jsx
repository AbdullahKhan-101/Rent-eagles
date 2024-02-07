import { API } from "@/Api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NoCarFound from "../NoCarFound";

const HostHistory = () => {
  const [myBookings, setMyBookings] = useState(null);
  const [myColumns, setMyColumns] = useState(null);

  useEffect(() => {
    const bookings = async () => {
      try {
        const response = await API.HostBookingHistory();
        setMyBookings(response?.data?.data);
        setMyColumns(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    bookings();
  }, []);

  
  return myColumns?.length >= 1 ? (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto h-[70vh] scrolling overflow-y-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="tablecolor">
                <tr>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Price Per Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Total Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Car Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Make year
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Car Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Driver
                  </th>
                  <th
                    scope="col"
                    className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myBookings?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["No."]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["status"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["start_date"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["end_date"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["per_day_price"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["total_price"]}
                    </td>

                    <Link href={`/car-details?id=${row["car_id"]}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {row["car_name"]}
                      </td>
                    </Link>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["make_year"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["car_number"]}
                    </td>
                    <Link href={`/driver/profile-details?id=${row["driver_id"]}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {row["Driver"]}
                      </td>
                    </Link>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {row["location"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NoCarFound/>
  );
};

export default HostHistory;
