import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ModalAddEdit } from '../../components/Modals/ModalAddEdit/ModalAddEdit'
import { useUser } from '../../contexts/UserContext'
import SectionHeadingToolBar from '../../components/shared/SectionHeadingToolBar/SectionHeadingToolBar'
import { ControlModalButtons } from '../../components/shared/ControlModalButtons/ControlModalButtons'

const UserHomePage: React.FC = () => {
  const navigate = useNavigate()

  const manageCompanies = () => {
    navigate('/companies')
  }

  const manageUsers = () => {
    navigate('/users')
  }

  const manageConfigurations = () => {
    navigate('/adminconfig')
  }

  return (
    <>
      <Container fixed maxWidth={false} sx={{ minHeight: 300 }}>
        <SectionHeadingToolBar
          title={'User Panel'}
          loading={false}
          hasAddButton={false}
          hasRefreshButton={false}
        />

        <Box padding={4}>
          <Typography>More to come...</Typography>
        </Box>

        <ControlModalButtons />
      </Container>
    </>
  )
}

export default UserHomePage
