import { FaRegFaceSadTear } from "react-icons/fa6";
import React from 'react'
import useBerita from "@/hooks/useBerita";

const EmptyNewsLatest = () => {
  const handleRefresh = () => {
    console.log("Refresh button clicked"); // Debug
    if (typeof fetchBeritaTerbaru === 'function') {
      fetchBeritaTerbaru();
    } else {
      console.error("fetchBeritaTerbaru is not a function");
    }
  };

  const {fetchBeritaTerbaru, latestNewsLoading} =  useBerita({});
  return (
    <div className='flex flex-col gap-2 py-5 flex-1 items-center col-span-full'>
        <FaRegFaceSadTear className='text-4xl text-indigo-600'/>
        <p className="text-gray-400">Maaf sepertinya Data belum tersedia!</p>
        <button disabled={latestNewsLoading} onClick={
          handleRefresh
        }
         className="text-sm bg-transparent cursor-pointer hover:text-blue-600 text-purple-600 underline">Refresh</button>
    </div>
  )
}

export default EmptyNewsLatest