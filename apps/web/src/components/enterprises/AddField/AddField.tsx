import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {
  MapPinLine as MapPinLineIcon,
  Plus as PlusIcon,
  ArrowFatLineLeft as ArrowFatLineLeftIcon,
} from '@phosphor-icons/react'
import MapWidget from '../../../googleMaps/components/MapWidget/MapWidget'
import { BasicCompanyInfo } from '../../../types/companyTypes'

import { US_STATES } from '../../../constants/states'
import { useMutation, useQuery } from '@apollo/client'
import { useThemeMode } from '../../../contexts/ThemeContext'
import { HighlightedBox } from '../../shared/mui/HighlightedBox/HighlightedBox'
import { BillingSplitInput } from '../../../graphql/enterpriseItems/types'
import { CreateFieldData } from '../../../types/enterpriseItems/field/fieldTypes'
import { CREATE_FIELD } from '../../../graphql/enterpriseItems/mutations'
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import BillingSplitDesigner from '../BillingSplitDesigner/BillingSplitDesigner'
import {
  CompanyRelationshipType,
  CompanyServiceTypes,
  RelatedCompaniesDocument,
  Tag,
} from '../../../graphql/generated/graphql'

export interface AddFieldProps {
  enterpriseCompany?: BasicCompanyInfo
  accountCompany?: BasicCompanyInfo
  onClose?: () => void
  onCanceled?: () => void
}

