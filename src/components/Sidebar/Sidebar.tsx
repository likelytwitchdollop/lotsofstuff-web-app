'use client'

import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'
import { useClickOutsideToClose } from '@/hooks'

export type SidebarComponent = {
  show: () => void
  hide: () => void
  toggle: () => void
  visible: boolean
}

type SidebarProps = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  containerClassName?: string
}

const Sidebar = ({ children, className = '', containerClassName = '' }: SidebarProps, ref: Ref<SidebarComponent>) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const showSidebar = () => {
    setIsSidebarVisible(true)
  }

  const hideSidebar = () => {
    setIsSidebarVisible(false)
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      show: showSidebar,
      hide: hideSidebar,
      toggle: toggleSidebar,
      visible: isSidebarVisible,
    }
  })

  const sidebarRef = useRef<HTMLDivElement>(null)
  useClickOutsideToClose(sidebarRef, setIsSidebarVisible)

  return (
    <section
      ref={sidebarRef}
      className={`
        bg-white
        h-full w-full md:w-3/5 lg:w-1/2 xl:w-2/5 lg:px-12 px-4 fixed right-0 pt-10 top-0 z-50
        transition duration-300 ease-in-out bg-mobile-nav bg-no-repeat bg-bottom bg-contain shadow-xl
        ${isSidebarVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
        }
        ${className}
      `}>
      <div className={`flex flex-col h-full overflow-auto pb-12 ${containerClassName}`}>
        <button
          onClick={(event) => {
            event.stopPropagation()
            hideSidebar()
          }}>
          <Icon
            name='close'
            color={Colors.black}
            size={24}
            className='absolute top-4 right-4'
          />
        </button>
        {children}
      </div>
    </section>
  )
}

export default forwardRef(Sidebar)