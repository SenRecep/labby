import { ErrorResponse } from "./ErrorResponse.interface";
export interface ServiceResponse<T> {
  data?: T;
  statusCode: number;
  isSuccessful: boolean;
  error?: ErrorResponse;
}
