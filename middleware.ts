// pages/_middleware.js
import { NextRequest, NextResponse } from 'next/server';

import { withAdmin, withAuth } from '@shared/middleware';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/test')) {
    return withAuth(request);
  }

  if (
    request.nextUrl.pathname.startsWith('/booking') ||
    request.nextUrl.pathname.startsWith('/reservation') ||
    request.nextUrl.pathname.startsWith('/user')
  ) {
    return withAuth(request);
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname !== '/admin') {
      return withAdmin(request);
    }
  }

  return NextResponse.next(); // 기본 동작 수행
}

export const config = {
  matcher: [
    '/test/:path*',
    '/admin/:path*',
    '/reservation/:path*',
    '/booking/:path*',
    '/user/:path*',
  ],
};
