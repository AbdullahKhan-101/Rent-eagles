'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const Index = () => {

  useEffect(() => {

    redirect("/host/dashboard/my-cars")

  }, [])

  return (
    <div>Loading.....</div>
  )
}

export default Index