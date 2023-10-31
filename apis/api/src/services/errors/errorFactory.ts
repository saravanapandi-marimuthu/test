// errorFactory.ts
import { ERROR_CODES, ERROR_MESSAGES } from './errorsRegistry'
import { ServiceError } from '../database/types/types'
export type CreateServiceErrorInput = {
  code: ERROR_CODES
  data?: any
  message?: string | null
}

export const createServiceError = (
  input: CreateServiceErrorInput,
): ServiceError => {
  const { code, data = {}, message = undefined } = input
  return new ServiceError(message ?? ERROR_MESSAGES[code], data)
}
