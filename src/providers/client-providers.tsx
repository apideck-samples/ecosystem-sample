'use client'

import { ToastProvider } from '@apideck/components'
import { ReactNode } from 'react'
import { DialogProvider } from './dialog-provider'
import { QueryProvider } from './query-provider'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>
        <DialogProvider>{children}</DialogProvider>
      </ToastProvider>
    </QueryProvider>
  )
}
