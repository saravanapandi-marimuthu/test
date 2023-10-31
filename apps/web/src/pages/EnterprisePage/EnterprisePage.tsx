import React from 'react'
import { Container } from '@mui/material'
import { Enterprise } from '../../components/enterprises/Enterprise/Enterprise'
import { useParams } from 'react-router-dom'

export const EnterprisePage: React.FC = () => {
  const { id } = useParams()

  return (
    <>
      {id && <Enterprise customerCompanyId={id} />}
      {!id && <div>Select a enterprise to view</div>}
    </>
  )
}
