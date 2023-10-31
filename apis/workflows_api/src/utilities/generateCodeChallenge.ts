import * as crypto from 'crypto'

// Step 1: Generate a codeVerifier (random string)
const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString('hex')
}

// Step 2: Generate yourCodeChallenge based on the codeVerifier
const generateCodeChallenge = async () => {
  const codeVerifier = generateCodeVerifier()

  // a. Calculate the SHA-256 hash of the codeVerifier
  const hash = crypto.createHash('sha256')
  hash.update(codeVerifier)

  // b. Get the digest in base64 format
  const base64Hash = hash.digest('base64')

  // c. Base64 URL-encode the hash
  return base64Hash.replace('+', '-').replace('/', '_').replace(/=+$/, '')
}

export default generateCodeChallenge
