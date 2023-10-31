/*
 * QueueMessage class
 */
export class QueueMessage {
  messageType: string
  messageContent: any

  constructor(messageType: string, messageContent: any) {
    this.messageType = messageType
    this.messageContent = messageContent
  }
}
