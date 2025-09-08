import { useState } from 'react';
import CardMateri from '../../../atoms/card/CardMateri';
import SearchInput from '../../../atoms/SearchInput';
import SelectDropdown from '../../../atoms/SelectDropdown';

const MateriSiswa = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subjects = [
    'IPAS',
    'Matematika',
    'Projek Kreatif dan Kewirausahaan',
    'Bahasa Indonesia',
    'Bahasa Inggris'
  ];

  const materiMap = [
    {key : 1, judul : "Pengenalan Bunga Majemuk", mapel : 'Matematika'},
    {key : 2, judul : "Mitigasi Bencana", mapel : 'IPAS'},
    {key : 3, judul : "Surat Lamaran Kerja", mapel : 'Bahasa Indonesia'},
    {key : 4, judul : "Geguritan", mapel : 'Bahasa Daerah'},
    {key : 5, judul : "Kehidupan Berpancasila", mapel : 'Pendidikan Pancasila dan Kewarganegaraan'},
    {key : 6, judul : "Job Application Letter", mapel : 'Bahasa Inggris'},
    {key : 7, judul : "Pengertian Maulid Nabi", mapel : 'Pendidikan Agama dan Budi Pekerti'},
    {key : 8, judul : "Permainan Bola Besar", mapel : 'Pendidikan Jasmani, Olahraga, dan Kesehatan'},
    {key : 9, judul : "Arus Kas dan Neraca", mapel : 'Project Kreatif dan Kewirausahaan'},
    {key : 10, judul : "Integral Dasar", mapel : 'Matematika Tingkat Lanjut'},
  ];
  
  const clearSearch = () => {
    setSearchValue('');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex flex-col gap-6 overflow-hidden'>
      <div className="flex gap-4 flex-shrink-0">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={clearSearch}
          placeholder="Cari materi pembelajaran..."
        />
        
        <SelectDropdown
          options={subjects}
          selectedValue={selectedSubject}
          onSelect={handleSubjectSelect}
          isOpen={isDropdownOpen}
          onToggle={toggleDropdown}
          placeholder="Pilih Mata Pelajaran"
        />
      </div>

      <div className='h-[calc(100vh-190px)] bg-[var(--lavender-bg)] flex flex-col gap-1 rounded-2xl p-5 border border-[var(--gray-5)] overflow-y-auto'>
        {materiMap.map((materi) => (
            <CardMateri key={materi.key} judul={materi.judul} mapel={materi.mapel} />
        ))}
      </div>
    </div>
  );
};

export default MateriSiswa;