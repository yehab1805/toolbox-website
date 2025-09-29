"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export default function NavigationFeedback() {
  const pathname = usePathname()

  useEffect(() => {
    // Show feedback when navigating to tool pages
    if (pathname.includes('/tools/')) {
      const toolName = pathname.split('/').pop()?.replace(/-/g, ' ')
      if (toolName) {
        toast.success(`Opening ${toolName}...`, {
          duration: 2000,
          icon: '🚀',
        })
      }
    }
  }, [pathname])

  return null
}
