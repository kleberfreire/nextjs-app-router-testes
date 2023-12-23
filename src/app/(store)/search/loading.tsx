'use client';

import { Skeleton } from "@/components/skeleton";
import { useSearchParams } from "next/navigation";

export default function SearchLoading() {
  const searchParams = useSearchParams()
  console.log(searchParams.get('q'))

  const query  = searchParams.get('q')
  console.log(query)
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultado para: <span className="font-semibold">{query ?? ''}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[400px]"/>
        <Skeleton className="h-[400px]"/>
        <Skeleton className="h-[400px]"/>
        <Skeleton className="h-[400px]"/>
        <Skeleton className="h-[400px]"/>
        <Skeleton className="h-[400px]"/>
      </div>
    </div>
  )
}