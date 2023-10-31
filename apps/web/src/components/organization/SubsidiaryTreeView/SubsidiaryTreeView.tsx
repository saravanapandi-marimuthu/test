import React from 'react'
import { Company } from '../../../types/companyTypes'
import { Tree, TreeNode } from 'react-organizational-chart'
import { Box, Button, Paper, Stack, Tooltip, Typography } from '@mui/material'
import AddressView from '../../shared/address/AddressView/AddressView'

interface SubsidiaryTreeViewProps {
  rootCompany: Company
  onClickAddSubsidiary: (company: Company) => void
}

interface SubsidiaryNodeViewProps {
  company: Company
  onClickAddSubsidiary: (company: Company) => void
}

const SubsidiaryNodeView: React.FC<SubsidiaryNodeViewProps> = ({
  company,
  onClickAddSubsidiary,
}) => {
  return (
    <Box
      flexGrow={1}
      display={'flex'}
      //   sx={{ border: '1px solid red' }}
      justifyContent={'center'}
      textAlign={'center'}
      justifyItems={'center'}
    >
      <Paper
        sx={{
          padding: 1,
          position: 'relative',
          ':hover': {
            '& .open-add-screen': {
              opacity: 1,
            },
          },
          minWidth: '300px',
          maxWidth: '300px',
        }}
        elevation={3}
      >
        <Stack direction="column" spacing={1}>
          <Box>
            <Typography variant="h6" color="text.secondary">
              {company.companyName}
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={1}>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign={'start'}
              >
                {/* <AddressView categorizedAddress={company.addresses?.[0]} /> */}
              </Typography>
              <Box flexGrow={1} justifyContent={'flex-end'} textAlign={'end'}>
                <Tooltip title="Add Subsidiary">
                  <Button
                    variant="outlined"
                    size="small"
                    className="open-add-screen"
                    sx={{
                      opacity: 0,
                      transition: '0.1s',
                      fontSize: 12,
                      p: 0.3,
                    }}
                    onClick={() => {
                      onClickAddSubsidiary(company)
                    }}
                  >
                    Add
                  </Button>
                </Tooltip>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

const RenderCompanyNode: React.FC<SubsidiaryNodeViewProps> = ({
  company,
  onClickAddSubsidiary,
}) => {
  console.log('RenderCompanyNode', company)
  return (
    <TreeNode
      label={
        <SubsidiaryNodeView
          company={company}
          onClickAddSubsidiary={onClickAddSubsidiary}
        />
      }
    >
      {company.childCompanies &&
        company.childCompanies.map(child => (
          <RenderCompanyNode
            key={child.id}
            company={child}
            onClickAddSubsidiary={onClickAddSubsidiary}
          />
        ))}
    </TreeNode>
  )
}

const SubsidiaryTreeView: React.FC<SubsidiaryTreeViewProps> = ({
  rootCompany,
  onClickAddSubsidiary,
}) => {
  return (
    <Tree
      label={
        <div>
          {
            <SubsidiaryNodeView
              company={rootCompany}
              onClickAddSubsidiary={onClickAddSubsidiary}
            />
          }
        </div>
      }
    >
      {rootCompany.childCompanies &&
        rootCompany.childCompanies.map(child => (
          <RenderCompanyNode
            key={child.id}
            company={child}
            onClickAddSubsidiary={onClickAddSubsidiary}
          />
        ))}
    </Tree>
  )
}

export default SubsidiaryTreeView
