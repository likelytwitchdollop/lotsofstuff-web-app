import React from 'react'
import Colors from '@/utils/constants/Colors'
import { Toaster } from 'react-hot-toast'

const Toast = () => {
  return (
    <Toaster
      position="bottom-center"
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: Colors.black,
          color: Colors.white,
        }
      }}
    />
  )
}

export default Toast