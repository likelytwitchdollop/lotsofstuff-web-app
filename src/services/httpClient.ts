import Helpers from '@/utils/helpers'
import axios from 'axios'

const isDevelopmentMode = Helpers.isDevelopmentMode

const LOCALHOST = 'localhost'
const PORT = 1337

const baseURL = isDevelopmentMode
  ? `http://${LOCALHOST}:${PORT}/api/v1`
  : `https://lotsofstuff.onrender.com/api/v1`

if (isDevelopmentMode) {
  //
}

if (!isDevelopmentMode) {
  //
}

const headers = {
  'Content-Type': 'application/json',
}

const httpClient = axios.create({
  baseURL,
  headers,
})

export default httpClient
