import { GraphQLError } from "graphql";
import { ErrorTypes } from "../types/errors/ErrorTypes";
import { ApiError } from "./ApiError";

type FormatErrorType = (error: GraphQLError | Error) => any;

export const formatError: FormatErrorType = (error) => {
  console.log(error);

  if (
    error instanceof GraphQLError &&
    error.originalError instanceof ApiError
  ) {
    return {
      message: error.message,
      status: error.originalError.status,
      errors: error.originalError.errors,
    };
  } else {
    return {
      message: "Unknown error",
      status: ErrorTypes.INTERNAL_SERVER_ERROR,
      errors: [],
    };
  }
};
