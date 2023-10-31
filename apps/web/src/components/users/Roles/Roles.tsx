import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_AVAILABLE_ROLES } from '../../../graphql/queries'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import MUIDataTable from 'mui-datatables'
import {
  CancelOutlined,
  DoneOutline,
  Edit as EditIcon,
} from '@mui/icons-material'
import { ADD_ROLE } from '../../../graphql/mutations'
import SectionHeadingToolBar from '../../shared/SectionHeadingToolBar/SectionHeadingToolBar'

const Roles = () => {
  const [roles, setRoles] = useState<any[]>([])
  const [newRole, setNewRole] = useState<any>(undefined)
  const [originalRole, setOriginalRole] = useState<any>(null)
  const [editedRole, setEditedRole] = useState<any>(null)

  const { data, loading, error } = useQuery(GET_AVAILABLE_ROLES, {})
  const [addRoleMutation] = useMutation(ADD_ROLE)

  // Function to handle adding a new role
  const handleAddRole = () => {
    setNewRole({
      name: '',
      description: '',
      isEditing: true,
    })
  }

  const handleCancelAddRole = (index: any) => {
    if (newRole?.isEditing) {
      setNewRole(undefined)
    }

    setRoles(roles => {
      console.log(roles)
      return roles.map((role, idx) => {
        if (idx === index) {
          return {
            ...role,
            isEditing: false,
          }
        }

        return role
      })
    })
  }

  const handleEditRole = (index: any) => {
    console.log('handleEditRole')

    setOriginalRole(roles[index])
    setEditedRole(roles[index])
    setRoles(prevRoles => {
      return prevRoles.map((role, idx) => {
        if (idx === index) {
          return {
            ...role,
            isEditing: true,
          }
        }
        return role
      })
    })
  }

  const handleNewRoleUpdate = (field: any, value: any, rowIndex: any) => {
    const isAddingNewRole = rowIndex === roles.length
    if ((rowIndex === 0 || isAddingNewRole) && newRole) {
      setNewRole({
        ...newRole,
        [field]: value,
      })
    } else {
      setRoles(prevRoles =>
        prevRoles.map((role, idx) =>
          idx === rowIndex ? { ...role, [field]: value } : role,
        ),
      )
    }
  }

  const handleAddOrUpdateRole = async (role: any) => {
    if (originalRole) {
      const { data } = await addRoleMutation({
        variables: {
          name: originalRole.id,
          description: role.description,
        },
      })

      console.log(data)

      setRoles(
        roles.map(r =>
          r.id === data.addRole.id ? { ...data.addRole, isEditing: false } : r,
        ),
      )
      setOriginalRole(null)
    } else {
      const { data } = await addRoleMutation({
        variables: {
          name: role.id,
          description: role.description,
        },
      })

      setRoles([...roles, data.addRole])
      setNewRole(null)
    }
  }

  useEffect(() => {
    console.log(data)
    setRoles(data?.getAvailableRoles ?? [])
  }, [data])

  if (error) return <div>Error: {error.message}</div>

  if (loading) return <CircularProgress />

  const columns = [
    {
      name: 'Role',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex
          const role = roles[rowIndex] || (rowIndex === roles.length && newRole)

          const isAddingNewRole = rowIndex === roles.length

          return role?.isEditing && isAddingNewRole ? (
            <TextField
              label="Role Name"
              value={role.id}
              onChange={e =>
                handleNewRoleUpdate('id', e.target.value, rowIndex)
              }
            />
          ) : (
            <Typography sx={{ padding: 1 }}>{role?.roleName}</Typography>
          )
        },
      },
    },
    {
      name: 'Description',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex
          const role = roles[rowIndex] || (rowIndex === roles.length && newRole)

          return role?.isEditing ? (
            <TextField
              label="Description"
              value={role.description}
              onChange={e =>
                handleNewRoleUpdate('description', e.target.value, rowIndex)
              }
            />
          ) : (
            role?.description
          )
        },
      },
    },

    {
      name: 'Edit',
      options: {
        customBodyRender: (value: any, tableMeta: { rowIndex: any }) => {
          const rowIndex = tableMeta.rowIndex

          const role = roles[rowIndex] || newRole
          const roleName = (role?.Name ?? '').trim()

          return (
            <Box sx={{ minWidth: 100, textAlign: 'center' }}>
              {role?.isEditing ? (
                <>
                  {roleName && (
                    <IconButton onClick={() => handleAddOrUpdateRole(role)}>
                      <DoneOutline />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleCancelAddRole(rowIndex)}>
                    <CancelOutlined />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => handleEditRole(rowIndex)}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          )
        },
        filter: false,
        sort: false,
      },
    },
  ]

  const columnSortChange = (changedColumn: string, direction: string) => {
    console.timeLog(`Sort column: ${changedColumn} direction: ${direction}`)
  }

  const options: any = {
    fixedHeader: true,
    expandableRowsHeader: false,
    draggableColumns: { enabled: true },
    filter: false,
    download: false,
    print: false,
    sort: true,
    search: false,
    viewColumns: false,
    pagination: false,
    onColumnSortChange: columnSortChange,
    onFilterChange: (changedColumn: any, filterList: any) => {
      console.log(changedColumn, filterList)
    },
    searchAlwaysOpen: false,
    textLabels: {
      body: {
        noMatch: 'Loading...',
        toolTip: 'Sort',
        columnHeaderTooltip: (column: { label: any }) =>
          `Sort for ${column.label}`,
      },
    },
    selectableRows: 'multiple',
    filterType: 'multiselect',
    responsive: 'standard',
    rowsPerPage: 10,
  }

  return (
    <>
      <SectionHeadingToolBar
        title={'Roles'}
        loading={loading}
        hasAddButton={true}
        addButtonTitle={'Add Role'}
        hasRefreshButton={true}
        onAddButtonClicked={handleAddRole}
        onRefreshButtonClicked={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <MUIDataTable
        title={''}
        data={newRole ? [newRole, ...roles] : roles}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default Roles
