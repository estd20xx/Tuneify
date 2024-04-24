import { baseURL } from "../base/endpoint"
export class ApiService {
  protected getApi = (): string => {
    return baseURL
  }
}
