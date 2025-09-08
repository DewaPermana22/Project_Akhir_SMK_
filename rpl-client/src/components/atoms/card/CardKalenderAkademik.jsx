import { CalendarCheck2, DownloadIcon } from 'lucide-react'
import React from 'react'

const CardKalenderAkademik = ({judulCard, deskCard}) => {
  return (
    <div className='border flex items-center sx gap-4 w-full border-gray-200 p-5  bg-[var(--white)] rounded-2xl cursor-pointer  transition-shadow ease-linear duration-200'>
        <div className='bg-[var(--lime)] p-4 rounded-lg shadow-sm'>
            <CalendarCheck2 size={20} className='text-[var(--purple)]'/>
        </div>
        <div className='flex flex-col justify-start space-y-0.5'>
        <p className='font-eudo-bold'>{judulCard}</p>
        <span className='text-xs text-gray-400'>{deskCard}</span>
        </div>
        <div className='ml-auto bg-[var(--lime)] p-3 rounded-lg shadow-sm hover:bg-[var(--lavender)] transition-colors ease-linear duration-200'>   
            <DownloadIcon size={20} className='text-[var(--indigo-dark)]'/>
        </div>
    </div>
  )
}

export default CardKalenderAkademik