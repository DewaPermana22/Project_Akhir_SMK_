import { Search, XCircle } from 'lucide-react';

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Cari...", 
  onClear,
  className = "" 
}) => {
  return (
    <div className={`relative p-2 w-full max-w-xs h-fit bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 flex items-center gap-4 ${className}`}>
      <Search 
        size={18} 
        className="text-gray-400" 
      />
      <input 
        placeholder={placeholder} 
        className="flex-1 p-1 text-gray-700 placeholder-gray-400 bg-transparent outline-0 text-sm font-medium"
        type="text"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <XCircle 
            size={18} 
            className="text-gray-400 hover:text-red-500 transition-colors duration-200" 
          />
        </button>
      )}
    </div>
  );
};

export default SearchInput;