'use client'

import EcosystemSelector from '@/components/EcosystemSelector'
import Layout from '@/components/Layout'
import PageHeading from '@/components/PageHeading'
import Spinner from '@/components/Spinner'
import { PREVIEW_ECOSYSTEMS } from '@/constants/preview-ecosystems'
import { useEcosystemSession } from '@/utils/useEcosystemSession'
import { useEffect, useState } from 'react'

export default function EmbedPage() {
  const { ecosystemId: sessionEcosystemId, isPreviewMode } = useEcosystemSession()

  // If ecosystemId is provided in session, find the matching ecosystem
  const matchedEcosystem = sessionEcosystemId
    ? PREVIEW_ECOSYSTEMS.find((eco) => eco.ecosystemId === sessionEcosystemId)
    : null

  // Default to Apideck ecosystem (first in array) or matched ecosystem
  const defaultEcosystem = matchedEcosystem || PREVIEW_ECOSYSTEMS[0]
  const [ecosystemUrl, setEcosystemUrl] = useState(defaultEcosystem.url)
  const [isLoading, setIsLoading] = useState(true)

  // Update ecosystem URL when session ecosystem changes
  useEffect(() => {
    if (matchedEcosystem) {
      setEcosystemUrl(matchedEcosystem.url)
      setIsLoading(true)
    }
  }, [matchedEcosystem])

  function handleUrlChange(url: string) {
    setIsLoading(true)
    setEcosystemUrl(url)
  }

  function handleIframeLoad() {
    setIsLoading(false)
  }

  // Get the name of the current ecosystem if it matches a preview
  const currentEcosystem = PREVIEW_ECOSYSTEMS.find((eco) => eco.url === ecosystemUrl)

  return (
    <Layout>
      <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
        <PageHeading
          title="Embed Ecosystem"
          description={
            isPreviewMode
              ? `Previewing ecosystem${currentEcosystem ? ` of ${currentEcosystem.name}` : ''}`
              : 'See how Apideck Ecosystem can be embedded directly into your application using an iframe'
          }
        />

        {!isPreviewMode && (
          <div className="my-4">
            <EcosystemSelector value={ecosystemUrl} onChange={handleUrlChange} mode="url" />
          </div>
        )}

        {/* Iframe Content */}
        {ecosystemUrl ? (
          <div className="flex-1 relative overflow-hidden min-h-0 rounded-lg border border-gray-200 shadow-sm">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                <Spinner className="h-12 w-12 text-gray-900" />
                <p className="mt-4 text-sm text-gray-600">
                  Loading ecosystem{currentEcosystem ? ` of ${currentEcosystem.name}` : ''}...
                </p>
              </div>
            )}
            <iframe
              key={ecosystemUrl}
              src={`${ecosystemUrl}${ecosystemUrl.includes('?') ? '&' : '?'}embed=true`}
              className="w-full h-full border-0"
              title={currentEcosystem?.name || 'Ecosystem'}
              onLoad={handleIframeLoad}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 border-dashed">
            <div className="text-center p-8">
              <p className="text-sm text-gray-500">
                Enter an ecosystem URL above to preview it here
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
