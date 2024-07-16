'use client'

import React, { useEffect } from 'react'
import { IconName } from './types'
import * as eva from 'eva-icons';

type IconProps = {
  name: IconName
  size: number
  color: string
  className?: string
}

const Icon = ({ name, size, color, className = '' }: IconProps) => {
  useEffect(() => {
    eva.replace()
  }, [name, size, color, className])

  return (
    <div className={className}>
      <i
        data-eva={name}
        data-eva-fill={color}
        data-eva-width={size}
        data-eva-height={size}
      // data-eva-animation='pulse'
      // data-eva-hover='false'
      // data-eva-infinite='true'
      />
    </div>
  )
}

export default Icon