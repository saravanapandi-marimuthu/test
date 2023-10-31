import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { CustomerInfo } from './CustomerInfo'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useUser } from '../../../../contexts/UserContext'
import { RecentActivity } from './RecentActivity'
import { gap } from '../../../../contexts/ThemeContext'
import { TopProducts } from './TopProducts'
import { SalesByCategory } from './SalesByCategory'
import {
  Company,
  CompanyDocument,
  CompanyQuery,
} from '../../../../graphql/generated/graphql'

const dataTest = [
  {
    id: 1,
    item: 'WO# 1234',
    date: '05/18/2023',
    salesperson: 'Ashley',
    amount: '518,000',
  },
  {
    id: 2,
    item: 'PO# 1235',
    date: '09/12/2022',
    salesperson: 'Brian',
    amount: '867,000',
  },
  {
    id: 3,
    item: 'INV# 1234',
    date: '06/16/2022',
    salesperson: 'Richard',
    amount: '1,867,000',
  },
  {
    id: 4,
    item: 'WO# 1234',
    date: '07/26/2022',
    salesperson: 'Brandon',
    amount: '1,867,000',
  },
  {
    id: 5,
    item: 'SO# 1234',
    date: '07/26/2022',
    salesperson: 'Brandon',
    amount: '167,000',
  },
  {
    id: 6,
    item: 'WO# 1233',
    date: '01/06/2021',
    salesperson: 'Richard',
    amount: '117,000',
  },
  {
    id: 7,
    item: 'SO# 1233',
    date: '04/03/2023',
    salesperson: 'Ashley',
    amount: '117,000',
  },
  {
    id: 8,
    item: 'SO# 2233',
    date: '02/23/2023',
    salesperson: 'Ashley',
    amount: '12,000',
  },
  {
    id: 9,
    item: 'INV# 2113',
    date: '01/13/2023',
    salesperson: 'Richard',
    amount: '412,000',
  },
  {
    id: 10,
    item: 'INV# 1111',
    date: '11/13/2023',
    salesperson: 'Richard',
    amount: '312,030',
  },
  {
    id: 11,
    item: 'INV# 999',
    date: '11/13/2023',
    salesperson: 'Test',
    amount: '000,000',
  },
]

const topProductsTestData: any = [
  {
    name: 'Glyphosate',
    amount: 45000,
  },
  {
    name: 'Atrazine',
    amount: 3500,
  },
  {
    name: 'ATZ Herbicide',
    amount: 22000,
  },
  {
    name: 'Test',
    amount: 99,
  },
]

const dataTestSalesCategory = [
  {
    id: '3215',
    category: 'Chemical',
    sales: '34,000',
    chg: '22',
  },
  {
    id: '32153',
    category: 'Fertilizer',
    sales: '3,000',
    chg: '0',
  },
  {
    id: '32154',
    category: 'Seed',
    sales: '22,000',
    chg: '-10',
  },
  {
    id: '32155',
    category: 'Pork',
    sales: '14,000',
    chg: '72',
  },
]

export const OverviewTab: React.FC = () => {
  const { id } = useParams()
  const { user } = useUser()

  const { loading, error, data, refetch } = useQuery<CompanyQuery>(
    CompanyDocument,
    {
      variables: {
        input: {
          companyId: id,
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
      <CustomerInfo data={data?.company as Company} loading={loading} />
      <RecentActivity data={dataTest} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: gap,
          width: `calc(50% - ${gap} / 2)`,
        }}
      >
        <TopProducts data={topProductsTestData} />
        <SalesByCategory data={dataTestSalesCategory} maxLength={3} />
      </Box>
      {/*  space for other components */}
    </Box>
  )
}
