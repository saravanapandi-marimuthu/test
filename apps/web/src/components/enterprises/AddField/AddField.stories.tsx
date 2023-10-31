import type { Meta, StoryFn } from '@storybook/react'

import AddField from './AddField'
import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowFatLineLeft as ArrowFatLineLeftIcon } from '@phosphor-icons/react'
import { CompanyServiceTypes } from '../../../graphql/generated/graphql'

export const generated: StoryFn<typeof AddField> = args => {
  const backButton = (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton>
        <ArrowFatLineLeftIcon size={22} />
      </IconButton>
      <Typography variant="h6">Back</Typography>
    </Stack>
  )

  const enterpriseCompany = {
    companyId: '1',
    companyName: 'KG Farms',
    companyType: CompanyServiceTypes.Enterprise,
  }

  return <AddField {...args} enterpriseCompany={enterpriseCompany} />
}

export default {
  title: 'AddField',
  component: AddField,
} as Meta<typeof AddField>
