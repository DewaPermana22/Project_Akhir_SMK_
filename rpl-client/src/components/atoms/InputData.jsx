import React from 'react'

const InputData = ({label, placeholder, type, name, className, value, onChange, onBlur}) => {
  return (
    <div className='flex w-full gap-2 justify-start flex-col'>
      <label className='text-sm text-gray-700' htmlFor={name}>{label}</label>
      <input 
        className={`p-3 ${className} bg-white rounded-xl w-full border border-gray-200 text-sm outline-0 `} 
        type={type} 
        name={name} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default InputData