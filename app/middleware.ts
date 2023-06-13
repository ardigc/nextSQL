import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.redirect('/products');
}
export const config = {
  matcher: ['/register/:path*', '/checkout/:path*'],
};
