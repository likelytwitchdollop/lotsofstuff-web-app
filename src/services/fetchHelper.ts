const fetchHelper = (endpoint: string, init?: RequestInit) => {
  const baseUrl = `http:localhost:1337/api/v1`
  const url = baseUrl + endpoint

  return fetch(url, init)
}

export default fetchHelper
