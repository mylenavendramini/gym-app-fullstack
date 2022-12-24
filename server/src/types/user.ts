export interface IUser {
  userName: string;
  email: string;
  password: string;
  comparePassword: (
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void
  ) => void;
}
