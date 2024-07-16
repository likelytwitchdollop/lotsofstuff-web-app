import React from 'react'
import Link from 'next/link'
import decodeUriComponent from 'decode-uri-component';

type BreadcrumbsProps = {
  slugs: string[]
  productSlug?: { label: string, slug: string }
}

const Breadcrumbs = ({ slugs, productSlug = undefined }: BreadcrumbsProps) => {
  const [category, subCategory] = slugs

  return (
    <div className='font-medium space-x-4 space-y-4'>
      {category && (
        <>
          <Link href={`/${category}`} className='hover:underline'>
            {category}
          </Link>
        </>
      )}
      {subCategory && (
        <>
          <span className='inline-block'>/</span>
          <Link href={`/${category}/${decodeUriComponent(subCategory)}`} className='hover:underline'>
            {decodeUriComponent(subCategory)}
          </Link>
        </>
      )}
      {productSlug && (
        <>
          <span className='inline-block'>/</span>
          <Link href={`/products/${productSlug.slug}`} className='hover:underline'>
            {productSlug.label}
          </Link>
        </>
      )}
    </div>
  )
}

export default Breadcrumbs