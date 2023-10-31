import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Grid,
  TextField,
  Divider,
  Button,
  Autocomplete,
} from '@mui/material'
import { callSnackBar } from '../../../../../utilities/callSnackBar'
import { TagPicker } from '../../../../shared/TagPicker/TagPicker'
import {
  StorageLocationByIdDocument,
  StorageLocationByIdQuery,
  Tag,
  TagsByCategoryNameDocument,
  UpdateStorageLocationDocument,
} from '../../../../../graphql/generated/graphql'
interface EditStorageLocationProps {
  parentData: any[]
  refetchList: () => void
  onClose: () => void
  locationId: number
}

export const EditStorageLocation: React.FC<EditStorageLocationProps> = ({
  parentData,
  refetchList,
  onClose,
  locationId,
}) => {
  const [updateStorageLocation] = useMutation(UpdateStorageLocationDocument)
  const [tags, setTags] = useState<Tag[]>([])
  const [saving, setSaving] = useState<boolean>(false)
  const [input, setInput] = useState<any>({
    name: '',
    description: '',
    // identifier: '',
    barcode: '',
    parentStorageLocationId: null,
  })

  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
    refetch: refetchTags,
  } = useQuery(TagsByCategoryNameDocument, {
    variables: {
      input: {
        // filters: [],
        // sort: '',
        // searchTerm: '',
        // perPage: 9999,
        // page: 0,
        categoryName: 'Storage Location Types',
      },
    },
  })

  const {
    loading: storageLoading,
    error: storageError,
    data: storageData,
    refetch: storageRefetch,
  } = useQuery<StorageLocationByIdQuery>(StorageLocationByIdDocument, {
    variables: { input: { id: locationId } },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const tagName =
      tags.length > 0
        ? tags[0].name
        : tagsData?.tagsByCategoryName?.items.filter(
            tag =>
              tag.id ===
              storageData?.storageLocationById?.storageLocationTypeId,
          )[0].name
    setSaving(true)
    try {
      const result = await updateStorageLocation({
        variables: {
          input: {
            ...input,
            id: locationId,
            storageLocationTypeTagLink: {
              tagName: tagName,
              tagCategoryName: 'Storage Location Types',
            },
          },
        },
      })
      refetchList()
      onClose()
      setInput({
        name: '',
        description: '',
        // identifier: '',
        barcode: '',
        parentStorageLocationId: null,
      })
      setTags([])

      setSaving(false)
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [prop]: event.target.value })
    }

  // useEffect(() => {
  //   if (!tagsLoading) {
  //     if (tagsError) {
  //       callSnackBar('An unexpected error occurred with the request', 'error')
  //     }

  //     if (
  //       tagsData?.getTags.tags &&
  //       storageData.getStorageLocationById.storageLocationTypeId
  //     ) {
  //       const selectedTagObjects = tagsData?.getTags.tags.filter(
  //         (tag: { id: any }) =>
  //           tag.id === storageData.getStorageLocationById.storageLocationTypeId,
  //       )
  //       setTags(selectedTagObjects)
  //     }
  //   }
  // }, [tagsLoading, tagsData])

  useEffect(() => {
    if (!storageLoading) {
      if (storageError) {
        callSnackBar('An unexpected error occurred with the request', 'error')
      } else if (storageData) {
        // if (storageData.storageLocationById.error) {
        //   switch (storageData.storageLocationById.error) {
        //     case GetStorageLocationsError.INVALID_STORAGE_LOCATION_ID:
        //       callSnackBar('Invalid storage location ID', 'error')
        //       break
        //     default:
        //       callSnackBar('An unexpected error has occurred', 'error')
        //       break
        //   }
        // } else {
        setInput({
          name: storageData.storageLocationById?.name ?? '',
          description: storageData.storageLocationById?.description ?? '',
          // identifier: storageData.storageLocationById.identifier,
          barcode: storageData.storageLocationById?.barcode ?? '',
          parentStorageLocationId:
            Number(storageData.storageLocationById?.parentStorageLocationId) ??
            null,
        })
        // }
      }
    }
  }, [storageLoading, storageData])

  useEffect(() => {
    storageRefetch()
    refetchTags()
  }, [locationId, storageRefetch, refetchTags])

  if (storageLoading) return <CircularProgress />
  if (storageError)
    return <Typography color="error">Error: {storageError.message}</Typography>

  return (
    <Box sx={{ width: '500px', paddingX: 2, paddingTop: 12 }}>
      {storageData?.storageLocationById ? (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Name"
                  value={input.name}
                  onChange={handleChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Description"
                  value={input.description}
                  onChange={handleChange('description')}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Identifier"
                  value={input.identifier}
                  onChange={handleChange('identifier')}
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Barcode"
                  value={input.barcode}
                  onChange={handleChange('barcode')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TagPicker
                  selectedTags={
                    tagsData?.tagsByCategoryName?.items.filter(
                      tag =>
                        tag.id ===
                        storageData.storageLocationById?.storageLocationTypeId,
                    ) as Tag[]
                  }
                  onSelectedTagsChanged={tags => setTags(tags)}
                  tagCategoryName={'Storage Location Types'}
                  enableTitle={false}
                  multiple={false}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={parentData ?? []}
                  getOptionLabel={option => option.name}
                  value={
                    input?.parentStorageLocationId
                      ? parentData.find(
                          p => p.id === input.parentStorageLocationId,
                        )
                      : null
                  }
                  onChange={(e, value) => {
                    setInput(pre => ({
                      ...pre,
                      parentStorageLocationId: value?.id,
                    }))
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Parent" />
                  )}
                />
              </Grid>
            </Grid>

            <Divider />
            <Box sx={{ alignContent: 'flex-end', textAlign: 'right' }}>
              <Stack direction={'row'} spacing={2} alignItems="center">
                {saving && <CircularProgress size={18} />}
                <Button variant="contained" type="submit">
                  Save and Close
                </Button>
              </Stack>
            </Box>
          </Stack>
        </form>
      ) : (
        <Typography variant="h5" color="textSecondary">
          Storage location not found
        </Typography>
      )}
    </Box>
  )
}

export default EditStorageLocation
