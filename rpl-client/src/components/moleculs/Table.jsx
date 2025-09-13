import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import LoadingTable from '../templates/loading/LoadingTable';

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
  compact = false,
  showPagination = false,
  pagination = null,
  onPageChange,
  itemsPerPage = 10,
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

  const handlePageChange = (page) => {
    if (onPageChange && page >= 1 && page <= (pagination?.lastPage || 1)) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    if (!showPagination || !pagination) return null;

    return (
      <div className="flex justify-between items-center p-4 border-t bg-[var(--indigo-dark)] border-gray-300">
        <div className="text-sm text-white">
          Menampilkan {data.length} dari {pagination.total} data
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="p-1 bg-[var(--lime)] shadow rounded-lg disabled:bg-neutral-400 text-sm transition-colors"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <div className="flex gap-1">
            {Array.from(
              { length: Math.min(5, pagination.lastPage) },
              (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-white rounded text-sm transition-colors ${
                      pagination.currentPage === page
                        ? "bg-[var(--lime)] !text-[var(--indigo-dark)]"
                        : "hover:bg-[var(--lime)]/30"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}

            {pagination.lastPage > 5 && (
              <span className="px-2 py-1 text-white">...</span>
            )}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.lastPage}
            className="p-1 bg-[var(--lime)] shadow rounded-lg disabled:bg-neutral-400 text-sm transition-colors"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <LoadingTable 
        columns={columns} 
        itemsPerPage={itemsPerPage} 
        className={className} 
        compact={compact}
        showPagination={showPagination}
      />
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
                    ${sortable ? 'cursor-pointer hover:bg-indigo-800' : ''}
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
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {renderPagination()}
    </div>
  );
};

export default Table;