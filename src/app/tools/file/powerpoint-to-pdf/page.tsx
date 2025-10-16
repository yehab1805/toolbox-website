import { Metadata } from 'next'
import PowerPointToPDF from '@/components/tools/file/powerpoint-to-pdf'

export const metadata: Metadata = {
  title: 'PowerPoint to PDF - Convert PPT/PPTX to PDF Online | PDF Toolbox',
  description: 'Convert PowerPoint presentations (PPT, PPTX) to PDF format online. Free PowerPoint to PDF converter with high-quality output and batch processing support.',
  keywords: 'PowerPoint to PDF, PPT to PDF, PPTX to PDF, convert presentation, PowerPoint converter',
  openGraph: {
    title: 'PowerPoint to PDF - Convert PPT/PPTX to PDF Online',
    description: 'Convert PowerPoint presentations (PPT, PPTX) to PDF format online. Free PowerPoint to PDF converter.',
    type: 'website',
  },
}

export default function PowerPointToPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PowerPoint to PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your PowerPoint presentations (PPT, PPTX) to PDF format with high-quality output.
          </p>
        </div>
        
        <PowerPointToPDF />
      </div>
    </div>
  )
}