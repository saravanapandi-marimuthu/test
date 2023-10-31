import { createClient } from 'redis'

// Environment variables for cache
const cacheHostName = process.env.AZURE_CACHE_FOR_REDIS_HOST_NAME
const cachePassword = process.env.AZURE_CACHE_FOR_REDIS_ACCESS_KEY

// Connection configuration
const client = createClient({
  // rediss for TLS
  url: `rediss://${cacheHostName}:6380`,
  password: cachePassword,
})

client.on('error', err => console.log('Redis Client Error', err))

export const setCacheValue = async (
  key: string,
  value: string,
  expirationSeconds: number = 30,
) => {
  if (!client.isOpen) {
    await client.connect()
  }

  await client.setEx(key, expirationSeconds, value)
}

export const getCacheValue = async (key: string): Promise<string> => {
  if (!client.isOpen) {
    await client.connect()
  }

  const value = await client.get(key)

  return value
}
