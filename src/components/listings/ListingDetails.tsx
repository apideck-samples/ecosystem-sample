'use client'

import Markdown from '@/components/Markdown'
import Spinner from '@/components/Spinner'
import { useDialog } from '@/providers/dialog-provider'
import { useQuery } from '@tanstack/react-query'
import { HiExternalLink, HiX } from 'react-icons/hi'

interface ListingDetailsProps {
  listingId: string
  ecosystemId: string
}

interface ListingData {
  id: string
  name: string
  slug: string
  description?: string
  tag_line?: string
  features?: string
  pricing?: string
  logo?: {
    url: string
  }
  categories?: Array<{
    id: string
    name: string
    slug: string
  }>
  collections?: Array<{
    id: string
    name: string
    slug: string
  }>
  media?: Array<{
    id: string
    url: string
    caption?: string
    type: 'SCREENSHOT' | 'VIDEO'
  }>
  screenshots?: Array<{
    id: string
    caption?: string
    file?: {
      url: string
    }
  }>
  partner?: {
    company: string
    website?: string
  }
  native_integration_link?: string
  third_party_integration_link?: string
  published?: boolean
  published_at?: string
}

async function fetchListingDetails(ecosystemId: string, listingId: string): Promise<ListingData> {
  const response = await fetch(`/api/ecosystem/listings/${listingId}?ecosystemId=${ecosystemId}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch' }))
    throw new Error(errorData.error || 'Failed to fetch listing details')
  }

  const data = await response.json()
  return data.data
}

export default function ListingDetails({ listingId, ecosystemId }: ListingDetailsProps) {
  const { hideDialog } = useDialog()

  const {
    data: listing,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listing', ecosystemId, listingId],
    queryFn: () => fetchListingDetails(ecosystemId, listingId)
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner />
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <button
            onClick={hideDialog}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'Failed to load listing details'}
        </p>
      </div>
    )
  }

  const allMedia = [
    ...(listing.screenshots?.map((s) => ({
      id: s.id,
      url: s.file?.url || '',
      caption: s.caption,
      type: 'SCREENSHOT' as const
    })) || []),
    ...(listing.media || [])
  ].filter((m) => m.url)

  return (
    <div className="flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          {listing.logo?.url && (
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <img src={listing.logo.url} alt={listing.name} className="w-14 h-14 object-contain" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 break-words">{listing.name}</h2>
            {(listing.tag_line || listing.description) && (
              <p className="mt-1 text-base text-gray-600 line-clamp-2 break-words">
                {listing.tag_line || listing.description}
              </p>
            )}
            {listing.partner?.company && (
              <p className="mt-1 text-sm text-gray-500">by {listing.partner.company}</p>
            )}
          </div>
        </div>
        <button
          onClick={hideDialog}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <HiX className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-6">
        {/* Categories & Collections */}
        {listing.categories?.length || listing.collections?.length ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {listing.categories?.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {category.name}
              </span>
            ))}
            {listing.collections?.map((collection) => (
              <span
                key={collection.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
              >
                {collection.name}
              </span>
            ))}
          </div>
        ) : null}

        {/* Description */}
        {listing.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <Markdown>{listing.description}</Markdown>
          </div>
        )}

        {/* Features */}
        {listing.features && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <Markdown>{listing.features}</Markdown>
          </div>
        )}

        {/* Pricing */}
        {listing.pricing && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
            <Markdown>{listing.pricing}</Markdown>
          </div>
        )}

        {/* Screenshots & Media */}
        {allMedia.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allMedia.map((media) => (
                <div
                  key={media.id}
                  className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                >
                  {media.type === 'VIDEO' ? (
                    <div className="aspect-video">
                      <video src={media.url} controls className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <img
                        src={media.url}
                        alt={media.caption || listing.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {media.caption && <p className="p-2 text-sm text-gray-600">{media.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(listing.native_integration_link ||
          listing.third_party_integration_link ||
          listing.partner?.website) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
            <div className="space-y-2">
              {listing.native_integration_link && (
                <a
                  href={listing.native_integration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <HiExternalLink className="w-4 h-4 mr-2" />
                  Native Integration
                </a>
              )}
              {listing.third_party_integration_link && (
                <a
                  href={listing.third_party_integration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <HiExternalLink className="w-4 h-4 mr-2" />
                  Third-Party Integration
                </a>
              )}
              {listing.partner?.website && (
                <a
                  href={listing.partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <HiExternalLink className="w-4 h-4 mr-2" />
                  Partner Website
                </a>
              )}
            </div>
          </div>
        )}

        {/* Published Status */}
        {listing.published_at && (
          <div className="text-sm text-gray-500">
            Published on {new Date(listing.published_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  )
}
