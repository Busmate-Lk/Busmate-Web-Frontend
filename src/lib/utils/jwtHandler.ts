import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/models/auth';

/**
 * Decodes a JWT token without verifying its signature
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export function decodeToken(token: string): any {
  try {
    if (!token) {
      return null;
    }

    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}

/**
 * Verifies a JWT token's signature and expiration
 * @param token - The JWT token to verify
 * @param secret - The secret key used to sign the token
 * @returns The verified payload or null if invalid/expired
 */
export function verifyToken(token: string, secret: string): any {
  try {
    if (!token || !secret) {
      return null;
    }

    return jwt.verify(token, secret);
  } catch (error) {
    // Token is invalid, expired, or signature doesn't match
    return null;
  }
}

/**
 * Extracts user information from a JWT token
 * @param token - The JWT token to extract user info from
 * @returns User object with id, role, email, etc. or null if invalid
 */
export function getUserFromToken(token: string): { id: string; role: string; email: string; emailVerified: boolean; iat: number; exp: number } | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded || typeof decoded === 'string') {
      return null;
    }

    return {
      id: decoded.sub,
      role: decoded.user_metadata.user_role,
      email: decoded.email,
      emailVerified: decoded.user_metadata.email_verified,
      iat: decoded.iat,
      exp: decoded.exp
    };
  } catch (error) {
    return null;
  }
}

/**
 * Checks if a token is expired
 * @param token - The JWT token to check
 * @returns true if expired, false if valid, null if invalid token
 */
export function isTokenExpired(token: string): boolean | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded || typeof decoded === 'string' || !decoded.exp) {
      return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return null;
  }
}

/**
 * Gets the expiration time from a JWT token
 * @param token - The JWT token
 * @returns Expiration timestamp or null if invalid
 */
export function getTokenExpiration(token: string): number | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded || typeof decoded === 'string') {
      return null;
    }
    
    return decoded.exp || null;
  } catch (error) {
    return null;
  }
}

/**
 * Verifies a token and extracts user information in one step
 * @param token - The JWT token to verify and extract from
 * @param secret - The secret key used to sign the token
 * @returns User object or null if invalid/expired
 */
export function verifyAndGetUser(token: string, secret: string): { id: string; role: string; email: string; emailVerified: boolean; iat: number; exp: number } | null {
  try {
    const verified = verifyToken(token, secret) as JwtPayload;
    if (!verified) {
      return null;
    }

    return {
      id: verified.sub,
      role: verified.user_metadata.user_role,
      email: verified.email,
      emailVerified: verified.user_metadata.email_verified,
      iat: verified.iat,
      exp: verified.exp
    };
  } catch (error) {
    return null;
  }
}