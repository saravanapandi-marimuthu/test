/*
 * QueueMessage class
 */
export class QueueMessage {
  messageType: string
  messageContent: any

  /**
   *
   * @param messageType message type
   * @param messageContent
   */
  constructor(messageType: string, messageContent: any) {
    this.messageType = messageType
    this.messageContent = messageContent
  }
}
