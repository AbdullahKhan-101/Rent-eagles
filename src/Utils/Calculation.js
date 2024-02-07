import moment from "moment";

export const calculateTotal = (mydata  ,price_per_day) => {

    const startDate = moment(
      `${mydata?.start_date?.split("T")[0]} ${mydata?.start_time}`,
      "YYYY-MM-DD HH:mm"
    );
    const endDate = moment(
      `${mydata?.end_date?.split("T")[0]} ${mydata?.end_time}`,
      "YYYY-MM-DD HH:mm"
    );

    let hours = endDate.diff(startDate, "hours");
    const days = Math.ceil(hours / 24);
    return days * price_per_day;
  };