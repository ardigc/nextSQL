import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.token;
  let user = null;
  try {
    let user = null;
    user = verify(token.value || '', process.env.JWT_SECRET || '');
    if (typeof user === 'string') return;
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error: any) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
