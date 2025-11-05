'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

async function fetchListings(ecosystemId: string, cursor?: string) {
  const cursorParams = cursor ? `&cursor=${cursor}` : ''
  const response = await fetch(
    `/api/ecosystem/listings?ecosystemId=${ecosystemId}${cursorParams}`
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    const error: any = new Error(errorData.error || 'Failed to fetch listings')
    error.statusCode = response.status
    error.detail = errorData
    throw error
  }

  return response.json()
}

export const useListings = (ecosystemId: string) => {
  const [cursor, setCursor] = useState<string | null>(null)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['listings', ecosystemId, cursor],
    queryFn: () => fetchListings(ecosystemId, cursor || undefined),
    enabled: !!ecosystemId
  })

  const nextPage = () => {
    const nextCursor = data?.meta?.cursors?.next
    if (nextCursor) {
      setCursor(nextCursor)
    }
  }

  const previousPage = () => {
    const prevCursor = data?.meta?.cursors?.previous
    if (prevCursor) {
      setCursor(prevCursor)
    }
  }

  return {
    listings: data?.data,
    isLoading,
    error,
    hasNextPage: data?.meta?.cursors?.next,
    hasPreviousPage: data?.meta?.cursors?.previous,
    nextPage,
    previousPage,
    refetch
  }
}

