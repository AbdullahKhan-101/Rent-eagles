'use client'
import { API } from '@/Api';
import { BackEndResponse, BackEndResponseError, SetUserState } from '@/Utils/states';
import { setHost } from '@/redux/slices/hostSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
    const params = useSearchParams();
    const token = params.get('token')
    const type = params.get('type')
    const router = useRouter();
    const [backEndResponse, setBackEndResponse] = useState(null)
    const user = useSelector((state) => state.user.user)
    const host = useSelector((state) => state.host.host)
    const dispatch = useDispatch()

    useEffect(() => {

        const verificationEmail = async () => {
            try {
                if (Number(type) === 2) {
                    const response = await API.ConfirmEmailHost(token)
                    setBackEndResponse(BackEndResponse(response))
                    dispatch(setHost({ ...host, is_email_verified: true }))
                }
                else {
                    const response = await API.VerifyEmailToken(token)
                    setBackEndResponse(BackEndResponse(response))
                    dispatch(setUser({ ...user, is_email_verified: true }))

                }
            } catch (error) {
                console.log(error)
                setBackEndResponse(BackEndResponseError(error))
            }

        }
        verificationEmail()

        return () => {
            setTimeout(() => {
                router.push("/")
            }, 5000)
        }
    }, [token])

    return (
        <div>
            <h1 className='w-full text-center'>
                {backEndResponse}
            </h1>
        </div>
    )
}

export default Index