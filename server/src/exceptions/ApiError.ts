import { ErrorTypes } from "../types/errors/ErrorTypes";

export class ApiError extends Error {
  status: string;
  errors: Array<any>;

  constructor(status: string, message: string, errors: Array<any> = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static AuthorizationError() {
    return new ApiError(ErrorTypes.UNAUTHORIZED, "User is unauthorized");
  }

  static BadRequest(message: string, errors: Array<any> = []) {
    return new ApiError(ErrorTypes.BAD_REQUEST, message, errors);
  }

  static Forbidden(message: string) {
    return new ApiError(ErrorTypes.FORBIDDEN, message);
  }
}
