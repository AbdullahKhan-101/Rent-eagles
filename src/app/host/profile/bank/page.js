"use client";
import { API } from "@/Api";
import BankForm from "@/components/Host/BankForm";
import ListingForm4 from "@/components/Host/Form/ListingForm4";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const host = useSelector((state) => state.host.host);
  const [bankData, setBankData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GetBankDetails();
        setBankData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(bankData);
  return (
    <div className="flex justify-center items-center">
      {bankData ? (
        <ListingForm4 bankData={bankData} />
      ) : (
        <BankForm host={host} />
      )}
    </div>
  );
};

export default Index;
