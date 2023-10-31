import {
  BlobServiceClient,
  BlockBlobClient,
  BlockBlobUploadHeaders,
  StorageSharedKeyCredential,
  logger,
} from '@azure/storage-blob'

import path from 'path'

const accountName: string = process.env.AZURE_STORAGE_ACCOUNT_NAME
const accountKey: string = process.env.AZURE_STORAGE_ACCOUNT_KEY

if (!accountName) throw Error('Azure storage name not found')
if (!accountKey) throw Error('Azure storage key not found')

const baseUrl: string = `https://${accountName}.blob.core.windows.net`

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey,
)

export const uploadFileToAzureBlob = async (
  containerName: string,
  blobName: string,
  fileContent: Buffer,
) => {
  try {
    if (!fileContent) {
      return
    }

    const blobServiceClient = new BlobServiceClient(
      baseUrl,
      sharedKeyCredential,
    )

    const containerClient = blobServiceClient.getContainerClient(containerName)

    await containerClient.createIfNotExists()

    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    // Upload data to the blob
    const blobBlockUploadResponse: BlockBlobUploadHeaders =
      await blockBlobClient.uploadData(fileContent)

    if (blobBlockUploadResponse.errorCode) {
      throw Error(blobBlockUploadResponse.errorCode)
    }

    console.log(`Blob ${blockBlobClient.url} created`)

    return blockBlobClient.url
  } catch (err) {
    console.error(err)
    throw err
  }
}
