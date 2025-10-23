import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from '..'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})
