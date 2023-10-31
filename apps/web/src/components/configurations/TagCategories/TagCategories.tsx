import React, { useEffect } from 'react'
import {
  Tag,
  TagCategoriesDocument,
  TagCategory,
} from '../../../graphql/generated/graphql'
import { useQuery } from '@apollo/client'
import {
  SortDirection,
  ZenTableColumn,
} from '../../../zen_components/table/types/ZenTableColumn'
import ColumnHeader from '../../../zen_components/table/ColumnHeader/ColumnHeader'
import { Box, CssBaseline, Stack, Typography } from '@mui/material'
import { Tag as TagIcon } from '@phosphor-icons/react'
import { ZenTableOptions } from '../../../zen_components/table/types/ZenTableOptions'
import ZenTable from '../../../zen_components/table/ZenTable/ZenTable'
import ColorPicker from '../../shared/ColorPicker/ColorPicker'
import TagChip from '../../shared/TagChip/TagChip'
import { UnitOfMeasurementSelect } from '../../shared/UnitOfMeasurementSelect/UnitOfMeasurementSelect'
import PercentPicker from '../../shared/PercentPicker/PercentPicker'
import { TagPicker } from '../../shared/TagPicker/TagPicker'
import UomPicker from '../../../zen_components/selectors/UomPicker/UomPicker'

const TagCategories = () => {
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortBy, setSortBy] = React.useState('')
  const [sortDesc, setSortDesc] = React.useState(false)

  const [tagAnchorEls, setTagAnchorEls] = React.useState<{
    [key: string]: null | HTMLElement
  }>({})

  const { loading, error, data, refetch, fetchMore } = useQuery(
    TagCategoriesDocument,
    {
      variables: {
        input: {
          page,
          pageSize,
          searchTerm,
          sortBy,
          sortDesc,
          //filters,
        },
      },
    },
  )

  useEffect(() => {
    refetch({
      input: {
        page,
        pageSize,
        searchTerm,
        sortBy,
        sortDesc,
        //filters,
      },
    }).then(() => {
      console.log('refetch done', data)
    })
  }, [sortBy, sortDesc, searchTerm, page, pageSize])

  // Helper function to divide the array into chunks
  function chunkArray<T>(array: T[], chunk_size: number) {
    const results: T[][] = []
    const myArray: T[] = [...array]

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size))
    }

    return results
  }

  const columns: ZenTableColumn<TagCategory>[] = [
    {
      name: 'name',
      label: 'Name',
      sortable: true,
      HeaderComponent: props => (
        <ColumnHeader icon={TagIcon} name={'Name'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <Box>
          <TagChip colorIndex={rowData.colorIndex} name={rowData.name} />
        </Box>
      ),
    },
    {
      name: 'description',
      label: 'Description',
      sortable: false,
      HeaderComponent: props => (
        <ColumnHeader icon={TagIcon} name={'Description'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <Box
          display={'flex'}
          sx={{
            minWidth: '300px',
            minHeight: '30px',
          }}
        >
          {/* <UnitOfMeasurementSelect
            selectedUnitId={1}
            onChange={function (selectedUnitId: number): void {
              throw new Error('Function not implemented.')
            }}
          /> */}
          {/* <PercentPicker
            value={0}
            onChange={function (newValue: number): void {
              console.log('PercentPicker', newValue)
            }}
          /> */}
          <UomPicker
            selectedUomId={2}
            onChange={function (newSelectedUomId: number): void {
              console.log('UomPicker', newSelectedUomId)
            }}
          />
          {/* <TagPicker
            selectedTags={[rowData.tags[0]]}
            enableTitle={false}
            showAsMuiSelect={false}
            onSelectedTagsChanged={function (tags: Tag[]): void {
              // rowData.tags = tags
            }}
            tagCategoryName={'Crop'}
          /> */}
          {/* <SingleLineTextBox
            value={rowData.description}
            onEditSave={newValue => {
              // Implement the logic to save the edited value to your data source
              //handleDescriptionClose(tableMeta.rowIndex, newValue)
            }}
          /> */}
        </Box>
      ),
    },
    {
      name: 'tag',
      label: 'Tag',
      sortable: false,
      HeaderComponent: props => (
        <ColumnHeader icon={TagIcon} name={'Tag'} {...props} />
      ),
      CellComponent: ({ rowData }) => (
        <Stack direction="column" spacing={1}>
          {chunkArray(rowData.tags ?? [], 3).map((tagGroup, groupIndex) => {
            const key = `${rowData.id ?? rowData.name}-${groupIndex}`

            return (
              <Stack direction="row" spacing={1} key={key}>
                {tagGroup.map((tag, tagIndex) => {
                  const itemKey = `${tag.id ?? tag.name}-${tagIndex}`
                  return (
                    <React.Fragment key={itemKey}>
                      <TagChip
                        colorIndex={tag.colorIndex ?? 0}
                        name={tag.name ?? ''}
                        onClick={event =>
                          setTagAnchorEls({
                            ...tagAnchorEls,
                            [tag.name as any]: event.currentTarget,
                          })
                        }
                      />
                    </React.Fragment>
                  )
                })}
              </Stack>
            )
          })}
        </Stack>
      ),
    },
  ]

  console.log('Tag Categories Data', data)

  const options: ZenTableOptions<TagCategory> = {
    pageSize: pageSize,
    currentPage: page,
    sortBy: sortBy,
    sortDesc: sortDesc,
    searchFilter: searchTerm,
    totalCount: data?.tagCategories?.totalCount ?? 0,
    rowContextMenuEnabled: true,
    lassoSelectEnabled: true,
    rowReorderEnabled: true,
    onSortChange(sortBy, isDescending) {
      console.log('onSortChange', sortBy, isDescending)
      setSortBy(sortBy)
      setSortDesc(isDescending)
    },
    onPageChange: (newPage: number) => {
      console.log('onPageChange', newPage)
      setPage(newPage)
    },
    // rowActionMenu: MyCustomMenu,
    // rowActions: [
    //   {
    //     label: 'Test Action',
    //     action: testAction,
    //   },
    // ],
  }

  return (
    <Box>
      <CssBaseline />
      {!loading && data?.tagCategories?.items && (
        <ZenTable
          columns={columns}
          data={(data?.tagCategories?.items as TagCategory[]) ?? []}
          idField={'id'}
          options={options}
        />
      )}
    </Box>
  )
}

export default TagCategories
