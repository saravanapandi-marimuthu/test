import { AddChemistryOrder } from '../../../../../ChemistryOrder/AddChemistryOrder/AddChemistryOrder'

export const AddOrders: React.FC<{
  companyId: string | undefined
  onCanceled?: () => void
}> = ({ companyId, onCanceled }) => {
  return (
    <div>
      <AddChemistryOrder accountId={companyId} onCanceled={onCanceled} />
    </div>
  )
}
