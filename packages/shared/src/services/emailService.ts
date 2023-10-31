const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sender = process.env.SENDGRID_EMAIL_SENDER
const replyTo = process.env.SENDGRID_EMAIL_REPLY_TO

export const sendTestEmail = async () => {
  const msg = {
    to: 'kalyanganesan@outlook.com',
    from: sender, // Should be a verified sender
    replyTo: replyTo,
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  try {
    await sgMail.send(msg)
  } catch (error: any) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

export const sendInviteToSignupEmail = async (
  email: string,
  signupLink: string,
  inviter: string,
) => {
  try {
    const msg = {
      to: email,
      from: sender,
      template_id: process.env.SENDGRID_SEND_EMAIL_TEMPLATE,
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
