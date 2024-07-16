import React, { useState } from 'react'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'

type CarouselProps = {
  children: React.ReactNode[]
}

const Carousel = ({ children: slides }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPreviousSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return slides.length - 1
      }

      return prev -= 1
    })
  }

  const showNextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === slides.length - 1) {
        return 0
      }

      return prev += 1
    })
  }

  return (
    <div className='relative overflow-hidden'>
      <div
        className='flex flex-row transition-transform ease-in-out duration-300'
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {slides}
      </div>

      {/* Navigators. */}
      {slides.length > 1 && (
        <>
          <button
            onClick={showPreviousSlide}
            className='group-hover:visible invisible absolute  rounded-full w-7 aspect-square grid place-content-center top-1/2 left-2'
          >
            <Icon name='arrow-ios-back' size={24} color={Colors.black} />
          </button>

          <button
            onClick={showNextSlide}
            className='group-hover:visible invisible absolute  rounded-full w-7 aspect-square grid place-content-center top-1/2 right-2'
          >
            <Icon name='arrow-ios-forward' size={24} color={Colors.black} />
          </button>
        </>
      )}
    </div>
  )
}

export default Carousel