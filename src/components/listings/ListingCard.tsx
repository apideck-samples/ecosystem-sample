'use client'

import { useDialog } from '@/providers/dialog-provider'
import { stripMarkdown } from '@/utils/text-utils'
import ListingDetails from './ListingDetails'

interface ListingCardProps {
  listing: {
    id: string
    name: string
    slug: string
    description?: string
    tag_line?: string
    logo?: {
      url: string
    }
    categories?: Array<{
      name: string
      slug: string
    }>
    published?: boolean
  }
  ecosystemId: string
}

export default function ListingCard({ listing, ecosystemId }: ListingCardProps) {
  const { showDialog } = useDialog()

  function handleClick() {
    showDialog(<ListingDetails listingId={listing.id} ecosystemId={ecosystemId} />, {
      size: '4xl'
    })
  }

  return (
    <li
      onClick={handleClick}
      className="col-span-1 bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-center p-6 space-x-4">
        {listing.logo?.url ? (
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={listing.logo.url}
              alt={listing.name}
              className="w-10 h-10 object-contain rounded"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <span className="text-white text-xl font-bold">{listing.name.charAt(0)}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 truncate">{listing.name}</h3>
          </div>
          {listing.tag_line && (
            <p className="mt-1 text-sm text-gray-600 truncate">{listing.tag_line}</p>
          )}
          {listing.description && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {stripMarkdown(listing.description)}
            </p>
          )}
          {listing.categories && listing.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {listing.categories.slice(0, 3).map((category) => (
                <span
                  key={category.slug}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {category.name}
                </span>
              ))}
              {listing.categories.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500">
                  +{listing.categories.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
