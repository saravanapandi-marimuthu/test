import React, { useEffect, useState } from 'react'
import {
  Grid,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { CREATE_STORAGE_LOCATION } from '../../../../../graphql/mutations'
import { callSnackBar } from '../../../../../utilities/callSnackBar'
import { TagPicker } from '../../../../shared/TagPicker/TagPicker'
import {
  CreateStorageLocationDocument,
  Tag,
} from '../../../../../graphql/generated/graphql'

interface AddStorageLocationProps {
  parentData: any[]
  innerHeight?: number
  refetch: () => void
  onClose: () => void
}

export const AddStorageLocation: React.FC<AddStorageLocationProps> = ({
  parentData,
  refetch,
  onClose,
  innerHeight = 660,
}) => {
  const { id } = useParams()
  const [createStorageLocation] = useMutation(CreateStorageLocationDocument)

  const [tags, setTags] = useState<Tag[]>([])
  const [saving, setSaving] = useState<boolean>(false)
  const [input, setInput] = useState({
    name: '',
    description: '',
    // identifier: '',
    barcode: '',
    warehouseId: parseInt(id ?? '-1'),
    parentStorageLocationId: null,
  })

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [prop]: event.target.value })
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      const result = await createStorageLocation({
        variables: {
          input: {
            ...input,
            warehouseId: parseInt(id ?? '-1'),
            storageLocationTypeTagLink: {
              tagName: tags && tags[0].name,
              tagCategoryName: 'Storage Location Types',
            },
          },
        },
      })
      refetch()
      onClose()
      setInput({
        name: '',
        description: '',
        // identifier: '',
        barcode: '',
        warehouseId: parseInt(id ?? '-1'),
        parentStorageLocationId: null,
      })
      setTags([])

      setSaving(false)
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  return (
    <Box sx={{ width: '500px', paddingX: 2, paddingTop: 12 }}>
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
                selectedTags={tags}
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
                renderInput={params => <TextField {...params} label="Parent" />}
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
    </Box>
  )
}
