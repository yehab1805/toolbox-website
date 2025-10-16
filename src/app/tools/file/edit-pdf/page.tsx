import { Metadata } from 'next'
import EditPDF from '@/components/tools/file/edit-pdf'

export const metadata: Metadata = {
  title: 'Edit PDF - Edit Text and Images Online | PDF Toolbox',
  description: 'Edit text and images in your PDF documents online. Add text, modify content, and update PDF files with our free PDF editor tool.',
  keywords: 'edit PDF, PDF editor, modify PDF, edit PDF text, edit PDF images, PDF editing tool',
  openGraph: {
    title: 'Edit PDF - Edit Text and Images Online',
    description: 'Edit text and images in your PDF documents online. Add text and modify content.',
    type: 'website',
  },
}

export default function EditPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Edit PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Edit text and images in your PDF documents online. Add text and modify content easily.
          </p>
        </div>
        
        <EditPDF />
      </div>
    </div>
  )
}
