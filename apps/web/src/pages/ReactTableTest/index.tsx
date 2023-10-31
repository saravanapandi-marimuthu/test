import React, { useState } from 'react'
import { EditableTable } from '../../components/EditableTable'

export const ReactTableTest: React.FC = () => {
  const [data, setData] = useState([
    {
      id: '001',
      status: 'Received',
      orderNumber: 'PO#5678',
      vendorName: 'GearGlow',
      totalPrice: '$82',
      purchaseDate: '19/01/2021',
    },
    {
      id: '002',
      status: 'Received',
      orderNumber: 'PO#8357',
      vendorName: 'Total Telecom',
      totalPrice: '$97',
      purchaseDate: '19/01/2021',
    },
    {
      id: '003',
      status: 'Received',
      orderNumber: 'PO#7655',
      vendorName: 'Cybertron',
      totalPrice: '$75',
      purchaseDate: '19/01/2021',
    },
  ])

  let columns = [
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      minWidth: 100,
      dataType: 'text',
      options: [],
    },
    {
      id: 'orderNumber',
      label: 'Order Number',
      accessor: 'orderNumber',
      minWidth: 100,
      dataType: 'text',
      options: [],
    },
    {
      id: 'vendorName',
      label: 'Vendor Name',
      accessor: 'vendorName',
      width: 200,
      dataType: 'text',
      options: [],
    },
    {
      id: 'totalPrice',
      label: 'Total Price',
      accessor: 'totalPrice',
      width: 100,
      dataType: 'text',
      options: [],
    },
    {
      id: 'purchaseDate',
      label: 'Purchase Date',
      accessor: 'purchaseDate',
      width: 150,
      dataType: 'text',
      options: [],
    },
    {
      id: 999999,
      width: 20,
      label: '+',
      disableResizing: true,
      dataType: 'null',
    },
  ]
  return (
    <EditableTable
      columns={columns}
      data={data}
      setData={setData}
      skipReset={false}
    />
  )
}
