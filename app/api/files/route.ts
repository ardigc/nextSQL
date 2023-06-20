import { containerClient } from '@/lib/server/azure';
import { NextRequest } from 'next/server';
import Busboy from 'busboy';

export async function POST(req: NextRequest) {
  console.log('dentro fetch');
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) return new Response(null, { status: 400 });
  if (!(file instanceof Blob)) return new Response(null, { status: 400 });
  const buffer = await file.arrayBuffer();
  const fileType = file.type;
  const fileName = file.name;
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const upload = await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: fileType.toString() },
  });

  console.log(upload);
  console.log(upload._response.request.url);
  return new Response(null, { status: 200 });
}
