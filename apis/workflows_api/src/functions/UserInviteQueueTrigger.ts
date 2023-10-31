import { app, InvocationContext } from '@azure/functions'
import { QueueMessage } from '../models/QueueMessage'
import { sendInvite } from '../services/users/sendInvite'

export async function UserInviteQueueTrigger(
  queueItem: unknown,
  context: InvocationContext,
): Promise<void> {
  context.log('Storage queue function processed work item:', queueItem)

  try {
    let message: QueueMessage

    // Check if queueItem is a string
    if (typeof queueItem === 'string') {
      // Parse the JSON string
      message = JSON.parse(queueItem) as QueueMessage
    } else if (typeof queueItem === 'object' && queueItem !== null) {
      // Cast to QueueMessage if it's an object
      message = queueItem as QueueMessage
    } else {
      // Handle other unexpected types
      throw new Error('Unexpected type for queueItem')
    }

    const messageContent = message.messageContent

    await sendInvite(
      messageContent.email,
      messageContent.inviteToken,
      messageContent.invitedByEmail,
    )

    context.log(
      `Invite Sent: email=${messageContent.email} CompanyId=${messageContent.companyId} roleId=${messageContent.roleId}`,
    )
  } catch (error) {
    context.error(
      `Error processing queue message: ${JSON.parse(
        (queueItem as any) ?? {},
      )}. Error: ${error.name}: ${error.message}\n${error.stack}`,
    )

    throw error
  }
}

app.storageQueue('UserInviteQueueTrigger', {
  queueName: 'invite-users-queue',
  connection: 'AzureWebJobsStorage',
  handler: UserInviteQueueTrigger,
})
