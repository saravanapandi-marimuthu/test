import React from 'react'
import ManufacturerProducts from '../../components/manufacturers/ManufacturerProducts/ManufacturerProducts'
import { useParams } from 'react-router-dom'

const ManufacturerProductsPage = () => {
  const { manufacturerId, manufacturerName } = useParams()

  return (
    <ManufacturerProducts
      manufacturerId={manufacturerId}
      manufacturerName={manufacturerName}
    />
  )
}

export default ManufacturerProductsPage
