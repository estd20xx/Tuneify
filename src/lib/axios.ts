import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"
import { baseApi } from "../api/api"
class Axios {
  private Interceptors: AxiosInstance
  constructor() {
    this.Interceptors = axios.create(this.getConfigs())
  }
  protected getConfigs = (): CreateAxiosDefaults => {
    return {
      baseURL: baseApi,
      timeout: 1000
    }
  }
  public Interceptor = (): AxiosInstance => {
    return this.Interceptors
  }
}
export const caller = new Axios()
