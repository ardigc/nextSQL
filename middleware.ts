import { verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookiesValue = req.cookies;
  console.log('hola');
  let user = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
  } catch (error: any) {
    console.error('mensaje del middleware:', error.message);
  }
  console.log(user);
  return NextResponse.redirect(new URL('/products', req.url));
}
export const config = {
  matcher: ['/register/:path*', '/checkout/:path*'],
};
