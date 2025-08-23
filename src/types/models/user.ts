export interface User {
  id: string;
  email: string;
  user_role: string; // Changed from app_role to user_role based on user_metadata
  email_verified?: boolean;
  last_sign_in_at?: string;
  created_at?: string;
  updated_at?: string;
}