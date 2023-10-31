import { client } from './authenticationMiddleware'

export const getSigningKey = async (kid: any) => {
  try {
    let key = await client.getSigningKey(kid)
    return key.getPublicKey()
  } catch (error) {
    console.error(`Error getSigningKey ${JSON.stringify(error)}`)
    throw error
  }
}
