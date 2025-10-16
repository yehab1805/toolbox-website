import { Metadata } from 'next'
import PDFToWord from '@/components/tools/file/pdf-to-word'

export const metadata: Metadata = {
  title: 'PDF to Word - Convert PDF to DOC/DOCX Online | PDF Toolbox',
  description: 'Convert PDF documents to Word format (DOC, DOCX) online. Free PDF to Word converter with text extraction and formatting preservation.',
  keywords: 'PDF to Word, PDF to DOC, PDF to DOCX, convert PDF, PDF converter',
  openGraph: {
    title: 'PDF to Word - Convert PDF to DOC/DOCX Online',
    description: 'Convert PDF documents to Word format (DOC, DOCX) online. Free PDF to Word converter.',
    type: 'website',
  },
}

export default function PDFToWordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDF to Word
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your PDF documents to Word format (DOC, DOCX) while preserving text and formatting.
          </p>
        </div>
        
        <PDFToWord />
      </div>
    </div>
  )
}
