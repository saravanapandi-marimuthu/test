// src/components/CompanySearchBox/mockClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client'

const mockApolloClient = new ApolloClient({
  uri: '/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
})

export default mockApolloClient
