import { API } from "@/Api";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderCars from "./CalenderCars";

const CalenderComponent = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [apiCarsData, setApiCarsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await API.HostCalender();
        setApiCarsData(apiResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filterData = apiCarsData?.filter((item) => {
    if (!selectedDateRange) return false;

    const [startDate, endDate] = selectedDateRange;

    return (
      (moment(item?.start_date).format("YYYY-MM-DD") === moment(startDate).format("YYYY-MM-DD") ||
      moment(item?.end_date).format("YYYY-MM-DD") === moment(endDate).format("YYYY-MM-DD") ||
      moment(item?.start_date).isBetween(moment(startDate), moment(endDate))) && item?.status != "rejected"
    );
  });

  return (
    <div className="app">
      <div className="calendar-container max-w-[50%] w-full">
        <Calendar onChange={setSelectedDateRange} selectRange={true} />
      </div>

      {filterData?.map((item, index) => (
        <CalenderCars key={index} data={item} />
      ))}
    </div>
  );
};

export default CalenderComponent;
