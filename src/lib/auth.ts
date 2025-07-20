import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/models/auth';
import { User } from '@/types/models/user';

/**
 * Validates a JWT token and returns the payload
 * @param token - The JWT token to validate
 * @returns Promise<JwtPayload> - The decoded JWT payload
 * @throws Error if token is invalid or expired
 */
export async function validateJwt(token: string): Promise<JwtPayload> {
  try {
    const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT secret not configured');
    }

    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    throw new Error('Token validation failed');
  }
}

/**
 * Synchronously verifies if a JWT token is valid
 * @param token - The JWT token to verify
 * @returns boolean - True if token is valid, false otherwise
 */
export const verifyJWT = (token: string): boolean => {
  try {
    const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
    
    if (!secret) {
      return false;
    }

    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
};

/**
 * Decodes a JWT token and extracts user information
 * @param token - The JWT token to decode
 * @returns User - The user object extracted from the token
 * @throws Error if token cannot be decoded
 */
export const parseUserFromJWT = (token: string): User => {
  try {
    const payload = jwt.decode(token) as any;
    
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    return {
      id: payload.sub || payload.id,
      email: payload.email,
      user_role: payload.user.user_metadata.user_role|| payload.app_role,
    };
  } catch (error) {
    throw new Error('Failed to parse user from token');
  }
};