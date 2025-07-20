export interface AuthUser {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  userId: string;
  role: "ADMIN" | "VENDOR" | "USER";
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
}