import { containerClient } from '@/lib/server/azure';
import { NextRequest } from 'next/server';
import Busboy from 'busboy';

export async function POST(req: NextRequest) {
  console.log('dentro fetch');
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) return new Response(null, { status: 400 });
  if (!(file instanceof Blob)) return new Response(null, { status: 400 });
  console.log(file);

  const blockBlobClient = containerClient.getBlockBlobClient('test.jpg');
  const upload = await blockBlobClient.uploadData(file);

  console.log(upload);
  return new Response(null, { status: 200 });
}
