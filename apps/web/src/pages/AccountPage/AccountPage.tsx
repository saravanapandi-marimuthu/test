import React from 'react'
import { useParams } from 'react-router-dom'
import { Account } from '../../components/accounts/Account/Account'

export const AccountPage: React.FC = () => {
  const { id } = useParams()

  return (
    <>
      {id && <Account customerCompanyId={id} />}
      {!id && <div>Select a customer to view</div>}
    </>
  )
}
