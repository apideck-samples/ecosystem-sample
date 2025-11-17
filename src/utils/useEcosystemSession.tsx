'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ECOSYSTEM_SESSION_KEY = 'apideck_ecosystem_preview_id'

export function useEcosystemSession() {
  const searchParams = useSearchParams()
  const ecosystemIdParam = searchParams.get('ecosystemId')
  const [ecosystemId, setEcosystemId] = useState<string | null>(null)

  // Initialize from URL or sessionStorage
  useEffect(() => {
    // Priority 1: URL parameter (fresh link)
    if (ecosystemIdParam) {
      sessionStorage.setItem(ECOSYSTEM_SESSION_KEY, ecosystemIdParam)
      setEcosystemId(ecosystemIdParam)
    } else {
      // Priority 2: Session storage (navigating between pages)
      const storedId = sessionStorage.getItem(ECOSYSTEM_SESSION_KEY)
      if (storedId) {
        setEcosystemId(storedId)
      }
    }
  }, [ecosystemIdParam])

  // Check if we're in preview mode
  const isPreviewMode = Boolean(ecosystemId)

  // Function to clear the session (exit preview mode)
  const clearSession = () => {
    sessionStorage.removeItem(ECOSYSTEM_SESSION_KEY)
    setEcosystemId(null)
  }

  return {
    ecosystemId,
    isPreviewMode,
    clearSession
  }
}

