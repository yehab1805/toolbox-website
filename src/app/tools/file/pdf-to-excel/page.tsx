import { Metadata } from 'next'
import PDFToExcel from '@/components/tools/file/pdf-to-excel'

export const metadata: Metadata = {
  title: 'PDF to Excel - Convert PDF to XLS/XLSX Online | PDF Toolbox',
  description: 'Convert PDF documents to Excel spreadsheets (XLS, XLSX) online. Free PDF to Excel converter with table extraction.',
  keywords: 'PDF to Excel, PDF to XLS, PDF to XLSX, convert PDF, PDF converter',
  openGraph: {
    title: 'PDF to Excel - Convert PDF to XLS/XLSX Online',
    description: 'Convert PDF documents to Excel spreadsheets (XLS, XLSX) online.',
    type: 'website',
  },
}

export default function PDFToExcelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDF to Excel
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your PDF documents to Excel spreadsheets (XLS, XLSX) with table extraction.
          </p>
        </div>
        
        <PDFToExcel />
      </div>
    </div>
  )
}
