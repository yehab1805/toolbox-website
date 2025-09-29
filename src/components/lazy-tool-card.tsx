"use client"

import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
// ArrowRight removed

// Lazy load heavy components
const LazyToolContent = lazy(() => import('./tool-card-content'))

interface LazyToolCardProps {
  tool: {
    id: string
    name: string
    description: string
    icon: string
    category: string
    path: string
    featured?: boolean
  }
  iconMap: Record<string, any>
}

export default function LazyToolCard({ tool, iconMap }: LazyToolCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Suspense fallback={<ToolCardSkeleton />}>
        <LazyToolContent tool={tool} iconMap={iconMap} />
      </Suspense>
    </Card>
  )
}

function ToolCardSkeleton() {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
    </CardHeader>
  )
}
