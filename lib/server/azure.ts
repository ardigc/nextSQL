import { BlobServiceClient } from '@azure/storage-blob';
const conectionString = process.env.AZURE_BLOB_CONN_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(
  conectionString || ''
);
export const containerClient = blobServiceClient.getContainerClient('images');
