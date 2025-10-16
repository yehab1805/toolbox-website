import { Metadata } from 'next'
import HTMLToPDF from '@/components/tools/file/html-to-pdf'

export const metadata: Metadata = {
  title: 'HTML to PDF - Convert HTML to PDF Online | PDF Toolbox',
  description: 'Convert HTML files or web pages to PDF format online. Free HTML to PDF converter with CSS styling preservation and responsive layout.',
  keywords: 'HTML to PDF, web page to PDF, convert HTML, HTML converter, web to PDF',
  openGraph: {
    title: 'HTML to PDF - Convert HTML to PDF Online',
    description: 'Convert HTML files or web pages to PDF format online. Free HTML to PDF converter.',
    type: 'website',
  },
}

export default function HTMLToPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            HTML to PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert HTML files or web pages to PDF format while preserving CSS styling and layout.
          </p>
        </div>
        
        <HTMLToPDF />
      </div>
    </div>
  )
}
