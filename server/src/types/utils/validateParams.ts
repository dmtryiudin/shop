export interface IValidateParamsOptions {
  value: string;
  isEmail?: boolean;
  isPassword?: boolean;
  isPhoneNumber?: boolean;
  isEmailOrPhoneNumber?: boolean;
  length?: [number, number];
}

export interface IValidateParams {
  [param: string]: IValidateParamsOptions;
}
