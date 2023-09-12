import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchValue = req.nextUrl.searchParams.get('value');
  const result = await pool.query(
    `SELECT * FROM products WHERE name ILIKE '%${searchValue}%' AND delete_at IS NULL LIMIT 5`
  );
  return new Response(JSON.stringify(result.rows), { status: 200 });
}
