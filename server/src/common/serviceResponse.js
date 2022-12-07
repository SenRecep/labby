import HttpStatusCodes from "http-status-codes";
import { Error } from "./error.js";
export class ServiceResponse {
  constructor(data, statusCode, error = null, isSuccessful = null) {
    this.data = data ?? null;
    this.statusCode = statusCode ?? HttpStatusCodes.OK;
    this.isSuccessful = isSuccessful ?? true;
    this.error = error;
  }
  static success(statusCode = HttpStatusCodes.OK) {
    return new ServiceResponse(null, statusCode);
  }
  static successWithData(data, statusCode = HttpStatusCodes.OK) {
    return new ServiceResponse(data, statusCode);
  }
  static fail(statusCode = HttpStatusCodes.OK, isShow, path, errors) {
    return new ServiceResponse(
      null,
      statusCode,
      new Error(errors, isShow, path),
      false
    );
  }
}
