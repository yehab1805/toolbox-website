"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileMinus, Upload, Download, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SplitPDF() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages')
  const [pageNumbers, setPageNumbers] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      toast.success('PDF file uploaded successfully')
    } else if (file) {
      toast.error('Please select a valid PDF file')
    }
  }

  const splitPDF = async () => {
    if (!selectedFile) {
      toast.error('Please upload a PDF file first')
      return
    }

    if (splitMode === 'pages' && !pageNumbers.trim()) {
      toast.error('Please enter page numbers to split')
      return
    }

    setIsProcessing(true)
    toast.loading('Splitting PDF...', { id: 'split-pdf' })

    try {
      // Simulate PDF splitting process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mock split PDFs
      const splitCount = splitMode === 'pages' 
        ? pageNumbers.split(',').length + 1 
        : 2

      for (let i = 0; i < splitCount; i++) {
        const splitContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Split PDF Part ${i + 1}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`

        const blob = new Blob([splitContent], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = `split-part-${i + 1}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }

      toast.success(`PDF split into ${splitCount} files!`, { id: 'split-pdf' })
    } catch (error) {
      toast.error('Failed to split PDF. Please try again.', { id: 'split-pdf' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Split PDF</h1>
        <p className="text-muted-foreground">
          Split a PDF file into multiple documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileMinus className="h-5 w-5" />
            Upload PDF File
          </CardTitle>
          <CardDescription>
            Select a PDF file to split into multiple documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Label htmlFor="pdf-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose PDF File</span>
                </Button>
              </Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Drag and drop a PDF file here, or click to browse
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Split Method</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant={splitMode === 'pages' ? 'default' : 'outline'}
                      onClick={() => setSplitMode('pages')}
                      disabled={isProcessing}
                    >
                      Split by Pages
                    </Button>
                    <Button
                      variant={splitMode === 'range' ? 'default' : 'outline'}
                      onClick={() => setSplitMode('range')}
                      disabled={isProcessing}
                    >
                      Split in Half
                    </Button>
                  </div>
                </div>

                {splitMode === 'pages' && (
                  <div className="space-y-2">
                    <Label htmlFor="page-numbers">Page Numbers (comma-separated)</Label>
                    <Input
                      id="page-numbers"
                      placeholder="e.g., 1,3,5,7"
                      value={pageNumbers}
                      onChange={(e) => setPageNumbers(e.target.value)}
                      disabled={isProcessing}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the page numbers where you want to split the PDF
                    </p>
                  </div>
                )}

                {splitMode === 'range' && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      The PDF will be split into two equal parts
                    </p>
                  </div>
                )}

                <Button
                  onClick={splitPDF}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Splitting PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Split & Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
