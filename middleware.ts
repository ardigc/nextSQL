import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('desde el middleware');
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  const token = req.cookies.get('token');
  const URLFetch = new URL('/api/auth', req.url);
  const response = await fetch(URLFetch, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'content-type': 'application/json' },
  });
  if (!response.ok) console.log('no resgistrado');
  console.log(req.nextUrl.pathname);
  if (
    !response.ok &&
    (req.nextUrl.pathname.startsWith('/register') ||
      req.nextUrl.pathname.startsWith('/login'))
  ) {
    return NextResponse.next();
  }
  if (
    response.ok &&
    req.nextUrl.pathname.startsWith('/api') &&
    !req.nextUrl.pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith('/adressConfiguration')) {
    if (response.ok) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/logIn', req.url));
    }
  }
  const data = await response.json();
  const user = data.user;
  console.log(user);
  return NextResponse.redirect(new URL('/products', req.url));
}
export const config = {
  matcher: ['/register/:path*', '/logIn/:path*', '/api/:path*'],
};
