import { ApolloServer } from '@apollo/server'
import { resolvers, typeDefs } from './graphql'
import { ServiceError } from '../database/types/types'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'

// Set up Apollo Server

const createGraphQLServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.NODE_ENV === 'local'
        ? ApolloServerPluginLandingPageLocalDefault({
            footer: false,
            embed: {
              initialState: {
                pollForSchemaUpdates: false,
              },
            },
          })
        : ApolloServerPluginLandingPageDisabled(),
    ],
    formatError: (formattedError, error) => {
      if (error instanceof ServiceError) {
        const errorName = error.name
        const additionalData = error.additionalData

        return {
          ...formattedError,
          message: error.message,
          extensions: {
            code: errorName,
            ...additionalData,
          },
        }
      }

      // Return the original error if it's not a custom error
      return formattedError
    },
  })
}

export default createGraphQLServer
