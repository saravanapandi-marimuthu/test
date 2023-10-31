import { Configuration, PublicClientApplication } from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_APP_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_APP_TENANT_NAME}.b2clogin.com/${
      import.meta.env.VITE_APP_TENANT_NAME
    }.onmicrosoft.com/${import.meta.env.VITE_APP_POLICY_NAME}`,
    knownAuthorities: [`${import.meta.env.VITE_APP_TENANT_NAME}.b2clogin.com`],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

const createConfig = (authority: string): Configuration => ({
  auth: {
    clientId: import.meta.env.VITE_APP_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_APP_TENANT_NAME}.b2clogin.com/${
      import.meta.env.VITE_APP_TENANT_NAME
    }.onmicrosoft.com/${authority}`,
    knownAuthorities: [`${import.meta.env.VITE_APP_TENANT_NAME}.b2clogin.com`],
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
})

export const signInSignUpPublicClient = new PublicClientApplication(
  createConfig(import.meta.env.VITE_APP_POLICY_NAME),
)

export const passwordResetPublicClient = new PublicClientApplication(
  createConfig('B2C_1_PasswordReset'),
)

export const editProfilePublicClient = new PublicClientApplication(
  createConfig('B2C_1_EditProfile'),
)

export const signUpPublicClient = new PublicClientApplication(
  createConfig('B2C_1_SignUp'),
)
