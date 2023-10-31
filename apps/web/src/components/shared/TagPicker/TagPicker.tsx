import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import { Check as CheckIcon, X as XIcon } from '@phosphor-icons/react'
import { callSnackBar } from '../../../utilities/callSnackBar'
import {
  Tag,
  TagsByCategoryNameDocument,
} from '../../../graphql/generated/graphql'
import TagChip from '../TagChip/TagChip'

interface TagPickerProps {
  selectedTags: Tag[]
  onSelectedTagsChanged: (newValue: Tag[]) => void
  tagCategoryName: string
  enableTitle?: boolean
  multiple?: boolean
  showAsMuiSelect?: boolean
  required?: boolean
}

export const TagPicker: React.FC<TagPickerProps> = ({
  selectedTags = [],
  onSelectedTagsChanged,
  tagCategoryName,
  enableTitle = true,
  multiple = false,
  showAsMuiSelect = true,
  required = false,
}) => {
  const [open, setOpen] = React.useState(false)

  const {
    loading: loadingTags,
    error: errorTags,
    data: dataTags,
  } = useQuery(TagsByCategoryNameDocument, {
    variables: {
      input: {
        categoryName: tagCategoryName,
        // filters: [],
        // sort: '',
        // searchTerm: '',
        // perPage: 9999,
        // page: 0,
        // tagCategoryName,
      },
    },
  })

  useEffect(() => {
    if (!!errorTags) {
      callSnackBar('Getting tags error', 'error')
    }
  }, [errorTags])

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event

    const selectedTagObjects = dataTags?.tagsByCategoryName?.items.filter(tag =>
      value.includes(tag.name),
    )

    onSelectedTagsChanged((selectedTagObjects as Tag[]) || [])
  }

  const getColorIndex = (value: string): number => {
    const tag = dataTags?.tagsByCategoryName?.items.find(
      tag => tag.name === value,
    )
    return tag ? tag.colorIndex : 1
  }

  const removeSelectedTag = (tagName: string) => {
    const newSelectedTags = selectedTags.filter(tag => tag.name !== tagName)
    onSelectedTagsChanged(newSelectedTags)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      {enableTitle && (
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
          fontWeight={'bold'}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          Tags {loadingTags && <CircularProgress size={16} />}
        </Typography>
      )}

      <div>
        <FormControl size="small" sx={{ width: '100%' }}>
          {showAsMuiSelect && (
            <InputLabel id={'multiple-chip-label'}>
              {tagCategoryName}
            </InputLabel>
          )}
          <Select
            id="tags"
            labelId="multiple-chip-label"
            size="small"
            sx={{ paddingTop: 0, borderRadius: '4px' }}
            input={
              showAsMuiSelect ? (
                <OutlinedInput
                  id="select-multiple-chip"
                  label={tagCategoryName}
                />
              ) : undefined
            }
            //inputRef={inputRef}
            multiple={multiple}
            value={
              loadingTags
                ? multiple
                  ? []
                  : ''
                : multiple
                ? selectedTags.map(tag => tag.name)
                : selectedTags[0]?.name || ''
            }
            onChange={handleChange}
            disableUnderline={showAsMuiSelect ? false : true}
            variant={showAsMuiSelect ? 'outlined' : 'standard'}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {multiple ? (
                  Array.isArray(selected) ? (
                    selected.map(tag => (
                      <TagChip
                        key={tag}
                        colorIndex={getColorIndex(tag)}
                        name={tag}
                        deleteIcon={<XIcon size={18} />}
                        onDelete={() => removeSelectedTag(tag)}
                        onClick={() => setOpen(true)}
                      />
                    ))
                  ) : null
                ) : (
                  <TagChip
                    key={selected as string}
                    colorIndex={getColorIndex(selected as string)}
                    name={selected as string}
                    onClick={() => setOpen(true)}
                  />
                )}
              </Box>
            )}
            required={required}
          >
            {dataTags?.tagsByCategoryName?.items.map(tag => {
              return (
                <MenuItem key={tag.id} value={tag.name}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={10}>
                      <TagChip
                        key={tag.name}
                        colorIndex={tag.colorIndex}
                        name={tag.name}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {/* Check mark */}
                      {selectedTags.some(
                        selectedTag => selectedTag.name === tag.name,
                      ) && <CheckIcon size={18} />}
                    </Grid>
                  </Grid>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    </>
  )
}
