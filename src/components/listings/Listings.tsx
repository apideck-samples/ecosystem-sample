'use client'

import Spinner from '@/components/Spinner'
import { useListings } from '@/utils/useListings'
import { Button } from '@apideck/components'
import { HiExclamation, HiOutlineCollection } from 'react-icons/hi'
import ListingCard from './ListingCard'

interface ListingsProps {
  ecosystemId: string
}

export default function Listings({ ecosystemId }: ListingsProps) {
  const { listings, isLoading, error, hasNextPage, hasPreviousPage, nextPage, previousPage } =
    useListings(ecosystemId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 p-4 text-center">
        <Spinner />
      </div>
    )
  }

  // Error State
  if (error) {
    const err = error as any
    return (
      <div className="text-center bg-white py-10 px-6 rounded-lg shadow border border-gray-200">
        <HiExclamation className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-medium text-red-800">
          {err?.message || 'An error occurred'}
        </h3>
        {err?.detail && (
          <div className="mt-3 text-left">
            <details className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 whitespace-pre-wrap">
                {typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail, null, 2)}
              </pre>
            </details>
          </div>
        )}
        <p className="mt-4 text-sm text-gray-500">
          Make sure you&apos;re using a valid ecosystem ID (UUID format). You can find your
          ecosystem ID in your Apideck Ecosystem dashboard.
        </p>
      </div>
    )
  }

  // Empty State
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center bg-white py-10 px-6 rounded-lg shadow border border-gray-200">
        <HiOutlineCollection className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No listings found</h3>
        <p className="mt-1 text-sm text-gray-500">No listings available for this ecosystem.</p>
      </div>
    )
  }

  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} ecosystemId={ecosystemId} />
        ))}
      </ul>

      {/* Pagination */}
      {(hasNextPage || hasPreviousPage) && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex-1 flex justify-start">
            {hasPreviousPage && (
              <Button
                text="Previous"
                onClick={previousPage}
                variant="outline"
                className="relative inline-flex items-center px-4 py-2"
              />
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {hasNextPage && (
              <Button
                text="Next"
                onClick={nextPage}
                variant="outline"
                className="relative inline-flex items-center px-4 py-2"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
