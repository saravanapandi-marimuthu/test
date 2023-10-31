import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, Stack } from '@mui/material'
import { Plus as PlusIcon } from '@phosphor-icons/react'
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from 'mui-datatables'
import { FlexModal } from '../../../../Modals/FlexModal/FlexModal'
import { AddFramField } from './AddFarmField'

export const Farm: React.FC<any> = ({ data }) => {
  const [displayData, setDisplayData] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  const columns = [
    {
      name: 'name',
      label: 'Field Name',
      options: {
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>1{/* {dataFieldsTest?.[rowIndex]?.category} */}</Box>
        },
      },
    },
    {
      name: 'location',
      label: 'Geo-Location',
      options: {
        filter: false,
        sortThirdClickReset: true,

        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>$</Box>
        },
      },
    },
    {
      name: 'owner',
      label: 'Ownership Split',
      options: {
        filter: false,
        sortThirdClickReset: true,
        customBodyRender: (
          value: any,
          tableMeta: { rowIndex: any },
          updateValue: any,
        ) => {
          const rowIndex = tableMeta.rowIndex
          return <Box>1</Box>
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    responsive: 'standard',
    serverSide: true,
    filter: false,
    search: false,
    viewColumns: false,
    pagination: false,
    fixedHeader: true,
    draggableColumns: { enabled: true },
    download: false,
    print: false,
    searchAlwaysOpen: false,
    selectableRowsHeader: false,
    selectableRows: undefined,
  }

  const address = data.address
  const fullAdress = `${address.addressLine1} ${address.addressLine2 + ','} ${
    address.city + ','
  } ${address.state} ${address.postalCode + ','} ${address.country}`

  useEffect(() => {
    setDisplayData([])
  }, [displayData])

  return (
    <>
      <Accordion key={data.id} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            {data.name} - Identifier: {data.id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack>
              <Typography>
                <b>Adress:</b> {fullAdress}
              </Typography>
              <Typography>
                <b>Notes:</b> {data.notes}
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              onClick={() => setIsOpenModal(true)}
              startIcon={<PlusIcon size={16} />}
            >
              Add Field
            </Button>
          </Stack>
          <Box>
            <MUIDataTable
              title={''}
              data={[]}
              columns={columns}
              options={options}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <FlexModal
        title={'New Farm Field'}
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      >
        <AddFramField
          customerId={undefined}
          providerCompanyId={undefined}
          onSave={() => {}}
          setIsOpenModal={() => {}}
        />
      </FlexModal>
    </>
  )
}
