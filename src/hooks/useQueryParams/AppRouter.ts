// Courtsey of: https://angelhodar.com/blog/reusable-usequeryparams-hook-nextjs-validation-zod

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { z } from 'zod'
import Helpers from '@/utils/helpers'

interface UseQueryParamsConfig<T extends z.ZodTypeAny> {
  schema: T
  defaultValues: z.infer<T>
}

function useQueryParams<T extends z.ZodTypeAny>(
  config: UseQueryParamsConfig<T>,
  basePathname?: string
): {
  queryParams: z.infer<T>
  setQueryParams: (newParams: Partial<z.infer<T>>) => void
} {
  const router = useRouter()

  // Change the way to get the search params because router.query is not available when using the App router. The new way is by using the useSearchParams hook, but we need to convert them to an object.
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Convert URLSearchParams to an object.
  const searchParamsObject = Object.fromEntries(searchParams.entries())

  // Parse searchParamsObject to match z.object.
  const newSearchParamsObject = (() => {
    const newSearchParamsObject: { [key: string]: any } = {}

    Object.entries(searchParamsObject).map(([key, value]) => {
      if (
        searchParamsObject[key] &&
        typeof config.defaultValues[key] === 'string'
      ) {
        newSearchParamsObject[key] = value
      }

      if (
        searchParamsObject[key] &&
        typeof config.defaultValues[key] === 'number'
      ) {
        newSearchParamsObject[key] = Number(value)
      }

      if (
        searchParamsObject[key] &&
        typeof config.defaultValues[key] === 'object'
      ) {
        newSearchParamsObject[key] = value.split(',')
      }
    })

    return newSearchParamsObject
  })()

  const parsedQuery = config.schema.safeParse(newSearchParamsObject)

  if (!parsedQuery.success) {
    Helpers.showToast('error')
    console.error('Validation failed:', parsedQuery.error)
  }

  const initialParse = config.schema.safeParse({
    ...config.defaultValues,
    ...newSearchParamsObject,
  })

  const initialValues = initialParse.success
    ? initialParse.data
    : config.defaultValues

  const [queryParams, setQueryParamsState] = useState<z.infer<T>>(initialValues)

  const dependencies = (() => {
    const dependencies: any[] = []

    Object.entries(initialValues).map(([key, value]) => {
      const dependency = searchParamsObject[key] || initialValues[key]

      if (typeof dependency === 'string' || typeof dependency === 'number') {
        dependencies.push(dependency)
      }

      if (typeof dependency === 'object') {
        dependencies.push(dependency.join(','))
      }
    })

    return dependencies
  })()

  // Update queryParams with the new values in the URL When the URL changes.
  useEffect(() => {
    setQueryParamsState(newSearchParamsObject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])

  // The shallow option to make client updates without refreshing the page is not available in the new router from next/navigation. Luckily, from Next.js 14.1, there is a new experimental API that allows to make client side updates just as the shallow property of the pages router.
  const setQueryParams = (
    newParams: Partial<z.infer<T>>,
    newBasePathname?: string
  ) => {
    const mergedParams = { ...queryParams, ...newParams }
    const parsedQuery = config.schema.safeParse(mergedParams)

    if (parsedQuery.success) {
      setQueryParamsState(parsedQuery.data)

      // Convert params to expected string format.
      const newParsedQuery: { [key: string]: string } = {}
      Object.entries(parsedQuery.data).map(([key, value]) => {
        if (typeof value === 'object' && parsedQuery.data[key].length) {
          newParsedQuery[key] = (value as []).join(',')
        }

        if (
          (typeof value === 'string' || typeof value === 'number') &&
          parsedQuery.data[key]
        ) {
          newParsedQuery[key] = String(value)
        }
      })

      const newUrlParams = new URLSearchParams(newParsedQuery)

      const newUrl = `${
        newBasePathname || basePathname || pathname
      }?${newUrlParams.toString().replaceAll('%2C', ',')}`

      // Update the query params in the URL. But, this will not reload the page.
      void router.push(decodeURI(newUrl.toString()))
    } else {
      Helpers.showToast('error')
      console.error('Validation failed:', parsedQuery.error)
    }
  }

  // The useEffect used in the PagesRouter version can be removed as the new hooks returns valid values from the first render and dont need to check if router is ready.

  return {
    queryParams,
    setQueryParams,
  }
}

export default useQueryParams
