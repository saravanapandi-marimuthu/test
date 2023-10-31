// Storybook to display the AddressView component

import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import AddressView, { AddressViewProps } from './AddressView'
import { Box } from '@mui/material'
import { AddressType } from '../../../../graphql/generated/graphql'

export default {
  title: 'Components/AddressView',
  component: AddressView,
} as Meta

const Template: StoryFn<AddressViewProps> = args => (
  <Box maxWidth={400}>
    <AddressView {...args} />
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
}
