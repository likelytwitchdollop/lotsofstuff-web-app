import React from 'react'
import ActivityIndicator from '../ActivityIndicator'
import Colors from '@/utils/constants/Colors'

type ButtonProps = {
  title: string
  onClick: () => void
  type?: 'filled' | 'text'
  loading?: boolean
  disabled?: boolean
  className?: string
}

const Button = ({ title, onClick, type = 'filled', loading = false, disabled, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
       py-2 px-6 w-fit font-medium text-lg rounded-full
        ${type === 'filled' ? 'bg-black text-white' : ''}
        ${type === 'filled' && disabled ? 'bg-gray-200 text-gray-300' : ''}
        ${type === 'text' ? 'text-black' : ''}
        ${type === 'text' && disabled ? 'text-gray-300' : ''}
        ${className}
      `}
    >
      {loading && <ActivityIndicator size={28} color={Colors.white} />}
      {!loading && title}
    </button>
  )
}

export default Button