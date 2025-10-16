import { Metadata } from 'next'
import PDFToPowerPoint from '@/components/tools/file/pdf-to-powerpoint'

export const metadata: Metadata = {
  title: 'PDF to PowerPoint - Convert PDF to PPT/PPTX Online | PDF Toolbox',
  description: 'Convert PDF documents to PowerPoint presentations (PPT, PPTX) online. Free PDF to PowerPoint converter with slide extraction.',
  keywords: 'PDF to PowerPoint, PDF to PPT, PDF to PPTX, convert PDF, PDF converter',
  openGraph: {
    title: 'PDF to PowerPoint - Convert PDF to PPT/PPTX Online',
    description: 'Convert PDF documents to PowerPoint presentations (PPT, PPTX) online.',
    type: 'website',
  },
}

export default function PDFToPowerPointPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            PDF to PowerPoint
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your PDF documents to PowerPoint presentations (PPT, PPTX) with slide extraction.
          </p>
        </div>
        
        <PDFToPowerPoint />
      </div>
    </div>
  )
}
