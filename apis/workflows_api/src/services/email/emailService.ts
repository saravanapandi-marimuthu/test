import * as sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sender = process.env.SENDGRID_EMAIL_SENDER
const replyTo = process.env.SENDGRID_EMAIL_REPLY_TO

export const sendInviteToSignupEmail = async (
  email: string,
  signupLink: string,
  inviter: string,
) => {
  try {
    const msg = {
      to: email,
      from: sender,
      replyTo,
      templateId: process.env.SENDGRID_SEND_EMAIL_TEMPLATE,
      dynamic_template_data: {
        email,
        signupLink,
        inviter,
        contactEmail: sender,
      },
    }

    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error(error)
    throw new Error('Error sending email')
  }
}
