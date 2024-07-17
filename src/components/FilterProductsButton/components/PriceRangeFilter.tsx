'use client'

import Button from '@/components/Button'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'
import React, { useEffect, useState } from 'react'

type PriceRangeFilterProps = {
  minValue: number
  maxValue: number
}

const PriceRangeFilter = ({ minValue, maxValue }: PriceRangeFilterProps) => {
  const { queryParams, setQueryParams } = useSearchProductsQueryParamsContext()

  const MINIMUM_PRICE = minValue
  const MAXIMUM_PRICE = maxValue
  const PRICE_GAP = 1000

  const [minimumPrice, setMinimumPrice] = useState(queryParams.minPrice || minValue)
  const [maximumPrice, setMaximumPrice] = useState(queryParams.maxPrice || maxValue)

  const [inputMinimumPrice, setInputMinimumPrice] = useState(queryParams.minPrice || minValue)
  const [inputMaximumPrice, setInputMaximumPrice] = useState(queryParams.maxPrice || maxValue)

  useEffect(() => {
    if (maximumPrice - minimumPrice < PRICE_GAP) {
      setMinimumPrice(maximumPrice - PRICE_GAP)
      setInputMinimumPrice(maximumPrice - PRICE_GAP)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimumPrice])

  useEffect(() => {
    if (maximumPrice - minimumPrice < PRICE_GAP) {
      setMaximumPrice(minimumPrice + PRICE_GAP)
      setInputMaximumPrice(minimumPrice + PRICE_GAP)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximumPrice])

  let leftCursorPosition
  let rightCursorPosition

  if (maximumPrice - minimumPrice < PRICE_GAP) {
    // Don't move cursors.
  } else {
    leftCursorPosition = (minimumPrice / MAXIMUM_PRICE) * 100
    rightCursorPosition = 100 - ((maximumPrice / MAXIMUM_PRICE) * 100)
  }

  return (
    <div className='space-y-8 flex flex-col'>
      {/* PriceRangeInput component. */}
      <div className='grid grid-cols-12'>
        <div className='col-span-5 flex flex-row items-center gap-x-2'>
          <span className='font-medium inline-block'>Min</span>
          <input
            type='number'
            value={inputMinimumPrice}
            onBlur={() => {
              setInputMinimumPrice(Math.round(minimumPrice / 100) * 100)
            }}
            onChange={(event) => {
              if (parseInt(event.target.value) > maxValue) {
                // 
              } else {
                setInputMinimumPrice(parseInt(event.target.value))
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setMinimumPrice(Math.round(inputMinimumPrice / 100) * 100)
                setInputMinimumPrice(Math.round(inputMinimumPrice / 100) * 100)
              }
            }}
            min={MINIMUM_PRICE}
            max={MINIMUM_PRICE - 1}
            className='border border-gray-200 px-4 py-1 rounded w-4/5' />
        </div>

        <span className='col-span-2 inline-block w-full text-center font-medium text-lg'>-</span>

        <div className='col-span-5 flex flex-row items-center gap-x-2'>
          <span className='font-medium inline-block'>Max</span>
          <input
            type='number'
            value={inputMaximumPrice}
            onBlur={() => {
              setInputMaximumPrice(Math.round(maximumPrice / 100) * 100)
            }}
            onChange={(event) => {
              if (parseInt(event.target.value) > maxValue) {
                //
              } else {
                setInputMaximumPrice(parseInt(event.target.value))
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setMaximumPrice(Math.round(inputMaximumPrice / 100) * 100)
                setInputMaximumPrice(Math.round(inputMaximumPrice / 100) * 100)
              }
            }}
            min={MINIMUM_PRICE + 1}
            max={MAXIMUM_PRICE}
            className='border border-gray-200 px-4 py-1 rounded w-4/5' />
        </div>
      </div>

      {/* PriceRangeSlider component. */}
      <div >
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
            onChange={(event) => {
              setMinimumPrice(parseInt(event.target.value))
              setInputMinimumPrice(parseInt(event.target.value))
            }}
          />
          {/* Maximum range. */}
          <input
            className='absolute h-[2px] -top-[2px] w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:aspect-square [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto'
            type="range"
            step={100}
            min={MINIMUM_PRICE}
            max={MAXIMUM_PRICE}
            value={maximumPrice}
            onChange={(event) => {
              setMaximumPrice(parseInt(event.target.value))
              setInputMaximumPrice(parseInt(event.target.value))
            }}
          />
        </div>
      </div>

      <Button
        title='Apply'
        type='text'
        disabled={minimumPrice === undefined || !maximumPrice}
        onClick={() => {
          setQueryParams({ minPrice: Number(minimumPrice), maxPrice: Number(maximumPrice) })
        }}
        className='mx-auto py-0'
      />
    </div>
  )
}

export default PriceRangeFilter