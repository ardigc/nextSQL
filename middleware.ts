import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/products', req.url));
}
export const config = {
  matcher: ['/register/:path*', '/checkout/:path*'],
};
