'use client'
import { API } from '@/Api';
import { ToastError, ToastSuccess } from '@/Utils/toast';
import { Button, Input } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Index = () => {
    const params = useSearchParams();
    const token = params.get('token')
    const type = params.get('type')
    const router = useRouter();

    const [formData, setFormData] = useState({
        password: '',
        confirm_password: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Number(type) === 2) {
                const response = await API.VerifyResetPasswordHost(formData, token)
                ToastSuccess(response)
                router.push("/host/log-in")
            }
            else {

                const response = await API.VerifyToken(formData, token)
                ToastSuccess(response)
                router.push("/log-in")
            }


        } catch (error) {
            ToastError(error)
        }
    };

    return (
        <div className='max-w-[80%] sm:max-w-[40%] mx-auto w-full'>
            <h1 className='text-start my-12'>Confirmed Your Password</h1>

            <form className='flex  justify-center flex-col items-start gap-6 w-full my-12' onSubmit={handleSubmit}>

                <Input
                    type='password'
                    label='Password'
                    placeholder='*************'
                    labelPlacement='outside'
                    size='lg'
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Input
                    type='password'
                    label='Confirm Password'
                    placeholder='*************'
                    labelPlacement='outside'
                    size='lg'
                    value={formData.confirm_password}
                    onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                />

                <Button type='submit' className='w-full bg-[#99000B] text-white text-xl py-6'>
                    Continue
                </Button>
            </form>




        </div>
    )
}

export default Index