import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const searchValue = body.value;
  const result = await pool.query(
    `SELECT * FROM products WHERE name ILIKE '%${searchValue}%' AND delete_at IS NULL LIMIT 5`
  );
  console.log(result);
  return new Response(JSON.stringify(result.rows), { status: 200 });
}
