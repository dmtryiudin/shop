export interface IRegistrationsParams {
  email: string;
  phoneNumber: string;
  password: string;
  name: string;
}

export interface ILoginParams {
  emailOrPhoneNumber: string;
  password: string;
}
