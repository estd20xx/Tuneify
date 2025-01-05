import axios, { AxiosInstance } from "axios"
import { baseApi } from "../api/base/constrants"
export const Interceptors: AxiosInstance = axios.create({
  baseURL: baseApi
})
