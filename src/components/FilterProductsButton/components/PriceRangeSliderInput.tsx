import React from 'react'

type PriceRangeSliderInputProps = {
  min: number
  max: number
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const PriceRangeSliderInput = ({ min, max, value, onChange }: PriceRangeSliderInputProps) => {
  return (
    <input
      className='absolute h-[2px] -top-[2px] w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto'
      type="range"
      step={100}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  )
}

export default PriceRangeSliderInput