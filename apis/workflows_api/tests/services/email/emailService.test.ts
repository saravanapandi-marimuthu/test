import * as sgMail from '@sendgrid/mail'
import { mockDeep, MockProxy } from 'jest-mock-extended'
import { sendInviteToSignupEmail } from '../../../src/services/email/emailService'

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}))

let mockSgMail: MockProxy<typeof sgMail>

beforeEach(() => {
  mockSgMail = mockDeep(sgMail)
  jest.clearAllMocks()
})

describe('sendInviteToSignupEmail', () => {
  it('should send an email successfully', async () => {
    const email = 'test@example.com'
    const signupLink = 'http://test.com/signup'
    const inviter = 'inviter@example.com'

    await sendInviteToSignupEmail(email, signupLink, inviter)

    expect(mockSgMail.send).toHaveBeenCalledTimes(1)
    expect(mockSgMail.send).toHaveBeenCalledWith({
      to: email,
      from: process.env.SENDGRID_EMAIL_SENDER,
      replyTo: process.env.SENDGRID_EMAIL_REPLY_TO,
      templateId: process.env.SENDGRID_SEND_EMAIL_TEMPLATE,
      dynamic_template_data: {
        email,
        signupLink,
        inviter,
        contactEmail: process.env.SENDGRID_EMAIL_SENDER,
      },
    })
  })

  it('should throw an error when email sending fails', async () => {
    const email = 'test@example.com'
    const signupLink = 'http://test.com/signup'
    const inviter = 'inviter@example.com'

    const error = new Error('mock error')
    mockSgMail.send.mockRejectedValue(error)

    await expect(
      sendInviteToSignupEmail(email, signupLink, inviter),
    ).rejects.toThrow('Error sending email')
    expect(mockSgMail.send).toHaveBeenCalledTimes(1)
  })
})
