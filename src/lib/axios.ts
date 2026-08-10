import axios, { AxiosInstance } from "axios"
import { baseApi } from "../api/base/constrants"
import store from "../store/store"

export const Interceptors: AxiosInstance = axios.create({
  baseURL: baseApi
})

const preferredLanguage = (): string => {
  try {
    return store.getState().persistedReducer.settings.language || "english"
  } catch (error) {
    return "english"
  }
}

Interceptors.interceptors.request.use((config) => {
  const language = preferredLanguage()
  config.headers.set(
    "cookie",
    `L=${language}; gdpr_acceptance=true; DL=${language}`
  )
  return config
})
