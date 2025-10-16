"use client"

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Crop, Upload, Download } from 'lucide-react'

export default function CropPDF() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)
  const [cropSettings, setCropSettings] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setUploadedFileName(file.name)
    setConvertedFile(null)
  }, [])

  const handleCropPDF = useCallback(async () => {
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
      
      // Create a new PDF with cropped pages
      const croppedPdf = await PDFDocument.create()
      
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const [page] = await croppedPdf.copyPages(pdfDoc, [i])
        const { width, height } = page.getSize()
        
        // Apply crop settings (simplified implementation)
        const newWidth = width - cropSettings.left - cropSettings.right
        const newHeight = height - cropSettings.top - cropSettings.bottom
        
        // Set new page dimensions
        page.setSize(newWidth, newHeight)
        croppedPdf.addPage(page)
      }

      const pdfBytes = await croppedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      setConvertedFile(blob)
      
    } catch (error) {
      console.error('Error cropping PDF:', error)
      alert('Error cropping PDF file')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedFileName, cropSettings])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `cropped-${uploadedFileName}`
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
            Select a PDF document to crop
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
                <Crop className="h-4 w-4" />
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
              <Crop className="h-5 w-5" />
              Crop Settings
            </CardTitle>
            <CardDescription>
              Adjust the crop margins for your PDF pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="top-margin">Top Margin (px)</Label>
                <Slider
                  id="top-margin"
                  min={0}
                  max={100}
                  step={1}
                  value={[cropSettings.top]}
                  onValueChange={(value) => setCropSettings(prev => ({ ...prev, top: value[0] }))}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">{cropSettings.top}px</div>
              </div>

              <div>
                <Label htmlFor="bottom-margin">Bottom Margin (px)</Label>
                <Slider
                  id="bottom-margin"
                  min={0}
                  max={100}
                  step={1}
                  value={[cropSettings.bottom]}
                  onValueChange={(value) => setCropSettings(prev => ({ ...prev, bottom: value[0] }))}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">{cropSettings.bottom}px</div>
              </div>

              <div>
                <Label htmlFor="left-margin">Left Margin (px)</Label>
                <Slider
                  id="left-margin"
                  min={0}
                  max={100}
                  step={1}
                  value={[cropSettings.left]}
                  onValueChange={(value) => setCropSettings(prev => ({ ...prev, left: value[0] }))}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">{cropSettings.left}px</div>
              </div>

              <div>
                <Label htmlFor="right-margin">Right Margin (px)</Label>
                <Slider
                  id="right-margin"
                  min={0}
                  max={100}
                  step={1}
                  value={[cropSettings.right]}
                  onValueChange={(value) => setCropSettings(prev => ({ ...prev, right: value[0] }))}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">{cropSettings.right}px</div>
              </div>

              <Button onClick={handleCropPDF} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Cropping PDF...
                  </>
                ) : (
                  <>
                    <Crop className="h-4 w-4 mr-2" />
                    Crop PDF
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
              <Crop className="h-5 w-5" />
              PDF Cropped Successfully
            </CardTitle>
            <CardDescription>
              Your PDF has been cropped and is ready for download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">Cropped</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Cropped PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
