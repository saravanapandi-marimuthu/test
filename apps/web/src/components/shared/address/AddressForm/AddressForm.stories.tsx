// AddressForm.stories.tsx

import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import AddressForm, { AddressFormProps } from './AddressForm'
import { Box } from '@mui/material'
import { AddressType } from '../../../../graphql/generated/graphql'

export default {
  title: 'Components/AddressForm',
  component: AddressForm,
} as Meta

const Template: StoryFn<AddressFormProps> = args => (
  <Box maxWidth={400}>
    <AddressForm {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  categorizedAddress: {
    addressType: AddressType.Billing,
    address: {
      addressLine1: '123 Main St',
      addressLine2: 'Suite 100',
      city: 'Denver',
      state: 'CO',
      postalCode: '80202',
      country: 'USA',
    },
  },
  enableAddressType: true,
  defaultAddressType: AddressType.Billing,
  onAddressChange: address => {
    console.log(address)
  },
}
