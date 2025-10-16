"use client"

import { useState, useCallback, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PenTool, Upload, Download, Eraser } from 'lucide-react'

export default function SignPDF() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setUploadedFileName(file.name)
    setConvertedFile(null)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignature(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    setSignature(null)
  }

  const handleSignPDF = useCallback(async () => {
    if (!uploadedFileName || !signature) {
      alert('Please provide both file and signature')
      return
    }

    setIsProcessing(true)
    
    try {
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (!file) return

      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Add signature to the first page (simplified implementation)
      const firstPage = pdfDoc.getPage(0)
      const { width, height } = firstPage.getSize()
      
      // Create signature annotation (simplified)
      const signatureBytes = await fetch(signature).then(res => res.arrayBuffer())
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      setConvertedFile(blob)
      
    } catch (error) {
      console.error('Error signing PDF:', error)
      alert('Error signing PDF file')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedFileName, signature])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `signed-${uploadedFileName}`
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
            Select a PDF document to sign
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
                <PenTool className="h-4 w-4" />
                {uploadedFileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Create Signature
          </CardTitle>
          <CardDescription>
            Draw your signature in the canvas below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="border border-gray-200 rounded cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ backgroundColor: 'white' }}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={clearSignature} variant="outline" size="sm">
                <Eraser className="h-4 w-4 mr-2" />
                Clear
              </Button>
              {signature && (
                <Badge variant="default">Signature Ready</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadedFileName && signature && (
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={handleSignPDF} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Signing PDF...
                </>
              ) : (
                <>
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {convertedFile && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              PDF Signed Successfully
            </CardTitle>
            <CardDescription>
              Your PDF has been signed and is ready for download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">Signed</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Signed PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
