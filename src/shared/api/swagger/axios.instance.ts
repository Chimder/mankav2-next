import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: '/api/proxyApi?url=',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': '*/*',
  //   'User-Agent': 'ChimderManka',
  // },
})

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): CancellablePromise<T> => {
  const source = Axios.CancelToken.source()

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data) as CancellablePromise<T>

  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
export type BodyData<BodyData> = BodyData
