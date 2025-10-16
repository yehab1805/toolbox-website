import { Metadata } from 'next'
import WordToPDFTool from '@/components/tools/file/word-to-pdf'

export const metadata: Metadata = {
  title: 'Word to PDF Converter - Convert DOC/DOCX to PDF Online | Toolbox',
  description: 'Convert Word documents to PDF format online. Free DOC to PDF converter with high quality output. No registration required.',
  keywords: 'Word to PDF, DOC to PDF, DOCX to PDF, convert document, Word converter',
  openGraph: {
    title: 'Word to PDF Converter - Convert DOC/DOCX to PDF Online',
    description: 'Convert Word documents to PDF format online. Free DOC to PDF converter with high quality output.',
  },
}

export default function WordToPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Word to PDF Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert your Word documents (DOC/DOCX) to PDF format quickly and easily
          </p>
        </div>
        <WordToPDFTool />
      </div>
    </div>
  )
}
