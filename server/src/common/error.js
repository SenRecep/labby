export class ErrorResponse {
  constructor(errors, isShow, path) {
    this.errors = errors ?? [];
    this.isShow = isShow ?? true;
    this.path = path ?? "/api";
  }
}
