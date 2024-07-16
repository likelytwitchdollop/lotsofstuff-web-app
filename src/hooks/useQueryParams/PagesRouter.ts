// Courtsey of: https://angelhodar.com/blog/reusable-usequeryparams-hook-nextjs-validation-zod

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { z } from 'zod'

interface UseQueryParamsConfig<T extends z.ZodTypeAny> {
  schema: T
  defaultValues: z.infer<T>
}

function useQueryParams<T extends z.ZodTypeAny>(
  config: UseQueryParamsConfig<T>
): {
  queryParams: z.infer<T>
  setQueryParams: (newParams: Partial<z.infer<T>>) => void
} {
  const router = useRouter()

  // Parse the current query parameters from the URL using the provided Zod schema and merge them with any default values specified.
  // .safeParse() validates the query parameters against the schema.
  const parsedQuery = config.schema.safeParse({
    ...config.defaultValues,
    ...router.query,
  })

  const initialValues = parsedQuery.success
    ? parsedQuery.data
    : config.defaultValues

  // useQueryParams manages the state of the query parameters internally, and provides queryParams for accessing the current state and a setQueryParams function for updating the query parameters in the URL.
  const [queryParams, setQueryParamsState] = useState<T>(initialValues)

  useEffect(() => {
    if (!router.isReady) return

    if (Object.keys(router.query).length === 0) {
      setQueryParamsState(config.defaultValues)
      return
    }

    const query = { ...queryParams, ...router.query }
    const parsedQuery = config.schema.safeParse(query)

    if (parsedQuery.success) {
      const data = parsedQuery.success ? parsedQuery.data : config.defaultValues
      setQueryParamsState(data)
    } else {
      // Do something.
    }
    // Adding all missing depencies causes an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query])

  const setQueryParams = (newParams: Partial<z.infer<T>>) => {
    const mergedQueryParams = {
      ...queryParams,
      ...router.query,
      ...newParams,
    }

    // When setQueryParams is called to update the query parameters, the hook automatically synchronizes these changes with the URL, ensuring that the browser’s address bar reflects the current state of the application.
    router.push(
      {
        pathname: router.pathname,
        query: mergedQueryParams,
      },
      undefined,
      { shallow: true }
    )
  }

  return {
    queryParams,
    setQueryParams,
  }
}

export default useQueryParams
