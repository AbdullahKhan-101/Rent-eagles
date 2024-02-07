// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'

export function ProvidersNextUI({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}