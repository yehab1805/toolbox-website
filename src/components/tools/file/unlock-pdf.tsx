"use client"

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Unlock, Upload, Download, Eye } from 'lucide-react'

export default function UnlockPDF() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [password, setPassword] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)
  const [error, setError] = useState('')

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setUploadedFileName(file.name)
    setError('')
    setConvertedFile(null)
  }, [])

  const handleUnlock = useCallback(async () => {
    if (!uploadedFileName || !password) {
      setError('Please provide both file and password')
      return
    }

    setIsProcessing(true)
    setError('')
    
    try {
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (!file) return

      const arrayBuffer = await file.arrayBuffer()
      
      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { password })
        
        // Create a new PDF without password protection
        const unlockedPdf = await PDFDocument.create()
        const pages = await unlockedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
        
        pages.forEach(page => unlockedPdf.addPage(page))
        
        const pdfBytes = await unlockedPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        setConvertedFile(blob)
        
      } catch (loadError) {
        setError('Incorrect password or unable to unlock PDF')
      }
    } catch (error) {
      console.error('Error unlocking PDF:', error)
      setError('Error processing PDF file')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadedFileName, password])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `unlocked-${uploadedFileName}`
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
            Upload Protected PDF
          </CardTitle>
          <CardDescription>
            Select a password-protected PDF file to unlock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pdf-upload">Choose Protected PDF File</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isProcessing}
                className="cursor-pointer"
              />
              {uploadedFileName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Unlock className="h-4 w-4" />
                  {uploadedFileName}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PDF password"
                disabled={isProcessing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <Eye className="h-4 w-4" />
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedFileName && (
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={handleUnlock} 
              disabled={isProcessing || !password}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Unlocking PDF...
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Unlock PDF
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
              <Unlock className="h-5 w-5" />
              PDF Unlocked Successfully
            </CardTitle>
            <CardDescription>
              Your PDF has been unlocked and is ready for download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">Unlocked</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Unlocked PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About PDF Unlocking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Removes password protection from PDF files</p>
            <p>• Unlocks user and owner permissions</p>
            <p>• All processing is done in your browser</p>
            <p>• Your files are never uploaded to our servers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
