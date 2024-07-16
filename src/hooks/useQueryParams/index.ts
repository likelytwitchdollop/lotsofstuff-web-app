import useQueryParamsForPagesRouter from './PagesRouter'
import useQueryParamsForAppRouter from './AppRouter'

const useQueryParams = {
  pagesRouter: useQueryParamsForPagesRouter,
  appRouter: useQueryParamsForAppRouter,
}

export default useQueryParams
