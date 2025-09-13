import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingTable = ({ columns, itemsPerPage, className, compact}) => {
  return (
    <div className={`overflow-hidden shadow-md ${className}`}>
        <div className="overflow-x-auto">
          <table className={`w-full shadow-md relative table-fixed divide-y divide-slate-200${compact ? 'text-sm' : ''}`}>
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`
                      px-6 py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider
                      ${column.headerClassName || ''}
                    `}
                    style={{
                      width: column.width || 'auto',
                      minWidth: column.minWidth || 'auto',
                      maxWidth: column.maxWidth || 'auto',
                      ...column.headerStyle
                    }}
                  >
                    <Skeleton className="h-4 w-20 bg-white/20" />
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-slate-100">
              {[...Array(itemsPerPage || 5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 ${compact ? 'py-2' : 'py-4'}`}
                    >
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default LoadingTable