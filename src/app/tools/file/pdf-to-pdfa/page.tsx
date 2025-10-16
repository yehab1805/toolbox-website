import { Metadata } from 'next'
import PDFToPDFA from '@/components/tools/file/pdf-to-pdfa'

export const metadata: Metadata = {
  title: 'PDF to PDF/A - Convert PDF to PDF/A Online | PDF Toolbox',
  description: 'Convert PDF documents to PDF/A format for long-term archiving. Free PDF to PDF/A converter with archival compliance.',
  keywords: 'PDF to PDF/A, PDF/A converter, archival PDF, PDF compliance, PDF archiving',
  openGraph: {
    title: 'PDF to PDF/A - Convert PDF to PDF/A Online',
    description: 'Convert PDF documents to PDF/A format for long-term archiving.',
    type: 'website',
  },
}

export default function PDFToPDFAPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDF to PDF/A
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your PDF documents to PDF/A format for long-term archiving and compliance.
          </p>
        </div>
        
        <PDFToPDFA />
      </div>
    </div>
  )
}
