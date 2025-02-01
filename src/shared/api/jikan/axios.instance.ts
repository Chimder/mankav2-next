// src/shared/api/jikan/axios.instance.ts
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4'

export const JIKAN_INSTANCE = Axios.create({
  baseURL: JIKAN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'User-Agent': 'ChimderManka',
  },
})

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void
}

export const jikanInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): CancellablePromise<T> => {
  const source = Axios.CancelToken.source()

  const promise = JIKAN_INSTANCE({
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
