import { Metadata } from 'next'
import ComparePDF from '@/components/tools/file/compare-pdf'

export const metadata: Metadata = {
  title: 'Compare PDF - Compare Two PDF Documents Online | PDF Toolbox',
  description: 'Compare two PDF documents and find differences online. Free PDF comparison tool with visual diff highlighting and detailed reports.',
  keywords: 'compare PDF, PDF diff, PDF comparison, find differences, PDF compare',
  openGraph: {
    title: 'Compare PDF - Compare Two PDF Documents Online',
    description: 'Compare two PDF documents and find differences online. Free PDF comparison tool.',
    type: 'website',
  },
}

export default function ComparePDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Compare PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare two PDF documents and find differences with visual highlighting and detailed reports.
          </p>
        </div>
        
        <ComparePDF />
      </div>
    </div>
  )
}
