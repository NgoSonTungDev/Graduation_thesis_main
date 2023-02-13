export interface IAuth {
  _id?: string;
  username: string;
  password: string;
  isAdmin: boolean;
  refreshToken: string;
  createdAt?: string;
  updatedAt?: string;
}
