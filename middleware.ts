import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const URLFetch = new URL('/api/auth', req.url);
  const response = await fetch(URLFetch, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'content-type': 'application/json' },
  });
  if (!response.ok) console.log('no resgistrado');
  const data = await response.json();
  const user = data.user;
  console.log(user);
  return NextResponse.redirect(new URL('/products', req.url));
}
export const config = {
  matcher: ['/register/:path*', '/checkout/:path*'],
};
