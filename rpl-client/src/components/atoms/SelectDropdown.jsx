import { ChevronDown } from 'lucide-react';

const SelectDropdown = ({
  options = [],
  selectedValue,
  onSelect,
  placeholder = "Pilih opsi...",
  isOpen,
  onToggle,
  size = "max-w-xs",
  className = ""
}) => {
  const selectedOption = options.find((option) => option.id === selectedValue);
  const CloseAfterSelect = (id) => {
    onSelect(id);
    if (isOpen) {
      onToggle();
    }
  }
  return (
    <div className={`relative w-full ${size} ${className}`}>
      <button
        onClick={onToggle}
        className={`relative w-full p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 transition-all duration-300 flex items-center justify-between text-left ${className}`}
      >
        <span className={`text-sm font-medium ${selectedValue ? 'text-[var(--indigo-dark)]' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden z-10 animate-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => CloseAfterSelect(option.id)}
              className="w-full p-4 text-left text-[var(--indigo-dark)] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 text-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;