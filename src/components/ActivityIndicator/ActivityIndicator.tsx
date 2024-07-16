import React from 'react'
import Icon from '../Icon'

type ActivityIndicatorProps = {
  size: number
  color: string
  className?: string
}

const ActivityIndicator = ({ size, color, className = '' }: ActivityIndicatorProps) => {
  return (
    <div
      className={`
        flex justify-center items-center overflow-hidden relative self-center animate-spin ${className}`}>
      <Icon name='loader-outline' size={size} color={color} />
    </div>
  )
}

export default ActivityIndicator