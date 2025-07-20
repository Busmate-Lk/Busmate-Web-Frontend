import { User } from '@/types/models/user';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
    role: string;
    user_metadata: {
      email_verified: boolean;
      user_role: string;
    };
    app_role: string;
    created_at: string;
    updated_at: string;
    last_sign_in_at: string;
  };
}