'use client'

import EcosystemHero from '@/components/EcosystemHero'
import EcosystemSelector from '@/components/EcosystemSelector'
import Layout from '@/components/Layout'
import PageHeading from '@/components/PageHeading'
import Spinner from '@/components/Spinner'
import Listings from '@/components/listings/Listings'
import { capitalizeFirst, getListingName } from '@/utils/ecosystem-utils'
import { useEcosystem } from '@/utils/useEcosystem'
import { useState } from 'react'
import { HiExclamation, HiExternalLink } from 'react-icons/hi'

export default function CustomIntegrationPage() {
  const [ecosystemId, setEcosystemId] = useState('')
  const { data: ecosystem, isLoading, error } = useEcosystem(ecosystemId || null)

  return (
    <Layout>
      <PageHeading
        title="Custom Integration"
        description="Build your own custom integration marketplace using the Ecosystem API"
        action={
          <a
            href="https://raw.githubusercontent.com/apideck-libraries/openapi-specs/main/ecosystem.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <HiExternalLink className="mr-2 h-4 w-4" />
            API Spec
          </a>
        }
      />

      <div className="my-4">
        <EcosystemSelector value={ecosystemId} onChange={setEcosystemId} mode="id" />
      </div>

      {ecosystemId ? (
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="text-center bg-white py-10 px-6 rounded-lg shadow border border-gray-200">
              <HiExclamation className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-2 text-sm font-medium text-red-800">
                {error instanceof Error ? error.message : 'Failed to load ecosystem'}
              </h3>
              <p className="mt-4 text-sm text-gray-500">
                Make sure you&apos;re using a valid ecosystem ID (UUID format). You can find your
                ecosystem ID in your Apideck Ecosystem dashboard.
              </p>
            </div>
          )}

          {ecosystem && !isLoading && !error && (
            <>
              <EcosystemHero ecosystem={ecosystem} />
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available {capitalizeFirst(getListingName(ecosystem)?.label || 'integrations')}
                </h2>
                <Listings ecosystemId={ecosystemId} />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center bg-gray-50 py-10 px-6 rounded-lg border border-gray-200 border-dashed">
          <p className="text-sm text-gray-500">
            Enter an ecosystem ID above to view its integration listings
          </p>
        </div>
      )}
    </Layout>
  )
}
