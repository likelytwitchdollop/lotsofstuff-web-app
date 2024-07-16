import React from 'react'

type PriceRangeSliderProps = {
  minimumPrice: number
  maximumPrice: number
  onChangeMinimumPrice: React.ChangeEventHandler<HTMLInputElement>
  onChangeMaximumPrice: React.ChangeEventHandler<HTMLInputElement>
  constants: { MAXIMUM_PRICE: number, MINIMUM_PRICE: number, PRICE_GAP: number }
}

const PriceRangeSlider = ({ minimumPrice, maximumPrice, onChangeMinimumPrice, onChangeMaximumPrice, constants }: PriceRangeSliderProps) => {
  const { MAXIMUM_PRICE, MINIMUM_PRICE, PRICE_GAP } = constants

  let leftCursorPosition
  let rightCursorPosition

  if (maximumPrice - minimumPrice < PRICE_GAP) {
    // Don't move cursors.
  } else {
    leftCursorPosition = (minimumPrice / MAXIMUM_PRICE) * 100
    rightCursorPosition = 100 - ((maximumPrice / MAXIMUM_PRICE) * 100)
  }

  return (
    <div className='w-[300px]'>
      {/* Slider. */}
      <div
        className='relative h-[2px] rounded-full bg-gray-200 w-full'
      >
        {/* Progress bar. */}
        <div
          style={{
            left: `${leftCursorPosition}%`,
            right: `${rightCursorPosition}%`
          }}
          className='absolute h-[2px] rounded-full bg-black' />
      </div>

      {/* Range input. */}
      <div className='relative'>
        {/* Minimum range. */}
        <input
          className='absolute h-[2px] -top-[2px] w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto'
          type="range"
          step={100}
          min={MINIMUM_PRICE}
          max={MAXIMUM_PRICE}
          value={minimumPrice}
          onChange={onChangeMinimumPrice}
        />
        {/* Maximum range. */}
        <input
          className='absolute h-[2px] -top-[2px] w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto'
          type="range"
          step={100}
          min={MINIMUM_PRICE}
          max={MAXIMUM_PRICE}
          value={maximumPrice}
          onChange={onChangeMaximumPrice}
        />
      </div>
    </div>
  )
}

export default PriceRangeSlider