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
  function insertDateTimeInFileName(fileName: string): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString().replace(/[/:]/g, '-');
    const dotIndex = fileName.lastIndexOf('.');

    if (dotIndex !== -1) {
      const name = fileName.substring(0, dotIndex);
      const extension = fileName.substring(dotIndex);
      return `${name}_${formattedDate}${extension}`;
    }

    return `${fileName}_${formattedDate}`;
  }
  const finalFileName = insertDateTimeInFileName(fileName);
  const blockBlobClient = containerClient.getBlockBlobClient(finalFileName);
  const upload = await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: fileType.toString() },
  });

  console.log(upload);
  console.log(upload._response.request.url);
  return new Response(JSON.stringify(upload._response.request.url), {
    status: 200,
  });
}
