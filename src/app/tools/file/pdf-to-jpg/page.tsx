"use client";

import dynamic from 'next/dynamic';

const PDFToJPG = dynamic(() => import('@/components/tools/file/pdf-to-jpg'), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>
      <div className="h-96 bg-gray-200 rounded animate-pulse" />
    </div>
  ),
});

export default function PDFToJPGPage() {
  return <PDFToJPG />;
}
