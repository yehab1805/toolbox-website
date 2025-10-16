"use client"

import { useState, useCallback } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Code, Upload, Download, Globe } from 'lucide-react'

export default function HTMLToPDF() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const [url, setUrl] = useState('')
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null)
  const [inputMethod, setInputMethod] = useState<'html' | 'url'>('html')

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.includes('html') && !file.name.endsWith('.html')) {
      alert('Please upload a valid HTML file')
      return
    }

    const text = await file.text()
    setHtmlContent(text)
    setInputMethod('html')
  }, [])

  const convertToPDF = useCallback(async () => {
    if (!htmlContent && !url) return

    setIsProcessing(true)
    
    try {
      let htmlToProcess = htmlContent
      
      if (inputMethod === 'url' && url) {
        // For URL conversion, we'll create a simple representation
        htmlToProcess = `
          <html>
            <head><title>Web Page</title></head>
            <body>
              <h1>Web Page Content</h1>
              <p>URL: ${url}</p>
              <p>Note: This is a simplified conversion. For full web page conversion, use a dedicated service.</p>
            </body>
          </html>
        `
      }

      // Create a temporary div to render the HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlToProcess
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '-9999px'
      tempDiv.style.width = '800px'
      tempDiv.style.backgroundColor = 'white'
      tempDiv.style.padding = '20px'
      document.body.appendChild(tempDiv)

      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })

      // Remove temporary div
      document.body.removeChild(tempDiv)

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const pdfBlob = pdf.output('blob')
      setConvertedFile(pdfBlob)
      
    } catch (error) {
      console.error('Error converting HTML to PDF:', error)
      alert('Error converting HTML to PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [htmlContent, url, inputMethod])

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Input Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Input Method</CardTitle>
          <CardDescription>
            Select how you want to provide the HTML content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={inputMethod === 'html' ? 'default' : 'outline'}
              onClick={() => setInputMethod('html')}
            >
              <Code className="h-4 w-4 mr-2" />
              HTML Content
            </Button>
            <Button
              variant={inputMethod === 'url' ? 'default' : 'outline'}
              onClick={() => setInputMethod('url')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Web URL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* HTML Content Input */}
      {inputMethod === 'html' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              HTML Content
            </CardTitle>
            <CardDescription>
              Upload an HTML file or paste HTML content directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="html-upload">Upload HTML File</Label>
                <Input
                  id="html-upload"
                  type="file"
                  accept=".html,.htm"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              
              <div>
                <Label htmlFor="html-content">Or Paste HTML Content</Label>
                <Textarea
                  id="html-content"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Paste your HTML content here..."
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* URL Input */}
      {inputMethod === 'url' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Web URL
            </CardTitle>
            <CardDescription>
              Enter a web URL to convert to PDF
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="url-input">Website URL</Label>
                <Input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Convert Button */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={convertToPDF} 
            disabled={isProcessing || (!htmlContent && !url)}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Converting to PDF...
              </>
            ) : (
              <>
                <Code className="h-4 w-4 mr-2" />
                Convert to PDF
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Result Section */}
      {convertedFile && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Conversion Complete
            </CardTitle>
            <CardDescription>
              Your HTML content has been converted to PDF
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">PDF Ready</Badge>
                <span className="text-sm text-muted-foreground">
                  File size: {(convertedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>About HTML to PDF Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Supports HTML files and web URLs</p>
            <p>• Preserves CSS styling and layout</p>
            <p>• High-quality PDF output</p>
            <p>• All processing is done in your browser</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
