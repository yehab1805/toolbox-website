import { Metadata } from 'next'
import CropPDF from '@/components/tools/file/crop-pdf'

export const metadata: Metadata = {
  title: 'Crop PDF - Crop PDF Pages Online | PDF Toolbox',
  description: 'Crop PDF pages easily online. Remove unwanted areas, adjust margins, and customize page dimensions with our free PDF cropping tool.',
  keywords: 'crop PDF, PDF crop tool, remove PDF margins, PDF page cropping, crop PDF pages online',
  openGraph: {
    title: 'Crop PDF - Crop PDF Pages Online',
    description: 'Crop PDF pages easily online. Remove unwanted areas and adjust page dimensions.',
    type: 'website',
  },
}

export default function CropPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Crop PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Crop PDF pages easily online. Remove unwanted areas and adjust page dimensions.
          </p>
        </div>
        
        <CropPDF />
      </div>
    </div>
  )
}
