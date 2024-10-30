import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// baseURL: 'https://api.mangadex.org',
export const AXIOS_INSTANCE = Axios.create({
  baseURL: '/proxy-api',
  headers: {
    // 'Content-Type': 'application/json',
    'Accept': '*/*',
    'User-Agent': 'MangaApp/1.0',
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
