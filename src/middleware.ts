import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;
  email: string;
  user_metadata: {
    user_role: string;
  };
  exp: number;
}

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);
  
  // Get token from cookies or headers
  const token = request.cookies.get('access_token')?.value ||
                request.headers.get('Authorization')?.split(' ')[1];

  console.log('Token in middleware:', token ? 'Present' : 'Missing');
  
  const { pathname } = request.nextUrl;

  // Allow access to public routes
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // This catches image files, CSS, JS, etc.
  ) {
    return NextResponse.next();
  }

  // Validate JWT
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Decode JWT without verification (since we don't have the secret in middleware)
    const payload = jwt.decode(token) as JwtPayload;
    
    if (!payload || !payload.user_metadata?.user_role) {
      console.log('Invalid token payload');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.log('Token expired');
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userRole = payload.user_metadata.user_role;
    console.log('User role from token:', userRole);

    // Role-based route protection
    const roleRoutes = {
      'Mot': '/mot',
      'FleetOperator': '/operator',
      'Timekeeper': '/timeKeeper',
      'SystemAdmin': '/admin',
      'Admin': '/admin',
    };

    const allowedBasePath = roleRoutes[userRole as keyof typeof roleRoutes];
    
    if (!allowedBasePath) {
      console.log('Unknown role:', userRole);
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!pathname.startsWith(allowedBasePath)) {
      console.log(`Role ${userRole} not allowed for path ${pathname}, redirecting to ${allowedBasePath}/dashboard`);
      return NextResponse.redirect(new URL(`${allowedBasePath}/dashboard`, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('JWT processing error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|css|js|woff|woff2|ttf|eot)).*)',
  ],
};