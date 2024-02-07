import {
  MyDriverBooked,
  driverBooked,
  driverHistory,
  myDriverData,
} from "@/data/tables";
import React from "react";

const MyHistory = () => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto h-[70vh] scrolling overflow-y-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="tablecolor">
                <tr>
                  {driverHistory?.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 whitespace-nowrap py-3 text-left text-xs font-medium text-[#99000B] uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myDriverData?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {driverHistory?.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {row[column]}
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
  );
};

export default MyHistory;
