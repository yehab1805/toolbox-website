import { Metadata } from 'next'
import OrganizePDF from '@/components/tools/file/organize-pdf'

export const metadata: Metadata = {
  title: 'Organize PDF - Sort and Arrange PDF Pages | PDF Toolbox',
  description: 'Organize PDF pages by drag-and-drop reordering. Sort, arrange, and delete specific pages from your PDF documents with our free online PDF organizer tool.',
  keywords: 'organize PDF, sort PDF pages, arrange PDF, PDF organizer, reorder PDF pages',
  openGraph: {
    title: 'Organize PDF - Sort and Arrange PDF Pages',
    description: 'Organize PDF pages by drag-and-drop reordering. Sort, arrange, and delete specific pages from your PDF documents.',
    type: 'website',
  },
}

export default function OrganizePDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Organize PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Sort, arrange, and delete specific pages from your PDF documents with drag-and-drop functionality.
          </p>
        </div>
        
        <OrganizePDF />
      </div>
    </div>
  )
}