import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { GET_ACCOUNT_ENTERPRISE_ITEMS } from '../../../graphql/enterpriseItems/queries'
import { useQuery } from '@apollo/client'
import { OrderFields } from '../../OrderFields/OrderFields'
import { AccountEnterpriseItemsData } from '../../../types/enterpriseItems/enterpriseItemsTypes'
import { CompanySearchBox } from '../../companies/CompanySearchBox/CompanySearchBox'
import TagChip from '../../shared/TagChip/TagChip'
import { Orders } from '../../Orders/Orders'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import { ArrowFatLineLeft as ArrowFatLineLeftIcon } from '@phosphor-icons/react'
import {
  CompanyDocument,
  CompanyQuery,
  CompanyRelationshipType,
  RelatedCompaniesDocument,
  Tag,
  UnitOfMeasurement,
  UnitOfMeasurementDocument,
  UnitOfMeasurementQuery,
} from '../../../graphql/generated/graphql'

export interface AddChemistryOrderProps {
  innerHeight?: number
  accountId?: string
  onCanceled?: () => void
}

interface Company {
  id: string
  companyName: string
}

export const AddChemistryOrder: React.FC<AddChemistryOrderProps> = ({
  accountId,
  onCanceled,
}) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedEnterpriseCompanyId, setSelectedEnterpriseCompanyId] =
    useState<string>('')
  const handleSubmit = () => {}

  const { data: getAccountItem, refetch } = useQuery<CompanyQuery>(
    CompanyDocument,
    {
      variables: {
        input: {
          companyId: accountId ?? '',
        },
      },
    },
  )

  const {
    loading: loadingRelatedEnterprises,
    error: errorRelatedEnterprises,
    data: relatedEnterprises,
    refetch: refetchRelatedEnterprises,
  } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: accountId ?? '',
        companyRelationshipType: CompanyRelationshipType.EnterpriseOwner,
      },
    },
  })

  const [selectedAccount, setSelectedAccount] = useState<Company>({
    id: '',
    companyName: '',
  })
  const [selectedEnterprise, setSelectedEnterprise] = useState<Company>({
    id: '',
    companyName: '',
  })
  const [fields, setFields] = useState<any[]>([])

  useEffect(() => {
    if (!getAccountItem?.company) return
    let company = getAccountItem?.company
    setSelectedAccount({ id: company.id, companyName: company.name })
  }, [getAccountItem])

  const {
    loading,
    data: fieldsRespData,
    error,
  } = useQuery<AccountEnterpriseItemsData>(GET_ACCOUNT_ENTERPRISE_ITEMS, {
    variables: {
      input: {
        companyId: selectedEnterpriseCompanyId, //user?.selectedUserRole.companyId ?? '',
        accountId: '',
      },
    },
  })

  useEffect(() => {
    if (!fieldsRespData?.getAccountEnterpriseItems) return

    const fields = fieldsRespData?.getAccountEnterpriseItems.map(
      accountEnterpriseItem => accountEnterpriseItem.field,
    )

    setFields(fields ?? [])
  }, [fieldsRespData])

  const [unitOfMeasurementData, setUnitOfMeasurementData] = useState<any[]>([])
  const {
    loading: unitOfMeasurementLoading,
    error: unitOfMeasurementError,
    data: unitOfMeasurementsRespData,
  } = useQuery<UnitOfMeasurementQuery>(UnitOfMeasurementDocument, {
    variables: {
      input: {},
    },
  })

  useEffect(() => {
    if (!unitOfMeasurementLoading && unitOfMeasurementsRespData) {
      const unitOfMeasurements = unitOfMeasurementsRespData?.unitOfMeasurements
        ?.items as UnitOfMeasurement[]
      const unitOfMeasurementData = unitOfMeasurements.map(
        (unitOfMeasurement: any) => {
          return {
            id: unitOfMeasurement.id,
            name: unitOfMeasurement.unitName,
          }
        },
      )
      setUnitOfMeasurementData(unitOfMeasurementData)
    }
  }, [unitOfMeasurementLoading, unitOfMeasurementsRespData])

  return (
    <Box padding={1}>
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<ArrowFatLineLeftIcon size={22} />}
          variant="outlined"
          onClick={onCanceled}
        >
          Back
        </Button>
        <Typography variant="h6">Add Orders</Typography>
      </Stack>
      <Box display={'flex'} sx={{ marginTop: 2 }}>
        <Typography variant={'h5'} sx={{ fontWeight: 800 }}>
          {'1240'}
        </Typography>
        <Box marginLeft={1}>
          <TagChip key={1} name={'Draft'} colorIndex={2} />
        </Box>
      </Box>
      <Box padding={1}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box width={'50%'} margin={1}>
              <TagPicker
                selectedTags={tags}
                onSelectedTagsChanged={tags => setTags(tags)}
                tagCategoryName={'Order Type'}
                enableTitle={false}
                multiple={false}
              />
            </Box>
            <Divider />
            <Box width={'40%'} margin={1}>
              {/* <CompanySearchBox
                isRequired={true}
                title={'Select Enterprise'}
                onCompanySelect={company =>
                  setSelectedEnterprise(company ?? { id: '', companyName: '' })
                }
                selectedCompanyVal={selectedEnterprise}
                // parentCompanyId={selectedAccount.id ?? ''}
              /> */}
              <div>
                {relatedEnterprises?.relatedCompanies?.items && (
                  <FormControl sx={{ flex: 1, display: 'flex' }}>
                    <InputLabel id="enterprise-farm-selector-label">
                      Enterprise (Farm)
                    </InputLabel>
                    <Select
                      labelId="enterprise-farm-selector-label"
                      fullWidth
                      size="small"
                      value={selectedEnterpriseCompanyId}
                      input={<OutlinedInput label="Enterprise (Farm)" />}
                      onChange={e => {
                        setSelectedEnterpriseCompanyId(e.target.value as string)
                      }}
                    >
                      {relatedEnterprises?.relatedCompanies.items.map(
                        company => (
                          <MenuItem
                            key={company.company.id}
                            value={company.company.id}
                          >
                            {company.company.name}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </div>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Stack direction={'row'} spacing={1} width={'100%'}>
                <Box width={'40%'}>
                  <CompanySearchBox
                    isRequired={true}
                    title="Select Account"
                    onCompanySelect={company =>
                      setSelectedAccount(company ?? { id: '', companyName: '' })
                    }
                    selectedCompanyVal={selectedAccount}
                  />
                </Box>
                <Box width={'40%'}>
                  <TagPicker
                    selectedTags={[]}
                    onSelectedTagsChanged={tags => setTags(tags)}
                    tagCategoryName={'Pay Period (date)'}
                    enableTitle={false}
                    multiple={false}
                  />
                </Box>
              </Stack>
            </Box>
            <Box>
              <OrderFields
                data={[]}
                enterpriseId={selectedEnterpriseCompanyId}
              />
            </Box>
            <Divider />
            <Box>
              <Orders
                data={{
                  orders: [],
                }}
                loading={false}
                refetch={() => {}}
                unitOfMeasurements={unitOfMeasurementData}
              />
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}
