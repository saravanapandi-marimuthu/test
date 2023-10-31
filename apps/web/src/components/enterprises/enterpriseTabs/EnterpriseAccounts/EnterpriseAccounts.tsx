import { useEffect, useState, useMemo } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { useQuery } from '@apollo/client'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { useThemeMode } from '../../../../contexts/ThemeContext'
import { Column } from '../../../../types/types'
import { Link } from 'react-router-dom'
import { CustomerPrimaryContact } from '../../../CustomerPrimaryContact/CustomerPrimaryContact'
import { FlexModal } from '../../../Modals/FlexModal/FlexModal'
import { AddressView } from '../../../shared/address/AddressView/AddressView'
import { LinkCompanies } from '../../../companies/LinkCompanies/LinkCompanies'
import { Plus as PlusIcon } from '@phosphor-icons/react'

import {
  AddressType,
  CompanyAddress,
  CompanyRelationshipDirection,
  CompanyRelationshipTag,
  CompanyRelationshipType,
  RelatedCompaniesDocument,
  RelatedCompanyView,
  RoleTypes,
  UserRole,
} from '../../../../graphql/generated/graphql'
import TagChip from '../../../shared/TagChip/TagChip'
import getCategorizedAddressFromCompanyAddress from '../../../../utilities/getCategorizedAddress'

export const EnterpriseAccounts: React.FC<{
  companyId: string | undefined
}> = ({ companyId }) => {
  const [displayData, setDisplayData] = useState<RelatedCompanyView[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(false)

  const filterTagData = useMemo(() => {
    const dataTag = displayData
      .map((el: RelatedCompanyView) => {
        let dataTagNames: string[] = []
        el.companyRelationshipTags.forEach(el => {
          return (dataTagNames = [...dataTagNames, el.tag.name])
        })
        return dataTagNames
      })
      .flat()
    const uniqTagData = [...new Set(dataTag)]
    return uniqTagData
  }, [displayData])

  const { loading, error, data, refetch } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: companyId,
        companyRelationshipType: CompanyRelationshipType.EnterpriseOwner,
        // page,
        // perPage,
        // searchTerm,
        // sort,
        // filters,
        // tagFilters,
      },
    },
  })

  useEffect(() => {
    if (!loading && data) {
      setDisplayData(
        (data.relatedCompanies?.items as RelatedCompanyView[]) ?? [],
      )
      setTotalCount(data.relatedCompanies?.totalCount ?? 0)
    }
  }, [loading, data])

  const columns: Column[] = [
    {
      name: 'companyName',
      label: 'Company Name',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RelatedCompanyView) => {
            return el?.company.name
          }),
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const customerCompanyId = displayData[rowIndex].company.id
          const accountName = displayData[rowIndex].company.name
          return (
            <Link to={`/accounts/${customerCompanyId}/${accountName}`}>
              {accountName}
            </Link>
          )
        },
      },
    },
    {
      name: 'companyTags',
      label: 'Tags',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: filterTagData,
        },
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          const Tags = displayData[rowIndex].companyRelationshipTags

          return (
            <Stack
              sx={{ maxWidth: '240px' }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={1}
            >
              {Tags.map((el: CompanyRelationshipTag, ind: number) => {
                return (
                  <>
                    <TagChip
                      key={el.tag.id}
                      name={el.tag.name}
                      colorIndex={el.tag.colorIndex}
                    />
                  </>
                )
              })}
            </Stack>
          )
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex

          const companyAddress = displayData[
            rowIndex
          ].company.companyAddresses.find(
            addr => addr.addressType === AddressType.Billing,
          )

          return (
            <AddressView
              categorizedAddress={getCategorizedAddressFromCompanyAddress(
                companyAddress as CompanyAddress,
              )}
            />
          )
        },
      },
    },
    {
      name: 'contact',
      label: 'Primary Contact',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          names: displayData.map((el: RelatedCompanyView) => {
            if (!el?.company.userRoles?.length) return ''
            return el?.company.userRoles[0].user?.firstName ?? ''
          }),
        },

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          if (!displayData[rowIndex].company.userRoles) {
            return <></>
          }
          const contactRole = displayData[rowIndex]?.company.userRoles?.find(
            (role: UserRole) => role.roles?.find(r => r === RoleTypes.Contact),
          )

          return <CustomerPrimaryContact role={contactRole} />
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    // filterType: 'multiselect',
    responsive: 'standard',
    serverSide: true,
    // rowsPerPage: perPage,
    // page: page,
    rowsPerPageOptions: [10, 25, 50],
    count: totalCount,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    filter: true,
    download: false,
    print: false,
  }

  const onCompleted = () => {
    refetch()
  }

  return (
    <Stack
      spacing={2}
      sx={{
        mt: 2.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          startIcon={<PlusIcon size={18} />}
          onClick={() => {
            setIsOpenListModal(true)
          }}
        >
          Link Account
        </Button>
      </Box>
      <MUIDataTable
        title={''}
        data={displayData}
        columns={columns}
        options={options}
      />
      <FlexModal
        title={'Link Account'}
        open={isOpenListModal}
        handleClose={() => {
          setIsOpenListModal(false)
        }}
      >
        <LinkCompanies
          autoCompleteLabel="Search Account"
          companyId={companyId || ''}
          retailerRelationshipType={CompanyRelationshipType.Customer}
          relationshipType={CompanyRelationshipType.EnterpriseOwner}
          relationshipDirection={CompanyRelationshipDirection.RelatedToPrimary}
          handleOnCompleted={onCompleted}
        />
      </FlexModal>
    </Stack>
  )
}
