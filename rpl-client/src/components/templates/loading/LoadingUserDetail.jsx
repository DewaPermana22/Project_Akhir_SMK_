import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingUserDetail = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <Skeleton className="w-12 h-12 rounded-full bg-white/20" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-white/15" />
        <Skeleton className="h-3 w-20 bg-white/10" />
      </div>
    </div>
  )
}

export default LoadingUserDetail