import { LISTING_NAMING } from '@/constants/listing-naming'
import { Ecosystem } from './useEcosystem'

export function getListingName(ecosystem?: Ecosystem | null) {
  if (!ecosystem) {
    return LISTING_NAMING.find((item) => item.type === 'LISTINGS')
  }

  const naming = ecosystem.listing_settings?.naming

  return naming
    ? LISTING_NAMING.find((item) => item.type === naming)
    : LISTING_NAMING.find((item) => item.type === 'LISTINGS')
}

export function transformCloudinaryImage(src?: string | null, width?: number): string | null {
  if (!src) return null
  if (src.endsWith('.gif')) return src // GIFs are not resized

  const baseUrl = 'https://res.cloudinary.com/apideck/image/upload/'

  // Extract image id
  if (src.includes('https://res.cloudinary.com')) {
    const fileId = src.split(baseUrl)[1]
    if (fileId) {
      return `${baseUrl}w_${width || 'auto'},f_auto/${fileId}`
    }
    return src
  }

  return src
}

interface InjectTagsOptions {
  ecosystem: Ecosystem
  category?: { name: string } | null
  listing?: { name: string } | null
}

export function injectTags(
  text: string | undefined | null,
  { ecosystem, category, listing }: InjectTagsOptions
): string {
  if (!text) return ''

  let result = text

  // Replace ecosystem name
  result = result.replace(/%ecosystem%/gi, ecosystem.name)

  // Replace category name
  if (category) {
    result = result.replace(/%category%/gi, category.name)
  }

  // Replace listing name
  if (listing) {
    result = result.replace(/%listing%/gi, listing.name)
  }

  // Replace listing naming
  const listingName = getListingName(ecosystem)
  if (listingName) {
    result = result.replace(/%listing_naming%/gi, listingName.label)
  }

  return result
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function ensureHexColor(color?: string | null): string | undefined {
  if (!color) return undefined

  // If it already starts with #, return as is
  if (color.startsWith('#')) return color

  // If it's a valid hex color without #, add it
  if (/^[0-9A-Fa-f]{3,8}$/.test(color)) {
    return `#${color}`
  }

  // Return as is for other formats (rgb, hsl, named colors, etc.)
  return color
}

