import { Metadata } from 'next'
import UnlockPDF from '@/components/tools/file/unlock-pdf'

export const metadata: Metadata = {
  title: 'Unlock PDF - Remove Password Protection Online | PDF Toolbox',
  description: 'Remove password protection from PDF files online. Free PDF unlocker tool to remove restrictions and passwords from PDF documents.',
  keywords: 'unlock PDF, remove PDF password, PDF unlocker, PDF restrictions, PDF protection',
  openGraph: {
    title: 'Unlock PDF - Remove Password Protection Online',
    description: 'Remove password protection from PDF files online. Free PDF unlocker tool.',
    type: 'website',
  },
}

export default function UnlockPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Remove password protection and restrictions from your PDF documents.
          </p>
        </div>
        
        <UnlockPDF />
      </div>
    </div>
  )
}
