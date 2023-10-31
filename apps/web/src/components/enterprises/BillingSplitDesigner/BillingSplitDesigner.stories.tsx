import type { Meta, StoryFn } from '@storybook/react'

import BillingSplitDesigner from './BillingSplitDesigner'
import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowFatLineLeft as ArrowFatLineLeftIcon } from '@phosphor-icons/react'
import { CompanyServiceTypes } from '../../../graphql/generated/graphql'

export const generated: StoryFn<typeof BillingSplitDesigner> = args => {
  const backButton = (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton>
        <ArrowFatLineLeftIcon size={22} />
      </IconButton>
      <Typography variant="h6">Back</Typography>
    </Stack>
  )

  const accountCompanies = [
    {
      companyId: '1',
      companyName: 'KG Farms',
      companyType: CompanyServiceTypes.Account,
    },
    {
      companyId: '2',
      companyName: 'SH Farms',
      companyType: CompanyServiceTypes.Account,
    },
    {
      companyId: '3',
      companyName: 'Seth Hall Farms',
      companyType: CompanyServiceTypes.Account,
    },
    {
      companyId: '4',
      companyName: 'Elizabeth Farms',
      companyType: CompanyServiceTypes.Account,
    },
    {
      companyId: '5',
      companyName: 'Bob Farms',
      companyType: CompanyServiceTypes.Account,
    },
  ]

  return (
    <BillingSplitDesigner
      {...args}
      selectedAccountCompanyId={'1'}
      availableAccountCompanies={accountCompanies}
    />
  )
}

export default {
  title: 'BillingSplitDesigner',
  component: BillingSplitDesigner,
} as Meta<typeof BillingSplitDesigner>
