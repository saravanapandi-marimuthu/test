import { BaseContext } from '@apollo/server'
import { startServerAndCreateHandler } from '@as-integrations/azure-functions'

import prisma from '../src/services/graphql/PrismaClient'
import authenticateUser from '../src/middleware/authenticationMiddleware'
import createGraphQLServer from '../src/services/graphql/createGraphQLServer'

// Set up Apollo Server
const server = createGraphQLServer()

// Set up Apollo Server with custom context function
export default startServerAndCreateHandler(server, {
  context: async ({ context }): Promise<BaseContext> => {
    const headers = context.req.headers
    const user = await authenticateUser(context, context.req, prisma)

    if (context.res.status === 401) {
      return { headers, prisma } // Return early when unauthorized
    }

    return { headers, prisma, user }
  },
})
