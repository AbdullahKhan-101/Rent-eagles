import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");

    config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//  driver

API.loginDriver = (data) => {
  return API.post("driver/signin", data);
};

API.SignUpDriver = (data) => {
  return API.post("driver/signup", data);
};

API.ResetPassword = (data) => {
  return API.post("password/driver/reset", data);
};
API.VerifyToken = (data, token) => {
  return API.post(`password/driver/verify/${token}`, data);
};
API.SendOtp = (data) => {
  return API.post("driver/auth/send/otp", data);
};
API.VerifyOtp = (data) => {
  return API.post("driver/auth/verify/otp", data);
};
API.UpdatePhoneNumber = (phone) => {
  return API.put("driver/auth/update/phone", phone);
};
// working on fixings
API.GetApprovedDriver = (data) => {
  return API.post("driver/auth/approved/drive", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

API.VerifyEmail = (email) => {
  return API.post("driver/auth/send/verify/email", email);
};
API.VerifyEmailToken = (token) => {
  return API.post(`driver/auth/verify/email/${token}`);
};

API.BookingDriver = (data) => {
  return API.post(`booking/auth/create/booking`, data);
};
API.GetBookings = () => {
  return API.get(`driver/auth/get/booking`);
};
API.GetBookingsHistory = () => {
  return API.get(`driver/auth/get/booking/completed`);
};
API.PostCarReview = (id, formdata) => {
  return API.post(`driver/auth/review/car/${id}`, formdata);
};

// host

API.SignUpHost = (data) => {
  return API.post("host/signup", data);
};
API.SignInHost = (data) => {
  return API.post("public/login", data);
  // return API.post("host/signin", data);
};
API.SendEmailHost = (data) => {
  return API.post("host/auth/send/verify/email", data);
};
API.ConfirmEmailHost = (token) => {
  return API.post(`host/auth/verify/email/${token}`);
};
API.SendOtpHost = (data) => {
  return API.post("host/auth/send/otp", data);
};

API.VerifyOtpHost = (data) => {
  return API.post("host/auth/verify/otp", data);
};

API.UpdatePhoneNumberHost = (phone) => {
  return API.put("host/auth/update/phone", phone);
};
API.DriverGivingReviewToHost = (id, data) => {
  return API.post(`driver/auth/review/host/${id}`, data);
};

API.HostGivingReviewToDriver = (data) => {
  return API.post(`host/auth/review/driver`, data);
};

API.ChangeDriverPass = (data) => {
  return API.patch(`driver/auth/change/password`, data);
};

API.ChangeHostPass = (data) => {
  return API.patch(`host/auth/change/password`, data);
};

// working on fixings
API.GetApprovedDriverHost = (data) => {
  return API.post("host/auth/get/approved/list/car", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

API.ListCar = (id, data) => {
  return API.post(`host/auth/list/car/${id}`, data);
};
API.ImageCDN = (data) => {
  return API.post("host/auth/list/car/upload/photos", data);
};
API.ResetPasswordHost = (data) => {
  return API.post("password/host/reset", data);
};
API.VerifyResetPasswordHost = (formdata, token) => {
  return API.post(`password/host/verify/${token}`, formdata);
};

API.GetBankDetails = () => {
  return API.get("host/auth/bank/details");
};
API.PostBankDetails = (formdata) => {
  return API.post("host/auth/add/bank", formdata);
};
API.UpdateBankDetails = (formdata) => {
  return API.patch("host/auth/update/bank", formdata);
};

API.GetHostCars = () => {
  return API.get("host/auth/get/cars");
};
API.GetSingleCar = (id) => {
  return API.get(`host/auth/get/car/${id}`);
};
API.GetSingleCarReview = (id) => {
  return API.get(`host/auth/get/car/reviews/${id}`);
};
API.GetSingleCarReviewData = (id) => {
  return API.get(`host/auth/get/car/driver/reviews/${id}`);
};
API.MyRenters = () => {
  return API.get("host/auth/host/booking");
};
API.HostBookingHistory = () => {
  return API.get("host/auth/completed/booking");
};
API.HostBookingRequests = () => {
  return API.get("host/auth/booking/requests");
};
API.HostCalender = () => {
  return API.get("host/auth/get/cars/calendarwise");
};
API.HostBookingAction = (data) => {
  return API.patch("host/auth/actions/booking", data);
};

// public apis

API.LoginDriverHost = (data) => {
  return API.post("public/login", data);
};

API.PublicCarsDetails = (id) => {
  return API.get(`public/get/car/${id}`);
};
API.PublicCarsRatings = (id) => {
  return API.get(`public/get/car/reviews/${id}`);
};
API.PublicCarsReviews = (id) => {
  return API.get(`public/get/car/driver/reviews/${id}`);
};

API.PublicCarAllReviews = (id) => {
  return API.get(`public/car/reviews/${id}`);
};
API.GetHostPublic = (id) => {
  return API.get(`public/host/profile/${id}`);
};
API.GetDriverPublic = (id) => {
  return API.get(`public/driver/profile/${id}`);
};
API.GetHostCarsPub = (id) => {
  return API.get(`public/host/get/cars/${id}`);
};
API.GetHostPubReviews = (id) => {
  return API.get(`public/host/reviews/${id}`);
};
API.GetDriverPubReviews = (id) => {
  return API.get(`public/driver/reviews/${id}`);
};
API.GetTopHosts = (name) => {
  return API.get(`public/top/hosts/city/${name}`);
};

API.GetAllCars = (placeId, start_date, end_date, start_time, end_time) => {
  // return API.get(`public/get/all/cars`);
  // return API.get(`public/get/all/cars?skip=${skip}&take=${take}`);
  return API.get(
    `public/get/available/cars?placeId=${placeId}&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}`
  );
};

API.GetCarsByBrand = (brand) => {
  return API.get(`public/get/car/by/brand/${brand}`);
};

API.GetReviewsByBrand = (brand) => {
  return API.get(`public/get/car/reviews/vehicle/${brand}`);
};

API.GetTopHost = () => {
  return API.get(`public/top/hosts`);
};

API.GetCarsByCategory = (category) => {
  return API.get(`public/get/car/by/vehicle/type/${category}`);
};

// switch
API.SwitchToHost = () => {
  return API.post("driver/auth/switch/host");
};

API.SwitchToDriver = () => {
  return API.post("host/auth/switch/driver");
};

API.getDriver = () => {
  return API.get("driver/auth/profile");
};

API.getHost = () => {
  return API.get("host/auth/profile");
};
// locked cars
API.getLockDates = (id) => {
  return API.post("host/auth/car/locked/dates", id);
};

API.unlockCar = (data) => {
  return API.post("host/auth/unlock/car", data);
};

API.addLockCar = (data) => {
  return API.post("host/auth/lock/car", data);
};

export { API };
