'use client'

import React, { useState } from 'react'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'
import { AnimatePresence, motion } from 'framer-motion'
import * as variants from './Accordion.variants'

type AccordionProps = {
  label: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const Accordion = ({ label, children, className = '' }: AccordionProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  return (
    <div className={className}>
      <button
        onClick={() => {
          setIsAccordionOpen(!isAccordionOpen)
        }}
        className='w-full flex flex-row justify-between items-center'>
        <p className='font-medium'>{label}</p>
        <motion.div
          variants={variants.rotate180deg}
          animate={isAccordionOpen ? 'rotate' : 'start'}
        >
          <Icon name='plus' size={18} color={Colors.black} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.div
            variants={variants.accordion}
            initial='collapsed'
            animate='open'
            exit='collapsed'
          >
            <div className='py-4'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion