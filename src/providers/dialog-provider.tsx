'use client'

import { Dialog, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { DialogProps } from '@/components/ui/dialog'
import React, { createContext, useCallback, useContext, useState } from 'react'

type DialogOptions = Partial<DialogProps> & {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  title?: React.ReactNode
  description?: React.ReactNode
  disableBackdropClick?: boolean
}

type DialogContextType = {
  showDialog: (content: React.ReactNode, options?: DialogOptions) => void
  hideDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null)
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({})

  const showDialog = useCallback((content: React.ReactNode, options: DialogOptions = {}) => {
    setDialogContent(content)
    setDialogOptions(options)
    setIsOpen(true)
  }, [])

  const hideDialog = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setDialogContent(null)
      setDialogOptions({})
    }, 300)
  }, [])

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <Dialog
        open={isOpen}
        onClose={hideDialog}
        disableBackdropClick={dialogOptions.disableBackdropClick}
        size={dialogOptions.size}
        className={dialogOptions.className}
      >
        {dialogOptions.title && (
          <DialogTitle className="sm:text-center">{dialogOptions.title}</DialogTitle>
        )}
        {dialogOptions.description && (
          <DialogDescription className="sm:text-center">
            {dialogOptions.description}
          </DialogDescription>
        )}
        <DialogBody
          style={
            !dialogOptions.title && !dialogOptions.description
              ? {
                  marginTop: 0
                }
              : {}
          }
        >
          {dialogContent}
        </DialogBody>
      </Dialog>
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}

