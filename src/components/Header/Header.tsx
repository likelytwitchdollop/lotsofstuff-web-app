'use client'

import React, { useEffect, useState } from 'react'
import CartButton from '../CartButton'
import CategoriesButton from '../CategoriesButton/CategoriesButton'
import SearchBar from '../SearchBar'
import Link from 'next/link'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'
import services from '@/services'
import { usePathname } from 'next/navigation'
import * as helpers from './Header.helpers'

const Header = () => {
  const { queryParams, setQueryParams } = useSearchProductsQueryParamsContext()
  const pathname = usePathname()

  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    setSearchPhrase(queryParams.search || '')
  }, [queryParams.search])

  const { refetch: searchProducts } = services.Products.useSearchProducts({
    searchPhrase
  })

  return (
    <header>
      <div className='py-10 grid place-content-center'>
        <Link
          href='/'
          onClick={() => {
            setSearchPhrase('')
            setQueryParams({ search: '', category: [], brand: [] })
          }}
        >
          <h1 className='font-bold text-5xl text-center mb-4'>lots-of-stuff</h1>
        </Link>
        <p className='text-center'>You should buy some - 😉</p>
      </div>

      <div className={`flex flex-row gap-x-2 md:gap-x-12 justify-between items-center mb-12`}>
        <CategoriesButton />
        <SearchBar
          placeholder="Search for stuff to buy..."
          searchPhrase={searchPhrase || ''}
          onChange={(value) => {
            setSearchPhrase(value)
          }}
          className="lg:w-4/6"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchPhrase) {
              searchProducts()

              const newQueryParams = helpers.resetQueryParams(pathname, queryParams)
              setQueryParams({ search: searchPhrase, ...newQueryParams }, '/products')
            }
          }}
        />
        <CartButton />
      </div>
    </header>
  )
}

export default Header