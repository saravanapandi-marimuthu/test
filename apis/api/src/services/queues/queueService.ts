import { StorageSharedKeyCredential } from '@azure/storage-queue'
import { Buffer } from 'buffer'
import { QueueMessage } from '../../models/QueueMessage'
const { QueueClient, QueueServiceClient } = require('@azure/storage-queue')

const accountName: string = process.env.AZURE_STORAGE_ACCOUNT_NAME
const accountKey: string = process.env.AZURE_STORAGE_ACCOUNT_KEY

if (!accountName) throw Error('Azure storage name not found')
if (!accountKey) throw Error('Azure storage key not found')

const baseUrl: string = `https://${accountName}.queue.core.windows.net`

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey,
)

export const addMessageToQueue = async (
  queueName: string,
  messageType: string,
  messageContent: any,
) => {
  const queueClient = new QueueClient(
    `${baseUrl}/${queueName}`,
    sharedKeyCredential,
  )

  await queueClient.createIfNotExists()

  let message = new QueueMessage(messageType, messageContent)

  const messageString = JSON.stringify(message)
  const base64Message = Buffer.from(messageString).toString('base64')

  const sendMessageResponse = await queueClient.sendMessage(base64Message)

  console.log('Message added, requestId:', sendMessageResponse.requestId)
}
