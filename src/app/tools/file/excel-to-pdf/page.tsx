import { Metadata } from 'next'
import ExcelToPDF from '@/components/tools/file/excel-to-pdf'

export const metadata: Metadata = {
  title: 'Excel to PDF - Convert XLS/XLSX to PDF Online | PDF Toolbox',
  description: 'Convert Excel spreadsheets (XLS, XLSX) to PDF format online. Free Excel to PDF converter with table formatting preservation.',
  keywords: 'Excel to PDF, XLS to PDF, XLSX to PDF, convert spreadsheet, Excel converter',
  openGraph: {
    title: 'Excel to PDF - Convert XLS/XLSX to PDF Online',
    description: 'Convert Excel spreadsheets (XLS, XLSX) to PDF format online. Free Excel to PDF converter.',
    type: 'website',
  },
}

export default function ExcelToPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Excel to PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your Excel spreadsheets (XLS, XLSX) to PDF format while preserving table formatting.
          </p>
        </div>
        
        <ExcelToPDF />
      </div>
    </div>
  )
}
