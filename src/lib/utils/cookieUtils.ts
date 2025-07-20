import { CookieOptions } from '@/types/models/cookie';

/**
 * Sets a cookie with secure defaults
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') {
    return; // Server-side rendering guard
  }

  const defaultOptions: CookieOptions = {
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax',
    ...options
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (defaultOptions.expires) {
    cookieString += `; expires=${defaultOptions.expires.toUTCString()}`;
  }

  if (defaultOptions.maxAge) {
    cookieString += `; max-age=${defaultOptions.maxAge}`;
  }

  if (defaultOptions.domain) {
    cookieString += `; domain=${defaultOptions.domain}`;
  }

  if (defaultOptions.path) {
    cookieString += `; path=${defaultOptions.path}`;
  }

  if (defaultOptions.secure) {
    cookieString += '; secure';
  }

  if (defaultOptions.httpOnly) {
    cookieString += '; httponly';
  }

  if (defaultOptions.sameSite) {
    cookieString += `; samesite=${defaultOptions.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Gets a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null; // Server-side rendering guard
  }

  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(`${encodedName}=`)) {
      const value = trimmedCookie.substring(encodedName.length + 1);
      return decodeURIComponent(value);
    }
  }

  return null;
}

/**
 * Deletes a cookie by setting it to expire immediately
 * @param name - Cookie name
 * @param options - Cookie options (path and domain should match the original cookie)
 */
export function deleteCookie(name: string, options: Partial<CookieOptions> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
    maxAge: -1
  });
}

/**
 * Checks if a cookie exists
 * @param name - Cookie name
 * @returns true if cookie exists, false otherwise
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Gets all cookies as an object
 * @returns Object with cookie names as keys and values as values
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    return {}; // Server-side rendering guard
  }

  const cookies: Record<string, string> = {};
  const cookieStrings = document.cookie.split(';');

  for (let cookie of cookieStrings) {
    const trimmedCookie = cookie.trim();
    const equalIndex = trimmedCookie.indexOf('=');
    
    if (equalIndex > 0) {
      const name = decodeURIComponent(trimmedCookie.substring(0, equalIndex));
      const value = decodeURIComponent(trimmedCookie.substring(equalIndex + 1));
      cookies[name] = value;
    }
  }

  return cookies;
}

/**
 * Sets a secure cookie with authentication-specific defaults
 * @param name - Cookie name
 * @param value - Cookie value
 * @param maxAge - Max age in seconds (default: 7 days)
 */
export function setSecureAuthCookie(name: string, value: string, maxAge: number = 7 * 24 * 60 * 60): void {
  setCookie(name, value, {
    maxAge,
    secure: window.location.protocol === 'https:',
    sameSite: 'strict',
    path: '/',
    // Note: We're not setting httpOnly here because client-side JS needs to read these cookies
    // For production, consider using httpOnly cookies and handling auth differently
  });
}

/**
 * Clears all authentication-related cookies
 * @param cookieNames - Array of cookie names to clear
 */
export function clearAuthCookies(cookieNames: string[]): void {
  cookieNames.forEach(name => {
    deleteCookie(name, { path: '/' });
  });
}

/**
 * Sets auth cookies with expiration time
 * @param accessToken - Access token
 * @param refreshToken - Refresh token
 * @param expiresIn - Access token expiration in seconds
 */
export function setAuthTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
  // Set access token with shorter expiration
  setSecureAuthCookie('access_token', accessToken, expiresIn);
  
  // Set refresh token with longer expiration (30 days)
  setSecureAuthCookie('refresh_token', refreshToken, 30 * 24 * 60 * 60);
}

/**
 * Gets both auth tokens
 * @returns Object with access and refresh tokens
 */
export function getAuthTokens(): { accessToken: string | null; refreshToken: string | null } {
  return {
    accessToken: getCookie('access_token'),
    refreshToken: getCookie('refresh_token')
  };
}