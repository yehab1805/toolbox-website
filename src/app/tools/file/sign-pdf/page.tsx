import { Metadata } from 'next'
import SignPDF from '@/components/tools/file/sign-pdf'

export const metadata: Metadata = {
  title: 'Sign PDF - Add Digital Signature Online | PDF Toolbox',
  description: 'Add digital signatures to PDF documents online. Free PDF signer tool with canvas signature pad and signature placement.',
  keywords: 'sign PDF, digital signature, PDF signer, electronic signature, PDF signing',
  openGraph: {
    title: 'Sign PDF - Add Digital Signature Online',
    description: 'Add digital signatures to PDF documents online. Free PDF signer tool.',
    type: 'website',
  },
}

export default function SignPDFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sign PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Add digital signatures to your PDF documents with our canvas signature pad.
          </p>
        </div>
        
        <SignPDF />
      </div>
    </div>
  )
}
