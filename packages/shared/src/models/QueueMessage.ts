/*
 * QueueMessage class to send messages
 */
export class QueueMessage {
  messageType: string
  messageContent: any

  /**
   * Initializes an instance of QueueMessage
   * @param messageType - Message type
   * @param messageContent - Message Content
   */
  constructor(messageType: string, messageContent: any) {
    this.messageType = messageType
    this.messageContent = messageContent
  }
}
