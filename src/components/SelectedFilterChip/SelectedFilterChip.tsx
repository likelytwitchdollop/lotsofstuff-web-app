import React from 'react'
import { Icon } from '@/components'
import Colors from '@/utils/constants/Colors'

type SelectedFilterChipProps = {
  label: string
  onClick: () => void
}

const SelectedFilterChip = ({ label, onClick }: SelectedFilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className='relative w-fit border border-gray-200 rounded-full px-4 py-1 font-medium hover:bg-gray-200'>
      <div
        className='absolute bg-black grid place-content-center w-6 aspect-square rounded-full -top-3 -right-3'
      >
        <Icon name='close' size={18} color={Colors.white} />
      </div>

      <span>{label}</span>
    </button>
  )
}

export default SelectedFilterChip