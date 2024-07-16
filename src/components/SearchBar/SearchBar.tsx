'use client'

import React, { useRef } from 'react'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'

type SearchBarProps = {
  searchPhrase: string
  onChange: (value: string) => void
  placeholder: string
  autoFocus?: boolean
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void
  className?: string
}

const SearchBar = ({ searchPhrase, onChange, placeholder, autoFocus = false, onKeyDown = undefined, className = '' }: SearchBarProps) => {
  const searchBarRef = useRef<HTMLInputElement>(null)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    onChange(event.target.value)
  }

  const clearSearchBar = () => {
    onChange('')
  }

  return (
    <div
      className={`
        w-full h-10 bg-[#f2f1f1] rounded-full flex flex-row items-center px-4 space-x-2
        ${className}
      `}
    >
      <Icon name='search' color={Colors.black} size={16} />

      <input
        ref={searchBarRef}
        type='text'
        className='w-full text-body text-black placeholder-black-0.5 border-none bg-transparent outline-none focus:border focus:border-black active:border active:border-black'
        placeholder={placeholder}
        value={searchPhrase}
        onChange={onChangeInput}
        autoCorrect='false'
        autoCapitalize='none'
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
      />

      {searchPhrase && (
        <button
          onClick={() => {
            clearSearchBar()
            searchBarRef.current?.focus()
          }}
        >
          <Icon name='close' color={Colors.black} size={24} />
        </button>
      )}
    </div>
  )
}

export default SearchBar