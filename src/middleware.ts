import { NextRequest, NextResponse } from 'next/server';

const MOBILE_UA = /Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i;

export function middleware(request: NextRequest) {
  // Only redirect the root path
  if (request.nextUrl.pathname !== '/') return NextResponse.next();

  // Escape hatch: ?desktop=1 bypasses redirect
  if (request.nextUrl.searchParams.get('desktop') === '1') return NextResponse.next();

  const ua = request.headers.get('user-agent') || '';
  if (MOBILE_UA.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = '/world';
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
