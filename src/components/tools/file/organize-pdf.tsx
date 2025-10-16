"use client"

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Upload, Download, Trash2, GripVertical, Eye } from 'lucide-react'

interface PDFPage {
  id: string
  pageNumber: number
  thumbnail: string
}

export default function OrganizePDF() {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [pages, setPages] = useState<PDFPage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const generateThumbnail = async (pdfDoc: PDFDocument, pageIndex: number): Promise<string> => {
    // Create a simple thumbnail representation
    const page = pdfDoc.getPage(pageIndex)
    const { width, height } = page.getSize()
    
    // Create a canvas-like representation (simplified)
    const canvas = document.createElement('canvas')
    canvas.width = 150
    canvas.height = (150 * height) / width
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#374151'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`Page ${pageIndex + 1}`, canvas.width / 2, canvas.height / 2)
    }
    
    return canvas.toDataURL()
  }

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file')
      return
    }

    setIsProcessing(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      setPdfDoc(pdfDoc)
      setUploadedFileName(file.name)

      // Generate thumbnails for each page
      const pageThumbnails: PDFPage[] = []
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const thumbnail = await generateThumbnail(pdfDoc, i)
        pageThumbnails.push({
          id: `page-${i}`,
          pageNumber: i + 1,
          thumbnail
        })
      }
      setPages(pageThumbnails)
    } catch (error) {
      console.error('Error loading PDF:', error)
      alert('Error loading PDF file')
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const handleDragStart = (e: React.DragEvent, pageId: string) => {
    e.dataTransfer.setData('text/plain', pageId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetPageId: string) => {
    e.preventDefault()
    const draggedPageId = e.dataTransfer.getData('text/plain')
    
    if (draggedPageId === targetPageId) return

    const draggedIndex = pages.findIndex(p => p.id === draggedPageId)
    const targetIndex = pages.findIndex(p => p.id === targetPageId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newPages = [...pages]
    const [draggedPage] = newPages.splice(draggedIndex, 1)
    newPages.splice(targetIndex, 0, draggedPage)

    // Update page numbers
    const updatedPages = newPages.map((page, index) => ({
      ...page,
      pageNumber: index + 1
    }))

    setPages(updatedPages)
  }

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId).map((page, index) => ({
      ...page,
      pageNumber: index + 1
    })))
  }

  const handleExportPDF = async () => {
    if (!pdfDoc || pages.length === 0) return

    setIsProcessing(true)
    try {
      const newPdfDoc = await PDFDocument.create()
      
      // Copy pages in the new order
      for (const page of pages) {
        const originalPageIndex = parseInt(page.id.split('-')[1])
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [originalPageIndex])
        newPdfDoc.addPage(copiedPage)
      }

      const pdfBytes = await newPdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `organized-${uploadedFileName}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>
            Select a PDF file to organize its pages
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
                <FileText className="h-4 w-4" />
                {uploadedFileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pages Display */}
      {pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GripVertical className="h-5 w-5" />
              Organize Pages ({pages.length} pages)
            </CardTitle>
            <CardDescription>
              Drag and drop to reorder pages, or delete unwanted pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, page.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, page.id)}
                  className="relative group border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow bg-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      Page {page.pageNumber}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="aspect-[3/4] bg-gray-100 rounded border flex items-center justify-center">
                    <img 
                      src={page.thumbnail} 
                      alt={`Page ${page.pageNumber}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                    <GripVertical className="h-4 w-4 mr-1" />
                    Drag to reorder
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Section */}
      {pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Organized PDF
            </CardTitle>
            <CardDescription>
              Download your reorganized PDF with the new page order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleExportPDF} 
              disabled={isProcessing || pages.length === 0}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download Organized PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}