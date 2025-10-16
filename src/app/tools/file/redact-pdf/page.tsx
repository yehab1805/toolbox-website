import { Metadata } from 'next'
import RedactPDF from '@/components/tools/file/redact-pdf'

export const metadata: Metadata = {
  title: 'Redact PDF - Black Out Text and Images Online | PDF Toolbox',
  description: 'Redact sensitive information from PDF documents online. Free PDF redaction tool to permanently black out text and images.',
  keywords: 'redact PDF, black out PDF, PDF redaction, remove sensitive information, PDF security',
  openGraph: {
    title: 'Redact PDF - Black Out Text and Images Online',
    description: 'Redact sensitive information from PDF documents online. Free PDF redaction tool.',
    type: 'website',
  },
}

export default function RedactPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Redact PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Permanently black out sensitive text and images in your PDF documents.
          </p>
        </div>
        
        <RedactPDF />
      </div>
    </div>
  )
}