const AddField = (props: AddFieldProps) => {
  const [billingSplitName, setBillingSplitName] = useState<string>('')
  const [fieldName, setFieldName] = useState<string>('')
  const [plssLocation, setPlssLocation] = useState<string>('')
  const [plssLocationState, setPlssLocationState] = useState<string>('')
  const [latitude, setLatitude] = useState<string>('')
  const [longitude, setLongitude] = useState<string>('')
  const [fieldTags, setFieldTags] = useState<Tag[]>([])
  const [estimatedAcres, setEstimatedAcres] = useState<string>('')
  const [tagCategoryName, setTagCategoryName] = useState<string>('Crop')
  const [saving, setSaving] = useState<boolean>(false)
  const [showBillingSplitDesignerDrawer, setShowBillingSplitDesignerDrawer] =
    useState<boolean>(false)
  const [availableAccountCompanies, setAvailableAccountCompanies] = useState<
    BasicCompanyInfo[]
  >([])
  const [validBillingSplitTree, setValidBillingSplitTree] =
    useState<boolean>(false)

  const [selectedEnterpriseCompanyId, setSelectedEnterpriseCompanyId] =
    useState<string | null>(null)

  const [selectedAccountCompanyId, setSelectedAccountCompanyId] = useState<
    string | null
  >(null)

  const [billingSplits, setBillingSplits] = useState<BillingSplitInput[]>([])

  const [geoJsonData, setGeoJsonData] = useState<any>(null)

  const theme = useThemeMode().theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const canSave = useMemo(() => {
    if (fieldName === '') return false
    if (!selectedEnterpriseCompanyId) return false
    if (plssLocation === '') return false
    if (plssLocationState === '') return false
    if (estimatedAcres === '') return false
    //if (latitude === '') return false
    //if (longitude === '') return false
    if (fieldTags.length === 0) return false

    if (!validBillingSplitTree) return false

    return true
  }, [
    fieldName,
    selectedEnterpriseCompanyId,
    plssLocation,
    plssLocationState,
    fieldTags,
    estimatedAcres,
    latitude,
    longitude,
    validBillingSplitTree,
  ])

  const [createField, { called, loading, data, error }] =
    useMutation<CreateFieldData>(CREATE_FIELD)

  // Destructure props
  const { enterpriseCompany, accountCompany, onClose, onCanceled } = props

  const {
    loading: loadingRelatedEnterprises,
    error: errorRelatedEnterprises,
    data: relatedEnterprises,
    refetch: refetchRelatedEnterprises,
  } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: selectedAccountCompanyId,
        companyRelationshipType: CompanyRelationshipType.EnterpriseOwner,
      },
    },
  })

  const {
    loading: loadingRelatedAccounts,
    error: errorRelatedAccounts,
    data: relatedAccounts,
    refetch: refetchRelatedAccounts,
  } = useQuery(RelatedCompaniesDocument, {
    variables: {
      input: {
        companyId: selectedEnterpriseCompanyId,
        companyRelationshipType: CompanyRelationshipType.EnterpriseOwner,
      },
    },
  })

  useEffect(() => {
    if (accountCompany) {
      console.log('accountCompany', accountCompany)
      setSelectedAccountCompanyId(accountCompany.companyId)
    }
  }, [accountCompany])

  useEffect(() => {
    if (selectedAccountCompanyId) {
      console.log('selectedAccountCompanyId', selectedAccountCompanyId)
      refetchRelatedEnterprises()
    }
  }, [selectedAccountCompanyId])

  useEffect(() => {
    if (enterpriseCompany) {
      console.log('enterpriseCompany', enterpriseCompany)
      setSelectedAccountCompanyId(enterpriseCompany.companyId)
    }
  }, [enterpriseCompany])

  useEffect(() => {
    if (selectedEnterpriseCompanyId) {
      console.log('selectedEnterpriseCompanyId', selectedEnterpriseCompanyId)
      refetchRelatedAccounts()
    }
  }, [selectedEnterpriseCompanyId])

  useEffect(() => {
    console.log('relatedAccounts', relatedAccounts)
    if (!relatedAccounts) return

    const availableAccountCompanies =
      relatedAccounts.relatedCompanies?.items.map(company => {
        return {
          companyId: company.company.id,
          companyName: company.company.name,
          companyType: CompanyServiceTypes.Account,
        }
      }) ?? []

    console.log('Updated available companies', availableAccountCompanies)

    setAvailableAccountCompanies(availableAccountCompanies)
  }, [relatedAccounts])

  const handleBillingSplitChange = (
    billingSplitName: string,
    billingSplits: BillingSplitInput[],
    validSplitTree: boolean,
  ): void => {
    setBillingSplitName(billingSplitName)
    setValidBillingSplitTree(validSplitTree)
    setBillingSplits(billingSplits)
    console.log('Is valid split tree', validSplitTree, billingSplits)
  }

  const handleCreateField = () => {
    const input = {
      enterpriseCompanyId: selectedEnterpriseCompanyId ?? '',
      fieldName: fieldName,
      plssLocation: plssLocation,
      plssLocationState: plssLocationState,
      gpsCoordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      fieldTags: fieldTags.map((tag: any) => {
        return {
          tagName: tag.tagName,
          tagCategoryName: tag.tagCategory.tagCategoryName,
        }
      }),
      billingSplitGroupName: billingSplitName,
      billingSplits: billingSplits,
      estimatedArea: parseFloat(estimatedAcres),
      notes: 'Test Notes',
      fieldBoundaryData: geoJsonData,
    }

    setSaving(true)
    console.log('handleCreateField', input)

    createField({
      variables: {
        input,
      },
    })

    setSaving(false)
  }

  return (
    <>
      <CssBaseline />
      {/* <Container sx={{ width: '100vh' }}> */}
      <Grid
        container
        spacing={1}
        sx={{
          height: { xs: 'auto', md: 850 },
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid
          item
          xs={12}
          md={isSmallScreen ? 12 : true}
          sx={{
            minWidth: { md: 400 },
            maxWidth: { md: 600 },
            height: { xs: 'auto', md: '100%' },
          }}
        >
          <Box
            //elevation={3}
            sx={{
              height: 842,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              padding={1}
              sx={{
                overflow: 'hidden',
                overflowY: 'scroll',
                flexGrow: 0,
                height: 800,
                maxHeight: '850px',
              }}
            >
              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<ArrowFatLineLeftIcon size={22} />}
                    variant="outlined"
                    onClick={onCanceled}
                  >
                    Back
                  </Button>
                  <Typography variant="h6">Add Field</Typography>
                </Stack>
                <TextField
                  fullWidth
                  label="Field Name"
                  required
                  size="small"
                  variant="outlined"
                  value={fieldName}
                  onChange={e => setFieldName(e.target.value)}
                />
                {enterpriseCompany ? (
                  <Stack direction="row" spacing={1}>
                    <Typography color="text.secondary" variant="body1">
                      Enterprise:
                    </Typography>
                    <Typography variant="body1">
                      {enterpriseCompany.companyName}
                    </Typography>
                  </Stack>
                ) : (
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
                          onChange={e =>
                            setSelectedEnterpriseCompanyId(
                              e.target.value as string,
                            )
                          }
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
                )}

                <Box margin={1} />
                <Typography variant="h6" color="text.secondary">
                  Field Details
                </Typography>
              </Stack>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="PLSS Location"
                    required
                    size="small"
                    variant="outlined"
                    value={plssLocation}
                    onChange={e => setPlssLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ flex: 1, display: 'flex' }}>
                    <InputLabel id="state-province-selector-label">
                      State/Province
                    </InputLabel>
                    <Select
                      labelId="state-province-selector-label"
                      required
                      value={plssLocationState}
                      fullWidth
                      size="small"
                      onChange={(e: SelectChangeEvent) => {
                        setPlssLocationState(e.target.value)
                      }}
                      input={<OutlinedInput label="State/Province" />}
                    >
                      {Object.keys(US_STATES).map((key, index) => {
                        return (
                          <MenuItem key={`SelectItem-${key}`} value={key}>
                            {US_STATES[key as keyof typeof US_STATES]}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    value={latitude}
                    size="small"
                    variant="outlined"
                    onChange={e => {
                      setLatitude(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Longitude"
                    value={longitude}
                    size="small"
                    variant="outlined"
                    onChange={e => {
                      setLongitude(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} flexGrow={1} textAlign={'right'}>
                  <Button
                    variant="outlined"
                    startIcon={<MapPinLineIcon size={22} />}
                  >
                    Select on Map
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginBottom: 1 }}
                  alignContent={'center'}
                  alignItems={'center'}
                  alignSelf={'center'}
                >
                  <TagPicker
                    selectedTags={fieldTags}
                    onSelectedTagsChanged={tags => setFieldTags(tags)}
                    tagCategoryName={tagCategoryName}
                    enableTitle={false}
                    multiple={true}
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ marginBottom: 1 }}>
                  <TextField
                    label="Estimated Acres"
                    required
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={estimatedAcres}
                    onChange={e => setEstimatedAcres(e.target.value)}
                  />
                </Grid>
              </Grid>
              {relatedAccounts?.relatedCompanies && (
                <>
                  <BillingSplitDesigner
                    selectedAccountCompanyId={selectedAccountCompanyId}
                    availableAccountCompanies={availableAccountCompanies}
                    onBillingSplitChange={handleBillingSplitChange}
                    isCompactView={true}
                  />
                </>
              )}
            </Box>
            <HighlightedBox
              display={'flex'}
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              sx={{
                padding: 2,
                paddingY: 3,
              }}
            >
              <Stack direction={'row'} spacing={2}>
                {saving && (
                  <Box sx={{ paddingX: 2 }}>
                    <CircularProgress size={18} />
                  </Box>
                )}
                <Button
                  variant="contained"
                  size="medium"
                  disabled={saving || !canSave}
                  onClick={handleCreateField}
                >
                  Save
                </Button>
              </Stack>
            </HighlightedBox>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md
          sx={{
            width: '100vh',
            height: '100vh',
            maxHeight: '850px',
          }}
        >
          <Box
            // elevation={3}
            sx={{
              height: '100%',
              width: '100%',
            }}
          >
            <MapWidget
              onUpdate={function (
                updatedBoundaries: FeatureCollection<
                  Geometry,
                  GeoJsonProperties
                >,
              ): void {
                setGeoJsonData(updatedBoundaries)
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  )
}

export default AddField
