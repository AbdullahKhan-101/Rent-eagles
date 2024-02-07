"use client";
import GetApproved from "@/components/Host/GetApproved";
import OtpVerificationHost from "@/components/Host/OtpVerificationHost";
import OtpVerification from "@/components/OTP/OtpVerification";
import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const Index = () => {
  return (
    <div>
      <OtpVerificationHost />
      <GetApproved />
    </div>
  );
};

export default Index;
