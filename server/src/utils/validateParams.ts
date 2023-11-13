import { ApiError } from "../exceptions/ApiError";
import { Regex } from "../types/common/Regex";
import {
  IValidateParams,
  IValidateParamsOptions,
} from "../types/utils/validateParams";

const validateOneParam = (fieldName: string, param: IValidateParamsOptions) => {
  const errors: string[] = [];
  const {
    value,
    isEmail,
    isPassword,
    isPhoneNumber,
    length,
    isEmailOrPhoneNumber,
  } = param;
  const {
    email: emailRegex,
    phoneNumber: phoneNumberRegex,
    password: passwordRegex,
  } = Regex;

  if (isEmail) {
    emailRegex.test(value) || errors.push("Email is not valid");
  }

  if (isPassword) {
    passwordRegex.test(value) ||
      errors.push(
        "Password should be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one digit"
      );
  }

  if (isPhoneNumber) {
    phoneNumberRegex.test(value) || errors.push("Phone number is not valid");
  }

  if (length) {
    value.length >= length[0] ||
      errors.push(
        `This field\'s length should be at least ${length[0]} symbols`
      );

    value.length <= length[1] ||
      errors.push(
        `This field\'s length should be no longer than ${length[1]} symbols`
      );
  }

  if (isEmailOrPhoneNumber) {
    phoneNumberRegex.test(value) ||
      emailRegex.test(value) ||
      errors.push("Please provide valid email or phone number");
  }

  return {
    fieldName,
    errors,
  };
};

export const validateParams = (props: IValidateParams) => {
  const res = [];
  for (let key in props) {
    const fieldValidationResult = validateOneParam(key, props[key]);
    if (fieldValidationResult.errors.length) {
      res.push(fieldValidationResult);
    }
  }

  if (res.length) {
    throw ApiError.BadRequest("Validation failed", res);
  }
};
