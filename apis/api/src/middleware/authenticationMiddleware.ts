import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import { AuthenticatedUser } from '../models/AuthenticatedUser'
import { PrismaClient } from '../../prisma/client'
import findOrCreateUserWithExternalId from '../services/database/users/findOrCreateUserWithExternalId'
import { getSigningKey } from './getSigningKey'
import splitName from '../utilities/splitName'
import { getCacheValue, setCacheValue } from '../services/cache/cacheClient'

const authHeader = 'x-horizen-authorization'
const userRoleHeader = 'x-horizen-role'

export const client = jwksClient({
  jwksUri: `https://${process.env.VITE_APP_TENANT_NAME}.b2clogin.com/${process.env.VITE_APP_TENANT_NAME}.onmicrosoft.com/${process.env.VITE_APP_POLICY_NAME}/discovery/v2.0/keys`,
})

async function authenticateUser(context, req, prisma: PrismaClient) {
  const authorizationHeader = req.headers[authHeader]

  const selectedUserRole: string = req.headers[userRoleHeader]

  if (!authorizationHeader) {
    context.res = { status: 401, body: 'Unauthorized' }
    return
  }

  try {
    const token = authorizationHeader.replace('Bearer ', '')

    const decodedToken = jwt.decode(token, { complete: true })

    if (!decodedToken?.header) {
      context.res = { status: 401, body: 'Unauthorized' }
      return
    }

    let publicKey: string | null = await getCacheValue(decodedToken.header.kid)

    if (!publicKey) {
      publicKey = await getSigningKey(decodedToken.header.kid)

      if (publicKey) {
        // Cache the public key
        await setCacheValue(decodedToken.header.kid, publicKey, 3600)
        console.log('Key added to cache')
      }
    }

    // TODO: We need to cache the publicKey
    const verifiedToken: any = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    })

    let authenticated = true

    if (!verifiedToken) {
      authenticated = false
    }

    // Fetch user and roles from the database
    const nameParts = splitName(verifiedToken)

    const user = await findOrCreateUserWithExternalId(prisma, {
      externalUserId: verifiedToken.sub,
      email: verifiedToken.emails[0],
      firstName: nameParts.firstName,
      middleName: nameParts.middleName,
      lastName: nameParts.lastName,
    })

    if (!user) {
      return new AuthenticatedUser(
        authenticated,
        verifiedToken.sub,
        null,
        verifiedToken.name,
        verifiedToken.emails[0],
        selectedUserRole,
        user.userRoles.find(role => role.id === selectedUserRole)?.companyId,
        nameParts.firstName,
        nameParts.middleName,
        nameParts.lastName,
        [],
      )
    }

    const roles = user.userRoles.map(userRole => ({
      roleId: userRole.role.id,
      companyId: userRole.company.id,
      companyName: userRole.company.companyName,
      roleName: userRole.role.id,
    }))

    const authenticatedUser = new AuthenticatedUser(
      authenticated,
      verifiedToken.sub,
      user.id,
      verifiedToken.name,
      verifiedToken.emails[0],
      user.firstName,
      user.middleName,
      user.lastName,
      selectedUserRole,
      user.userRoles.find(role => role.id === selectedUserRole)?.companyId,
      roles,
    )

    return authenticatedUser
  } catch (error) {
    console.log(error)

    context.res = { status: 401, body: 'Unauthorized' }
  }
}

export default authenticateUser
