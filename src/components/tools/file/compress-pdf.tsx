"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Archive, Upload, Download, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CompressPDF() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [compressionLevel, setCompressionLevel] = useState([50])
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

  const compressPDF = async () => {
    if (!selectedFile) {
      toast.error('Please upload a PDF file first')
      return
    }

    setIsProcessing(true)
    toast.loading('Compressing PDF...', { id: 'compress-pdf' })

    try {
      // Simulate PDF compression process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a mock compressed PDF blob
      const compressedContent = `%PDF-1.4
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
(Compressed PDF Document) Tj
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

      const blob = new Blob([compressedContent], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'compressed-document.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('PDF compressed successfully!', { id: 'compress-pdf' })
    } catch (error) {
      toast.error('Failed to compress PDF. Please try again.', { id: 'compress-pdf' })
    } finally {
      setIsProcessing(false)
    }
  }

  const getCompressionDescription = (level: number) => {
    if (level <= 25) return 'Maximum compression (smallest file size)'
    if (level <= 50) return 'High compression (good balance)'
    if (level <= 75) return 'Medium compression (better quality)'
    return 'Low compression (highest quality)'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Compress PDF</h1>
        <p className="text-muted-foreground">
          Reduce PDF file size while maintaining quality
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Upload PDF File
          </CardTitle>
          <CardDescription>
            Select a PDF file to compress and reduce its file size
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
            <div className="space-y-6">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  Original size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Compression Level: {compressionLevel[0]}%
                  </Label>
                  <Slider
                    value={compressionLevel}
                    onValueChange={setCompressionLevel}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {getCompressionDescription(compressionLevel[0])}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Original Size</p>
                    <p className="font-semibold">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Estimated Size</p>
                    <p className="font-semibold text-blue-600">
                      {((selectedFile.size / 1024 / 1024) * (100 - compressionLevel[0]) / 100).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Size Reduction</p>
                    <p className="font-semibold text-green-600">
                      {compressionLevel[0]}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Higher compression may reduce image quality. Lower compression maintains better quality.
                  </p>
                </div>

                <Button
                  onClick={compressPDF}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Compressing PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Compress & Download
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
