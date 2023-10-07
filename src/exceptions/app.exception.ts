export class AppException extends Error {
  constructor(
    public readonly status: number,
    public readonly message = "Something went wrong!",
  ) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
