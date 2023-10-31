import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { ConfigurationInfo } from './ConfigurationInfo'
import { useQuery } from '@apollo/client'
import { useUser } from '../../../contexts/UserContext'
import {
  Company,
  CompanyDocument,
  CompanyQuery,
} from '../../../graphql/generated/graphql'
import { gap } from '../../../contexts/ThemeContext'

export const ConfigurationOverviewTab: React.FC = () => {
  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<CompanyQuery>(
    CompanyDocument,
    {
      variables: {
        input: {
          companyId: user?.selectedUserRole?.companyId,
        },
      },
    },
  )

  useEffect(() => {
    console.log('OverviewTab: data', data)
  }, [data])

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '20px',
        display: 'flex',
        gap: gap,
        flexWrap: 'wrap',
      }}
    >
      <ConfigurationInfo data={data?.company as Company} loading={loading} />
      {/*  space for other components */}
    </Box>
  )
}
