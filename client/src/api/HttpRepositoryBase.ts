import { AxiosResponse } from "axios";

export class HttpRepositoryBase {
  async send(
    request: Promise<AxiosResponse<any, any>>,
    callback: ((data: any) => void | any) | undefined = undefined
  ) {
    return request
      .then((response: { data: any }) => response.data)
      .then((data) => {
        if (callback) callback(data);
        return data;
      })
      .catch((error) => error);
  }
}
