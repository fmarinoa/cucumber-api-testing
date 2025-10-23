import { axiosInstance } from '@/repositories'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

interface RequestConfig {
  method: string
  url: string
  headers?: Record<string, string>
  body?: any
  queryParams?: Record<string, any>
}

export async function executeRequest(
  request: RequestConfig
): Promise<AxiosResponse> {
  const axios = axiosInstance
  const {
    url,
    method,
    headers = {},
    body: data = {},
    queryParams: params = {},
  } = request

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    params,
    data,
    validateStatus: () => true, // Accept all status codes
  }

  return axios.request(config)
}
