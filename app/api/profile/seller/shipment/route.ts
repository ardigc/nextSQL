import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  try {
    const query =
      'UPDATE shipment SET shipment_status=$1 WHERE id=$2 RETURNING *';
    const parameters = [body.selectedStatus, body.shipmentId];
    const result = await pool.query(query, parameters);
    console.log(result.rows);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response('fallo', { status: 400 });
  }
}
