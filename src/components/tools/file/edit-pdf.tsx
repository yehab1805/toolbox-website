"use client"

import { useState, useCallback } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Upload, Download, Type } from 'lucide-react'

export default function EditPDF() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)
  const [textToAdd, setTextToAdd] = useState('')
  const [selectedPage, setSelectedPage] = useState(1)

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setUploadedFileName(file.name)
    setConvertedFile(null)
  }, [])

  const handleEditPDF = useCallback(async () => {
    if (!uploadedFileName) {
      alert('Please upload a PDF file first')
      return
    }

    setIsProcessing(true)
    
    try {
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (!file) return

      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Add text to the selected page (simplified implementation)
      if (textToAdd.trim() && selectedPage <= pdfDoc.getPageCount()) {
        const page = pdfDoc.getPage(selectedPage - 1)
        const { width, height } = page.getSize()
        
        // Add text at the bottom of the page
        page.drawText(textToAdd, {
          x: 50,
          y: height - 50,
          size: 12,
          color: rgb(0, 0, 0),
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      setConvertedFile(blob)
      
    } catch (error) {
      console.error('Error editing PDF:', error)
      alert('Error editing PDF file')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedFileName, textToAdd, selectedPage])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `edited-${uploadedFileName}`
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
            Select a PDF document to edit
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
                <Edit className="h-4 w-4" />
                {uploadedFileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedFileName && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Edit Settings
            </CardTitle>
            <CardDescription>
              Add text or modify content in your PDF
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="page-number">Page Number</Label>
                <Input
                  id="page-number"
                  type="number"
                  min={1}
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(parseInt(e.target.value) || 1)}
                  placeholder="Enter page number"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <Label htmlFor="text-input">Text to Add</Label>
                <Textarea
                  id="text-input"
                  value={textToAdd}
                  onChange={(e) => setTextToAdd(e.target.value)}
                  placeholder="Enter text to add to the PDF..."
                  rows={4}
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Text will be added to the bottom of the selected page</p>
                <p>• You can add multiple lines of text</p>
                <p>• Changes are applied to the original PDF</p>
              </div>

              <Button onClick={handleEditPDF} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Editing PDF...
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit PDF
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {convertedFile && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              PDF Edited Successfully
            </CardTitle>
            <CardDescription>
              Your PDF has been edited and is ready for download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">Edited</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Edited PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
