'use client'

import {
  capitalizeFirst,
  ensureHexColor,
  getListingName,
  injectTags,
  transformCloudinaryImage
} from '@/utils/ecosystem-utils'
import { Ecosystem } from '@/utils/useEcosystem'
import Image from 'next/image'

interface EcosystemHeroProps {
  ecosystem: Ecosystem
}

export default function EcosystemHero({ ecosystem }: EcosystemHeroProps) {
  const masthead = ecosystem.masthead_settings
  const hasBackground =
    masthead?.background || masthead?.background_color || masthead?.background_image

  // Ensure color values have proper # prefix
  const backgroundColor =
    ensureHexColor(masthead?.background_color || ecosystem.primary_color) || '#6366f1'
  const providedTextColor: string | null = masthead?.color
    ? ensureHexColor(masthead.color) || null
    : null

  const hasBackgroundImage = !!masthead?.background_image?.url
  const backgroundImageUrl = hasBackgroundImage
    ? transformCloudinaryImage(masthead?.background_image?.url, 1920)
    : null

  // Inject dynamic variables into text
  const title = injectTags(masthead?.title || ecosystem.name, { ecosystem })
  const description = injectTags(masthead?.description || ecosystem.about, { ecosystem })

  // Get listing naming
  const listingName = getListingName(ecosystem)

  // Smart text color selection with contrast checking
  const finalTextColor = getContrastingTextColor(
    backgroundColor,
    providedTextColor,
    hasBackgroundImage
  )

  // Check if we should use Next.js Image for better performance
  const useNextImage =
    backgroundImageUrl && !ecosystem.custom_settings?.css && !ecosystem.custom_settings?.css_link

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg mb-8"
      style={{
        backgroundColor: hasBackground ? backgroundColor : undefined,
        backgroundImage:
          masthead?.background && !backgroundImageUrl ? masthead.background : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: finalTextColor,
        minHeight: '320px'
      }}
    >
      {/* Next.js Image for Cloudinary images */}
      {useNextImage && backgroundImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
      )}

      {/* Background image fallback for non-Cloudinary images */}
      {!useNextImage && backgroundImageUrl && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Overlay for better text readability when there's a background image */}
      {(hasBackgroundImage || masthead?.background) && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(135deg, ${backgroundColor}dd 0%, ${backgroundColor}99 100%)`
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight my-4">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Stats */}
          {ecosystem.total_published_listings !== undefined && listingName && (
            <div className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-2xl font-bold mr-2">{ecosystem.total_published_listings}</span>
              <span className="text-base opacity-90">
                {ecosystem.total_published_listings === 1
                  ? capitalizeFirst(listingName.singular)
                  : capitalizeFirst(listingName.label)}
              </span>
            </div>
          )}

          {/* Website Link */}
          {ecosystem.website && (
            <div className="mt-6">
              <a
                href={ecosystem.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm opacity-75 hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Website
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements - Only show if no background image */}
      {!hasBackgroundImage && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 z-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.3C64.8,55.4,53.8,67,40.9,73.8C28,80.6,14,82.6,-0.5,83.5C-15,84.4,-30,84.2,-43.3,78.2C-56.6,72.2,-68.2,60.4,-75.8,46.2C-83.4,32,-87,15.4,-86.8,-1.4C-86.6,-18.2,-82.6,-36.4,-74.3,-50.2C-66,-64,-53.4,-73.4,-39.7,-80.8C-26,-88.2,-13,-93.6,1.4,-96.1C15.8,-98.6,31.6,-98.2,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 z-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M41.3,-72.1C54.9,-66.5,68.1,-58.5,76.2,-46.8C84.3,-35.1,87.3,-19.6,87.5,-4.3C87.7,11,85.1,26.1,77.8,38.4C70.5,50.7,58.5,60.2,45.3,66.8C32.1,73.4,17.7,77.1,2.8,72.8C-12.1,68.5,-27.5,56.2,-40.8,49.5C-54.1,42.8,-65.3,41.7,-73.2,35.2C-81.1,28.7,-85.7,16.8,-86.8,4.3C-87.9,-8.2,-85.5,-21.3,-78.6,-32.8C-71.7,-44.3,-60.3,-54.2,-47.1,-60.1C-33.9,-66,-18.9,-68,-4.5,-61.2C9.9,-54.4,27.7,-77.7,41.3,-72.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

// Helper function to get RGB values from hex color
function hexToRgb(color: string): { r: number; g: number; b: number } | null {
  let hex = color.replace('#', '')

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (hex.length !== 6) return null

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  }
}

// Helper function to determine if a color is light or dark
function isColorLight(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) return false

  // Calculate relative luminance (WCAG formula)
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

  return luminance > 0.5 // Threshold for light vs dark
}

// Helper function to calculate contrast ratio between two colors
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const l1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 255
  const l2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 255

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

// Smart function to determine the best text color for readability
function getContrastingTextColor(
  backgroundColor: string,
  providedTextColor: string | null,
  hasBackgroundImage: boolean
): string {
  const WHITE = '#ffffff'
  const DARK = '#1f2937'

  // If there's a background image, prefer white with overlay
  if (hasBackgroundImage) {
    return providedTextColor || WHITE
  }

  // If a text color is provided, check if it has good contrast
  if (providedTextColor) {
    const contrast = getContrastRatio(backgroundColor, providedTextColor)

    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
    // If contrast is poor, override with better color
    if (contrast < 3) {
      return isColorLight(backgroundColor) ? DARK : WHITE
    }

    return providedTextColor
  }

  // No text color provided - choose based on background
  return isColorLight(backgroundColor) ? DARK : WHITE
}
