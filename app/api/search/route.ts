import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('dentro del fetch');
  const body = await req.json();
  console.log(body);
}
