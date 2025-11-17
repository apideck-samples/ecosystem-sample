'use client'

import Layout from '@/components/Layout'
import PageHeading from '@/components/PageHeading'
import { PREVIEW_ECOSYSTEMS } from '@/constants/preview-ecosystems'
import { useEcosystemSession } from '@/utils/useEcosystemSession'
import Link from 'next/link'
import { HiOutlineCode, HiOutlineViewGrid } from 'react-icons/hi'

export default function HomePage() {
  const { ecosystemId, isPreviewMode } = useEcosystemSession()

  // Find the ecosystem name if in preview mode
  const previewEcosystem = isPreviewMode
    ? PREVIEW_ECOSYSTEMS.find((eco) => eco.ecosystemId === ecosystemId)
    : null

  return (
    <Layout>
      <div className="space-y-6">
        {isPreviewMode && previewEcosystem && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <HiOutlineViewGrid className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Preview Mode Active</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    You&apos;re currently previewing the ecosystem for{' '}
                    <span className="font-semibold">{previewEcosystem.name}</span>. All pages will
                    display this ecosystem&apos;s content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <PageHeading
          title="Apideck Ecosystem Starter Kit"
          description="Choose how you want to integrate Apideck Ecosystem into your application"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Embed Card */}
          <Link
            href="/embed"
            className="group relative bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all duration-200 p-8 flex flex-col"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4">
              <HiOutlineViewGrid className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Embed Ecosystem
            </h3>
            <p className="text-sm text-gray-600 mb-4 flex-1">
              The fastest way to get started. Embed a fully-featured integration marketplace
              directly into your application using an iframe. No backend required.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Quick implementation with iframe embed</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Fully branded marketplace experience</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>No backend development needed</span>
              </li>
            </ul>
            <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
              View examples →
            </div>
          </Link>

          {/* Custom Integration Card */}
          <Link
            href="/custom"
            className="group relative bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg hover:border-purple-400 transition-all duration-200 p-8 flex flex-col"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-4">
              <HiOutlineCode className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              Custom Integration
            </h3>
            <p className="text-sm text-gray-600 mb-4 flex-1">
              Build your own custom integration marketplace using the Ecosystem API. Full control
              over the UI and user experience with programmatic access.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Complete control over UI/UX</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Programmatic access via REST API</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Build custom workflows and logic</span>
              </li>
            </ul>
            <div className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
              View example →
            </div>
          </Link>
        </div>

        {/* Getting Started Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              To use this starter kit, you&apos;ll need an{' '}
              <a
                href="https://www.apideck.com/ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Apideck Ecosystem
              </a>{' '}
              account. Create your integration marketplace and get your ecosystem ID from the{' '}
              <a
                href="https://platform.apideck.com/ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                dashboard
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
