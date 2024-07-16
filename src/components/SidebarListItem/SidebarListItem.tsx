import React from 'react'
import { Icon } from '@/components'
import Colors from '@/utils/constants/Colors'

type SidebarListItemProps = {
  label: string
  onClick: () => void
  selected: boolean
}

const SidebarListItem = ({ label, onClick, selected }: SidebarListItemProps) => {
  return (
    <button
      onClick={onClick}
      className='flex flex-row gap-x-2 items-center group'
    >
      <div className={`
        border border-gray-300 h-6 aspect-square rounded-full grid place-content-center
        group-hover:border-black
        ${selected ? 'bg-black border-none' : ''}
      `}>
        {selected && (
          <Icon name='checkmark' size={16} color={Colors.white} />
        )}
      </div>

      <span className={`
        inline-block px-2 group-hover:underline
        ${selected ? 'bg-black text-white' : ''}
      `}>
        {label}
      </span>
    </button>
  )
}

export default SidebarListItem