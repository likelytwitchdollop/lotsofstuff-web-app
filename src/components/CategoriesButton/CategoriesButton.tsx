import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'
import * as constants from './constants'

const CategoriesButton = () => {
  const [isCategoriesDropdownVisibile, setIsCategoriesDropdownVisibile] = useState(false)

  const categoriesDropdownRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <button
        onClick={() => {
          setIsCategoriesDropdownVisibile(!isCategoriesDropdownVisibile)
        }}
      >
        <span className={`font-medium hidden lg:block ${isCategoriesDropdownVisibile ? 'underline' : ''}`}>Categories</span>
        {
          !isCategoriesDropdownVisibile &&
          <Icon name='menu' size={24} color={Colors.black} className='lg:hidden mt-[8px]' />
        }
        {
          isCategoriesDropdownVisibile &&
          <Icon name='close' size={24} color={Colors.black} className='lg:hidden mt-[8px]' />
        }
      </button>

      {isCategoriesDropdownVisibile && (
        <div
          ref={categoriesDropdownRef}
          className='bg-white absolute w-full left-0 z-10 mt-6'>
          <div className='bg-white xl:w-5/6 max-w-[1200px] mx-auto shadow-sm py-6 px-4 lg:px-6 space-y-12'>
            <p className='text-center font-medium'>Explore all the stuff we&apos;ve got - 🔭</p>

            <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-12'>
              {constants.CATEGORIES.map((category) => {
                return (
                  <div key={category.name} className='space-y-6'>
                    <div>
                      {category.comingSoon && (
                        <span className='font-medium text-lg'>{category.label}</span>
                      )}

                      {!category.comingSoon && (
                        <Link
                          href={`/${category.name}`}
                          onClick={(event) => {
                            setIsCategoriesDropdownVisibile(false)
                          }}
                          className='font-medium text-lg hover:underline'
                        >
                          {category.label}
                        </Link>
                      )}

                      <p className='text-gray-300 lg:h-12'>{category.description}</p>

                      {category.comingSoon &&
                        <span className='px-4 py-1 bg-black text-white font-bold rounded-full text-xs'>
                          Coming soon - 🎉
                        </span>
                      }
                    </div>

                    <div className='flex flex-col gap-y-1 border-b border-gray-200 pb-6 lg:border-none lg:pb-0'>
                      {category.subCategories.map((subCategory) => {
                        if (category.comingSoon) {
                          return <span
                            key={subCategory.slug}
                            className='text-gray-300'
                          >{subCategory.label}</span>
                        }

                        return (
                          <Link
                            key={subCategory.slug}
                            href={`/${category.name}/${subCategory.slug}`}
                            onClick={() => {
                              setIsCategoriesDropdownVisibile(false)
                            }}
                            className='hover:underline'
                          >
                            {subCategory.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesButton