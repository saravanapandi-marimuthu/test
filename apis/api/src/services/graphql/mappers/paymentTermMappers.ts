import { PaymentTerm as PrismaPaymentTerm } from '../../../../prisma/client'
import { PaymentTerm } from '../generated/graphql'

export const mapPrismaPaymentTermToGraphqlPaymentTerm = async (
  paymentTerm: PrismaPaymentTerm,
): Promise<PaymentTerm> => {
  return paymentTerm
}
