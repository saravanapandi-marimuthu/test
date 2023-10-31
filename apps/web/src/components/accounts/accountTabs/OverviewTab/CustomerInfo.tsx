import React from 'react'
import { Box, List, Typography } from '@mui/material'
import {
  At,
  CreditCard,
  CurrencyDollar,
  House,
  Money,
  Phone,
  Receipt,
  ShoppingCart,
  Users,
} from '@phosphor-icons/react'
import { backgroundColor, gap } from '../../../../contexts/ThemeContext'
import { ListItemCustom } from '../../../shared/List/ListItemCustom'
import { Company } from '../../../../graphql/generated/graphql'

interface CustomerInfo {
  data: Company | undefined
  loading: boolean
}

export const CustomerInfo: React.FC<CustomerInfo> = ({ data, loading }) => {
  console.log('Customer info component', data)
  if (data === undefined) {
    return null
  }
  const address = data?.companyAddresses[0]?.address ?? {}
  console.log('address', address)
  const customerData = [
    {
      icon: <Users color={backgroundColor} size={24} />,
      name: 'Salesperson',
      desc: '',
    },
    {
      icon: <House color={backgroundColor} size={24} />,
      name: 'Billing Address',
      desc:
        Object.keys(address).length !== 0
          ? `${address?.addressLine1 && address?.addressLine1 + ','} ${
              address?.addressLine2 && address?.addressLine2 + ','
            } ${address?.city && address?.city + ','} ${
              address?.state && address?.state + ','
            } ${address?.postalCode} ${address?.country}`
          : '',
    },
    {
      icon: <Phone color={backgroundColor} size={24} />,
      name: 'Phone number',
      desc: data?.companyPhoneNumbers?.[0]?.phoneNumber?.mainNumber,
      href: data?.companyPhoneNumbers?.[0]?.phoneNumber?.mainNumber,
      type: 'tel',
    },
    {
      icon: <At color={backgroundColor} size={24} />,
      name: 'Email',
      desc: data?.userRoles[0]?.user?.email,
      href: data?.userRoles[0]?.user?.email,
      type: 'mailto',
    },
    {
      icon: <CreditCard color={backgroundColor} size={24} />,
      name: 'Payment Terms',
      desc: 'NET 30',
    },
    {
      icon: <Money color={backgroundColor} size={24} />,
      name: 'Credit Limit',
      desc: '$2.4MM',
    },
    {
      icon: <ShoppingCart color={backgroundColor} size={24} />,
      name: 'Est. Revenue',
      desc: '$405,000',
    },
    {
      icon: <CurrencyDollar color={backgroundColor} size={24} />,
      name: 'Prepay Balance',
      desc: '$0',
    },
  ]

  const styleCustomerInfoWrapper = {
    width: `calc(50% - ${gap} / 2)`,
    borderRadius: '6px',
    boxShadow: 2,
    padding: '20px 42px 22px 7px',
  }

  return (
    <Box sx={styleCustomerInfoWrapper}>
      <Typography sx={{ fontWeight: 700, marginBottom: '29px' }}>
        Contact Info
      </Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {customerData.map((listItem, ind) => {
          return (
            <ListItemCustom
              key={`${listItem.name}-${ind}`}
              icon={listItem.icon}
              name={listItem.name}
              description={listItem.desc ?? ''}
              loading={loading}
              href={listItem.href ?? ''}
              type={listItem.type}
            />
          )
        })}
      </List>
    </Box>
  )
}
