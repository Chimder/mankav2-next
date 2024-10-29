// import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// export const AXIOS_INSTANCE = Axios.create({
//   baseURL: 'https://api.mangadex.org',
//   // baseURL: url,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const customInstance = <T>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig,
// ): Promise<T> => {
//   const promise = AXIOS_INSTANCE({
//     ...config,
//     ...options,
//   }).then(({ data }) => data)

//   return promise
// }

// export type ErrorType<Error> = AxiosError<Error>

// export type BodyType<BodyData> = BodyData

import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// Создаем экземпляр Axios
export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'https://api.mangadex.org',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
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
