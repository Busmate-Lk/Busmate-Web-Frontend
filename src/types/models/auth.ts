export interface JwtPayload {
  sub: string;
  email: string;
  user_metadata: {
    email_verified: boolean;
    user_role: string;
  };
  exp: number;
  iat: number;
}