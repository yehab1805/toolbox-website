import { Metadata } from 'next'
import WordToPDF from '@/components/tools/file/word-to-pdf'

export const metadata: Metadata = {
  title: 'Word to PDF - Convert DOC/DOCX to PDF Online | PDF Toolbox',
  description: 'Convert Word documents (DOC, DOCX) to PDF format online. Free Word to PDF converter with high-quality output and formatting preservation.',
  keywords: 'Word to PDF, DOC to PDF, DOCX to PDF, convert document, Word converter',
  openGraph: {
    title: 'Word to PDF - Convert DOC/DOCX to PDF Online',
    description: 'Convert Word documents (DOC, DOCX) to PDF format online. Free Word to PDF converter.',
    type: 'website',
  },
}

export default function WordToPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Word to PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your Word documents (DOC, DOCX) to PDF format while preserving formatting and layout.
          </p>
        </div>
        
        <WordToPDF />
      </div>
    </div>
  )
}