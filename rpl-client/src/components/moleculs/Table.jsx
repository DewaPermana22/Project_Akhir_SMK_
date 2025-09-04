import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Loader2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const Table = ({ 
  columns = [], 
  data = [], 
  emptyMessage = "Tidak ada data yang ditemukan",
  loading = false,
  onRowClick,
  sortable = false,
  defaultSort = { key: '', direction: 'asc' },
  className = "",
  striped = false,
  compact = false
}) => {
  const [sortConfig, setSortConfig] = useState(defaultSort);

  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key || !sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedData = getSortedData();

  const getSortIcon = (key) => {
    if (!sortable) return null;
    
    if (sortConfig.key !== key) {
      return <ChevronsUpDown size={14} className="ml-1" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="ml-1" /> 
      : <ChevronDown size={14} className="ml-1" />;
  };

  if (loading) {
    return (
      <div className={`bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-scroll ${className}`}>
        <div className="animate-pulse">
          <Skeleton borderRadius={0}  baseColor='#d1d5db' className="h-12" />
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="border-b border-gray-200">
              <Skeleton borderRadius={0} baseColor='#d1d5db' className="h-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden shadow-md ${className}`}>
      <div className="overflow-x-auto">
        <table className={`w-full shadow-md relative table-fixed divide-y divide-[var(--indigo-dark)] ${compact ? 'text-sm' : ''}`}>
          <thead className="bg-[var(--indigo-dark)]">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`
                    px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider
                    ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.headerClassName || ''}
                  `}
                  style={{
                    width: column.width || 'auto',
                    minWidth: column.minWidth || 'auto',
                    maxWidth: column.maxWidth || 'auto',
                    ...column.headerStyle
                  }}
                  onClick={() => sortable && handleSort(column.key)}
                >
                  <div className="flex justify-center items-center">
                   <span className='text-center flex justify-center items-center'>{column.header}</span>
                    {sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-300">
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    transition-colors
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                    ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
                    ${row.rowClassName || ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`
                        px-6 py-4 text-sm text-gray-900
                        ${compact ? 'py-2' : 'py-4'}
                        ${column.cellClassName || ''}
                      `}
                      style={{
                        width: column.width || 'auto',
                        minWidth: column.minWidth || 'auto',
                        maxWidth: column.maxWidth || 'auto',
                        ...column.cellStyle
                      }}
                    >
                      <div className="truncate">
                        {column.render ? column.render(row, rowIndex) : row[column.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {loading ? (
                      <>
                        <Loader2 size={32} className="animate-spin mb-2" />
                        <p>Memuat data...</p>
                      </>
                    ) : (
                      emptyMessage
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;