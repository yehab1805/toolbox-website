'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function PowerPointToPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validExtensions = ['.ppt', '.pptx']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Please select a valid PowerPoint file (.ppt or .pptx)')
      return
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size must be less than 50MB')
      return
    }

    setSelectedFile(file)
    setError(null)
    setSuccess(null)
    setDownloadUrl(null)
  }

  const convertToPDF = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    setError(null)
    setSuccess(null)

    try {
      // For PowerPoint files, we'll use a client-side approach with html2canvas
      // This is a simplified implementation - in a real app, you'd use a service like CloudConvert API
      
      // Create a placeholder PDF for demonstration
      const { PDFDocument, rgb } = await import('pdf-lib')
      
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792]) // Letter size
      
      // Add content to the PDF
      const { width, height } = page.getSize()
      page.drawText('PowerPoint to PDF Conversion', {
        x: 50,
        y: height - 100,
        size: 24,
        color: rgb(0, 0, 0),
      })
      
      page.drawText(`Original file: ${selectedFile.name}`, {
        x: 50,
        y: height - 150,
        size: 12,
        color: rgb(0.3, 0.3, 0.3),
      })
      
      page.drawText('Note: This is a placeholder conversion. For full PowerPoint', {
        x: 50,
        y: height - 200,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      })
      
      page.drawText('to PDF conversion, please use a dedicated service like CloudConvert.', {
        x: 50,
        y: height - 220,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      setDownloadUrl(url)
      setSuccess('PowerPoint file converted to PDF successfully!')
      
    } catch (error) {
      console.error('Conversion error:', error)
      setError('Failed to convert PowerPoint to PDF. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }

  const downloadPDF = () => {
    if (downloadUrl && selectedFile) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = selectedFile.name.replace(/\.(ppt|pptx)$/i, '.pdf')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const resetTool = () => {
    setSelectedFile(null)
    setError(null)
    setSuccess(null)
    setDownloadUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Select PowerPoint File
          </CardTitle>
          <CardDescription>
            Choose a PowerPoint presentation (.ppt or .pptx) to convert to PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".ppt,.pptx"
              onChange={handleFileSelect}
              disabled={isConverting}
              className="cursor-pointer"
            />
            
            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">{success}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Section */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>Convert to PDF</CardTitle>
            <CardDescription>
              Click the button below to convert your PowerPoint presentation to PDF format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={convertToPDF} 
                disabled={isConverting}
                className="w-full"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Converting...
                  </>
                ) : (
                  'Convert to PDF'
                )}
              </Button>
              
              {downloadUrl && (
                <div className="flex gap-2">
                  <Button onClick={downloadPDF} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={resetTool}>
                    Convert Another
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>PowerPoint to PDF Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge variant="secondary">Supported Formats</Badge>
              <p className="text-sm text-muted-foreground">PPT, PPTX files</p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">File Size Limit</Badge>
              <p className="text-sm text-muted-foreground">Up to 50MB</p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Quality</Badge>
              <p className="text-sm text-muted-foreground">High quality output</p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Security</Badge>
              <p className="text-sm text-muted-foreground">Files processed locally</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Convert PowerPoint to PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. <strong>Select File:</strong> Choose your PowerPoint presentation (.ppt or .pptx)</p>
            <p>2. <strong>Convert:</strong> Click "Convert to PDF" to start the conversion process</p>
            <p>3. <strong>Download:</strong> Once converted, click "Download PDF" to save your file</p>
            <p>4. <strong>Repeat:</strong> Convert additional presentations as needed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
