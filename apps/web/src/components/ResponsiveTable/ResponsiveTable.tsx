import React, { useState, useEffect } from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

export interface TableProps {
  data: any[]
  headers: string[]
  sortableFields: string[]
  onUpdate: (item: any) => void
  onDelete: (item: any) => void
}

const ResponsiveTable: React.FC<TableProps> = ({
  data,
  headers,
  sortableFields,
  onUpdate,
  onDelete,
}) => {
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortData = () => {
    if (sortField) {
      const sortedData = [...data].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
      return sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    }
    return data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    )
  }

  const sortedData = sortData()

  return (
    <div>
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2 font-bold">
          {headers.map((header, idx) => (
            <div
              key={header}
              className={`cursor-pointer ${
                sortableFields.includes(header) && sortField === header
                  ? 'text-blue-500'
                  : ''
              }`}
              onClick={() =>
                sortableFields.includes(header) && handleSort(header)
              }
            >
              {header}
              {sortableFields.includes(header) && (
                <span>
                  {sortField === header && sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </span>
              )}
            </div>
          ))}
          <div>Actions</div>
        </div>

        {sortedData.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2"
          >
            {headers.map((header, idx) => (
              <div key={`${item.id}-${header}`} className="flex-auto">
                {item[header]}
              </div>
            ))}
            <div className="flex-auto flex space-x-2">
              <button onClick={() => onUpdate(item)}>
                <PencilIcon className="w-6 h-6 text-blue-500" />
              </button>
              <button onClick={() => onDelete(item)}>
                <TrashIcon className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table for smaller screens */}
      <div className="md:hidden">
        {sortedData.map((item: any) => (
          <div key={item.id} className="p-2 border-b">
            {headers.map((header, idx) => (
              <div key={`${item.id}-${header}`} className="my-1">
                <span className="font-bold">{header}:</span> {item[header]}
              </div>
            ))}
            <div className="flex space-x-2">
              <button onClick={() => onUpdate(item)}>
                <PencilIcon className="w-6 h-6 text-blue-500" />
              </button>
              <button onClick={() => onDelete(item)}>
                <TrashIcon className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-2 py-1 bg-gray-200 rounded-md"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronDoubleLeftIcon className="w-6 h-6" />
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded-md"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-2 py-1 bg-gray-200 rounded-md"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded-md"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronDoubleRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ResponsiveTable
