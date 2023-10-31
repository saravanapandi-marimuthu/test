const defaultPaymentTerms: Array<{
  termType: string
  dueDays: number
  description: string
}> = [
  {
    termType: 'NET7',
    dueDays: 7,
    description: 'Invoice must be paid within 10 days of the invoice date',
  },
  {
    termType: 'NET14',
    dueDays: 14,
    description: 'Invoice must be paid within 14 days of the invoice date',
  },
  {
    termType: 'NET30',
    dueDays: 30,
    description: 'Invoice must be paid within 30 days of the invoice date',
  },
  {
    termType: 'NET45',
    dueDays: 45,
    description: 'Invoice must be paid within 45 days of the invoice date',
  },
  {
    termType: 'NET60',
    dueDays: 60,
    description: 'Invoice must be paid within 60 days of the invoice date',
  },
  {
    termType: 'Due Upon Receipt',
    dueDays: undefined,
    description: 'Payment is due as soon as the buyer receives the invoice',
  },
  {
    termType: 'EOM',
    dueDays: 0,
    description:
      'Payment is due at the end of the month in which the invoice is received',
  },
  {
    termType: 'Prepayment',
    dueDays: 0,
    description:
      'Buyer must pay before the product is produced or the service is rendered',
  },
  {
    termType: 'Line of Credit',
    dueDays: 0,
    description: 'Line of credit',
  },
  {
    termType: '50% Advance, 50% Upon Delivery',
    dueDays: 0,
    description:
      'Buyer pays 50% of the total amount before the service or product is provided and the remaining 50% after delivery.',
  },
  {
    termType: 'COD',
    dueDays: 0,
    description: 'Cash should be paid when the goods are delivered',
  },
]

export default defaultPaymentTerms
