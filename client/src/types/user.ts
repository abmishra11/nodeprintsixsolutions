import { Address } from "./address";
export interface User{
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  role: "ADMIN" | "VENDOR" | "USER";
  status?: boolean;
  refreshToken?: string;
  addresses: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}