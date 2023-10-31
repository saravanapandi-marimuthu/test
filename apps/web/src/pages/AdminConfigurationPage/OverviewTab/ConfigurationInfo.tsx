import React from 'react'
import { Box, List, Typography } from '@mui/material'
import {
  At as AtIcon,
  House as HouseIcon,
  Phone as PhoneIcon,
  Envelope as EnvelopeIcon,
} from '@phosphor-icons/react'
import { backgroundColor, gap } from '../../../contexts/ThemeContext'
import { Company } from '../../../graphql/generated/graphql'
import { ListItemCustom } from '../../../components/shared/List/ListItemCustom'
import _ from 'lodash'

interface ConfigurationInfo {
  data: Company | undefined
  loading: boolean
}

export const ConfigurationInfo: React.FC<ConfigurationInfo> = ({
  data,
  loading,
}) => {
  const address = _.isEmpty(data?.companyAddresses)
    ? null
    : data?.companyAddresses?.[0].address

  const customerData = [
    {
      icon: <HouseIcon color={backgroundColor} size={24} />,
      name: 'Address',
      desc: address
        ? `${address?.addressLine1 && address?.addressLine1 + ','} ${
            address?.addressLine2 && address?.addressLine2 + ','
          } ${address?.city && address?.city + ','} ${
            address?.state && address?.state + ','
          } ${address?.postalCode} ${address?.country}`
        : '',
    },
    {
      icon: <PhoneIcon color={backgroundColor} size={24} />,
      name: 'Phone number',
      desc: data?.companyPhoneNumbers?.[0]?.phoneNumber?.mainNumber,
      href: data?.companyPhoneNumbers?.[0]?.phoneNumber?.mainNumber,
      type: 'tel',
    },
    {
      icon: <AtIcon color={backgroundColor} size={24} />,
      name: 'Primary Contact',
      desc:
        (data?.userRoles?.[0]?.user?.firstName ||
          data?.userRoles?.[0]?.user?.lastName) &&
        `${data?.userRoles?.[0]?.user?.firstName} ${data?.userRoles?.[0]?.user?.lastName}`,
      type: 'fullname',
    },
    {
      icon: <EnvelopeIcon color={backgroundColor} size={24} />,
      name: 'Email',
      desc: data?.userRoles?.[0]?.user?.email,
      href: data?.userRoles?.[0]?.user?.email,
      type: 'mailto',
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
        Company Info
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
