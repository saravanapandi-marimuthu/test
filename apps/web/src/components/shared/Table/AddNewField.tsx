import {
  Box,
  Button,
  Stack,
  TableCell,
  TableRow,
  TableFooter,
} from '@mui/material'
import { Plus } from '@phosphor-icons/react'

interface AddNewFieldProps {
  onAddNewField: () => void
  columns: any[]
  label?: string
}

export const AddNewField: React.FC<AddNewFieldProps> = ({
  onAddNewField,
  columns,
  label = 'Row',
}) => {
  const heightAddRow = '34px'
  return (
    <TableFooter
      sx={{
        height: heightAddRow,
      }}
    >
      <TableRow>
        <TableCell colSpan={columns.length + 1}>
          <Button
            variant="text"
            sx={{ width: '100%', justifyContent: 'start' }}
            onClick={onAddNewField}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Plus size={20} />
              <Box typography={'p'}>Add {label}</Box>
            </Stack>
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}
