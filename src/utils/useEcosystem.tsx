'use client'

import { useQuery } from '@tanstack/react-query'

export interface Ecosystem {
  id: string
  name: string
  slug: string
  about?: string
  is_published: boolean
  primary_color?: string
  body_background_color?: string
  navigation_background_color?: string
  navigation_color?: string
  attribution?: boolean
  masthead_settings?: {
    title?: string
    description?: string
    background?: string
    background_color?: string
    background_image?: {
      url: string
      id?: string
      content_type?: string
    } | null // Note: Not in OpenAPI spec but may be present in API responses
    color?: string
    columns?: number
  }
  card_settings?: {
    columns?: number
    style?: string
    show_badges?: boolean
    show_category?: boolean
    show_description?: boolean
  }
  listing_settings?: {
    naming?: string
    install_button_label?: string
    description_title?: string
    features_title?: string
    pricing_title?: string
  }
  total_published_listings?: number
  website?: string
  custom_domain?: string
  custom_settings?: {
    css?: string
    css_link?: string
    domain?: string
  }
  navigation_sticky?: boolean
  created_at?: string
  updated_at?: string
}

async function fetchEcosystem(ecosystemId: string): Promise<Ecosystem> {
  const response = await fetch(`/api/ecosystem/${ecosystemId}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to fetch' }))
    throw new Error(errorData.error || 'Failed to fetch ecosystem')
  }

  const data = await response.json()
  return data.data
}

export function useEcosystem(ecosystemId: string | null) {
  return useQuery({
    queryKey: ['ecosystem', ecosystemId],
    queryFn: () => fetchEcosystem(ecosystemId!),
    enabled: !!ecosystemId
  })
}

