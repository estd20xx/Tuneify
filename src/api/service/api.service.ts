import { baseApi } from "../base/constrants"
export class ApiService {
  protected getApi = (): string => {
    return baseApi
  }
}
