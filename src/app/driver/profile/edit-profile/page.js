'use client'
import GetApproved from '@/components/Driver/GetApproved';
import OtpVerification from '@/components/OTP/OtpVerification';
import { Button, Input } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const Index = () => {
   
    return (
       <div>
        <OtpVerification />
        <GetApproved />

        </div>

    );
};

export default Index;
