import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'

export async function Health(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  return { body: `Status OK!` }
}

app.http('Health', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: Health,
})
