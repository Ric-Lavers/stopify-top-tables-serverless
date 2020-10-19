import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios"

export const Axios = ({
  config,
  headers,
}: {
  config?: object
  headers?: object
} = {}): AxiosInstance => {
  const Axios = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      ...headers,
    },
    ...config,
  })
  Axios.interceptors.request.use((config) => {
    if (config?.params?.spotify_user_id) {
      delete config.params.spotify_user_id
    }
    return config
  })
  Axios.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    // this will returned undefined on network error
    (error: AxiosError) => Promise.reject(error),
  )
  return Axios
}
const urlService = Axios()

export default urlService
