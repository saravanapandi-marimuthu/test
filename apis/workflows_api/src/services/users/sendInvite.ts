import generateCodeChallenge from '../../utilities/generateCodeChallenge'
import { sendInviteToSignupEmail } from '../email/emailService'

export const sendInvite = async (
  email: string,
  inviteToken: string,
  invitedByEmail: string,
) => {
  const codeChallenge = await generateCodeChallenge()
  /*
      let url = `https://${process.env.VITE_APP_TENANT_NAME}.b2clogin.com/\
      ${process.env.VITE_APP_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/authorize\
      ?p=${process.env.VITE_APP_POLICY_NAME}&client_id=${process.env.VITE_APP_CLIENT_ID}\
      &nonce=defaultNonce&redirect_uri=${process.env.VITE_APP_REDIRECT_URL}\
      &scope=openid&response_type=id_token&prompt=login&state=${invite.inviteToken}`
    */
  let userFlowUrl =
    `https://${process.env.APP_TENANT_NAME}.b2clogin.com/` +
    process.env.APP_TENANT_NAME +
    '.onmicrosoft.com/oauth2/v2.0/authorize' +
    '?p=' +
    process.env.APP_POLICY_SIGNUP +
    '&client_id=' +
    process.env.APP_CLIENT_ID +
    '&nonce=defaultNonce' +
    '&redirect_uri=' +
    encodeURIComponent(process.env.APP_REDIRECT_URL) +
    '&scope=openid' +
    '&response_type=code' +
    '&prompt=login' +
    '&state=' +
    inviteToken +
    '&code_challenge_method=S256' +
    '&code_challenge=' +
    codeChallenge

  const encodedEmail = encodeURIComponent(email)

  const signupLink = `${userFlowUrl}&login_hint=${encodedEmail}`

  await sendInviteToSignupEmail(email, signupLink, invitedByEmail)
}
