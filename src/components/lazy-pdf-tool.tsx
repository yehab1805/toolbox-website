"use client";

import { Suspense, lazy } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyPDFToolProps {
  toolComponent: React.ComponentType<any>;
  fallback?: React.ReactNode;
}

function DefaultFallback() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LazyPDFTool({ toolComponent: ToolComponent, fallback }: LazyPDFToolProps) {
  const LazyTool = lazy(() => Promise.resolve({ default: ToolComponent }));

  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyTool />
    </Suspense>
  );
}
