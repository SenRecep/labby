import HttpStatusCodes from "http-status-codes";
import { ErrorResponse } from "./error.js";
export class ServiceResponse {
  constructor(data, statusCode, error = null, isSuccessful = null) {
    if (data|| typeof data ==="boolean") this.data = data;

    this.statusCode = statusCode ?? HttpStatusCodes.OK;
    this.isSuccessful = isSuccessful ?? true;
    if (error) this.error = error;
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
      new ErrorResponse(errors, isShow, path),
      false
    );
  }
}
