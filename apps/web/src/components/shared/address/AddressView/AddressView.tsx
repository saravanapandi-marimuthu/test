import { Typography, Stack } from '@mui/material'
import { CategorizedAddress } from '../../../../types/sharedTypes'

export interface AddressViewProps {
  categorizedAddress: CategorizedAddress | undefined
}

export const AddressView: React.FC<AddressViewProps> = ({
  categorizedAddress,
}) => {
  if (!categorizedAddress) {
    return <></>
  }

  return (
    <>
      <Stack>
        <Typography fontSize={10} variant="body2">
          {categorizedAddress.address.addressLine1}
        </Typography>
        <Typography fontSize={10} variant="body2">
          {categorizedAddress.address.addressLine2}
        </Typography>
        <Stack direction={'row'} spacing={1}>
          <Typography fontSize={10} variant="body2">
            {categorizedAddress.address.city}
          </Typography>
          <Typography fontSize={10} variant="body2">
            {categorizedAddress.address.state}
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Typography fontSize={10} variant="body2">
            {categorizedAddress.address.postalCode}
          </Typography>
          <Typography fontSize={10} variant="body2">
            {categorizedAddress.address.country}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default AddressView
