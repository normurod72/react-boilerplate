import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

import { BASE_URL_DEV } from './Constants'

/** Modify the response type base on your API structure */

/** Modify the response type base on your API structure */
export interface APIErrorResponse {}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance

  constructor(baseURL: string, token?: string) {
    this.instance = axios.create({ baseURL })
    this.initializeResponseInterceptor()
    this.initializeRequestInterceptors(token)
  }

  private initializeRequestInterceptors = (token?: string) => {
    this.instance.interceptors.request.use((config) => {
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers = {
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    })
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError)
  }

  private handleResponse = (response: AxiosResponse) => response.data

  protected handleError = ({
    response,
  }: AxiosError<APIErrorResponse>): Promise<APIErrorResponse> => {
    const { data, status } = response || {}

    if (status === 401) {
      // clear user data here
      window.location.href = '/login'
    }

    return Promise.reject(data)
  }
}

export class API extends HttpClient {
  constructor(token?: string) {
    super(BASE_URL_DEV, token)
  }

  public requestJSON = <TResponse = Record<string, unknown>, TRequest = Record<string, unknown>>(
    method: Method,
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) =>
    this.instance.request<TRequest, TResponse>({
      method,
      url,
      ...options,
    })

  public requestResource = <
    TResponse = Record<string, unknown>,
    TRequest = Record<string, unknown>
  >(
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) => this.instance.get<TRequest, TResponse>(url, options)
}

export function useAPI() {
  // const token = useToken()
  const api = new API()

  return api
}
