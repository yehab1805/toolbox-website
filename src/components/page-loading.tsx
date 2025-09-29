"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LoadingSpinner from '@/components/ui/loading-spinner'

export default function PageLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show loading when pathname changes
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background border rounded-lg p-6 shadow-lg flex items-center space-x-3">
        <LoadingSpinner size="lg" />
        <div className="text-sm font-medium">Loading tool...</div>
      </div>
    </div>
  )
}
