import { NextRequest, NextResponse } from 'next/server';

import { createSession, verifySession } from './lib/session';

const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/email-confirm',
  '/verifying-email',
  '/reset-password',
  '/change-password',
];
const privateRoutes = ['/dashboard', '/transactions', '/categories', '/profile'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  const token = searchParams.get('token');
  const session = await verifySession();

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  const isAuthRoute = authRoutes.includes(pathname);

  if (session?.userId && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r));

  if (!session?.userId && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (pathname.startsWith('/sign-in') && token) {
    await createSession(token);
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
