export class AppException extends Error {
  constructor(
    public readonly status: number,
    public readonly message = "Something went wrong!"
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
