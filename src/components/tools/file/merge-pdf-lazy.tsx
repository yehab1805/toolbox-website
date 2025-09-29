"use client"

import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load the heavy PDF processing component
const MergePDFContent = lazy(() => import('./merge-pdf'))

export default function MergePDFLazy() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Merge PDFs</h1>
        <p className="text-muted-foreground">
          Combine multiple PDF files into a single document
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF Files</CardTitle>
          <CardDescription>
            Select multiple PDF files to merge. Files will be merged in the order shown below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PDFToolSkeleton />}>
            <MergePDFContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function PDFToolSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
        <Skeleton className="h-12 w-12 mx-auto mb-4" />
        <Skeleton className="h-8 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
