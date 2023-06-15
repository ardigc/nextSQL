import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('desde el middleware');
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  console.log('despues del api');
  const token = req.cookies.get('token');
  const URLFetch = new URL('/api/auth', req.url);
  console.log(URLFetch.href);
  // console.log('token', token)
  console.log('antes del fetch');
  const response = await fetch(URLFetch, {
    // const response = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'content-type': 'application/json' },
  });
  console.log('despues del fetch');
  const data = await response.json();
  const user = data.user;
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
  if (
    req.nextUrl.pathname.startsWith('/profile/products') ||
    req.nextUrl.pathname.startsWith('/profile/sellers')
  ) {
    console.log(user);
    if (user.role === 'seller') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }
  if (
    req.nextUrl.pathname.startsWith('/adressConfiguration') ||
    req.nextUrl.pathname.startsWith('/checkout') ||
    req.nextUrl.pathname.startsWith('/payment') ||
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/confirmation')
  ) {
    if (response.ok) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.redirect(new URL('/products', req.url));
}
export const config = {
  matcher: [
    '/register/:path*',
    '/login/:path*',
    '/api/:path*',
    '/adressConfiguration/:path*',
    '/checkout/:path*',
    '/confirmation/:path*',
    '/payment/:path*',
    '/profile/:path*',
  ],
};
