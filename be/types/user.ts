export interface IUser {
  _id?: string;
  codeOtp?: Number;
  userName: string;
  avt: string;
  email: string;
  password: string;
  numberPhone: string;
  address: string;
  gender: string;
  description: string;
  isAdmin: number;
  isLock: boolean
}
