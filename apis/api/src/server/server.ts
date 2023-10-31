import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { json } from 'body-parser'
import createGraphQLServer from '../services/graphql/createGraphQLServer'

async function createServer() {
  const app = express()
  const server = createGraphQLServer()

  await server.start()

  // Set up your Express routes here. You can reuse logic from your Azure Functions.
  app.use(
    '/api/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server),
  )

  // For example:
  app.get('/health', (req, res) => {
    // Reuse Azure Function logic or call the Azure Function directly.
    console.log('Hello from Horizen!')
    res.send({ message: 'Hello from Horizen!' })
  })

  app.listen(3000, () => {
    console.log('API running on port 3000')
  })
}

createServer().catch(error => {
  console.error(error)
  process.exit(1)
})
