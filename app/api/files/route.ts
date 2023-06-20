import { containerClient } from '@/lib/server/azure';
import { NextRequest } from 'next/server';
import Busboy from 'busboy';

export async function POST(req: NextRequest) {
  const blob = await req.blob();
  const buffer = await blob.arrayBuffer();
  const blockBlobClient = containerClient.getBlockBlobClient('test.jpg');
  const upload = await blockBlobClient.uploadData(buffer);

  console.log(upload);
  return new Response(null, { status: 200 });
}
