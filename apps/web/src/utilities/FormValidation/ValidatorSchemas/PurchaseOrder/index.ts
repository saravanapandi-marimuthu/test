import moment from 'moment'
import * as yup from 'yup'

export const purchaseOrderSchema = yup.object().shape({
  vendorCompanyId: yup.string().required('Vendor is required'),
  locationId: yup.string().required('Location is required'),
  billingAccountId: yup.string().optional(),
  notes: yup.string().optional(),
  orderDate: yup
    .date()
    .nullable()
    .required('Date is required')
    .typeError('Date is required'),
  // .min(moment().startOf('day'), 'Purchase date accept only the future date'),
})
