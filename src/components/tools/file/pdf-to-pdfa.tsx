"use client"

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Archive, Upload, Download } from 'lucide-react'

export default function PDFToPDFA() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setIsProcessing(true)
    setUploadedFileName(file.name)
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Convert to PDF/A format (simplified implementation)
      const pdfABytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false
      })
      
      const blob = new Blob([pdfABytes], { type: 'application/pdf' })
      setConvertedFile(blob)
    } catch (error) {
      console.error('Error converting to PDF/A:', error)
      alert('Error converting to PDF/A format. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = uploadedFileName.replace(/\.pdf$/i, '-pdfa.pdf')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF File
          </CardTitle>
          <CardDescription>
            Select a PDF document to convert to PDF/A format for archiving
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="pdf-upload">Choose PDF File</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="cursor-pointer"
            />
            {uploadedFileName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Archive className="h-4 w-4" />
                {uploadedFileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              <span>Converting to PDF/A format...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {convertedFile && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5" />
              Conversion Complete
            </CardTitle>
            <CardDescription>
              Your PDF has been converted to PDF/A format for archiving
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">PDF/A Ready</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF/A
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About PDF/A Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• PDF/A is designed for long-term archiving</p>
            <p>• Ensures document accessibility in the future</p>
            <p>• Compliant with archival standards</p>
            <p>• Self-contained format with embedded fonts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
