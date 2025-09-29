"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FileDown, Upload, Download, FileText, Table, Trash2 } from 'lucide-react'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function TextToPDF() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [fileType, setFileType] = useState<'text' | 'csv'>('text')
  const [csvData, setCsvData] = useState<string[][]>([])
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      if (fileType === 'csv') {
        parseCSV(text)
      } else {
        setContent(text)
      }
    }
    reader.readAsText(file)
  }

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim())
    if (lines.length === 0) return

    const headers = lines[0].split(',').map(h => h.trim())
    const data = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim())
    )

    setCsvHeaders(headers)
    setCsvData(data)
    toast.success('CSV file parsed successfully!')
  }

  const generatePDF = () => {
    if (!content.trim() && csvData.length === 0) {
      toast.error('Please add some content or upload a file')
      return
    }

    // Simple HTML to PDF conversion simulation
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title || 'Document'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .text-content { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>${title || 'Document'}</h1>
    `

    if (fileType === 'csv' && csvData.length > 0) {
      htmlContent += '<table>'
      htmlContent += '<thead><tr>'
      csvHeaders.forEach(header => {
        htmlContent += `<th>${header}</th>`
      })
      htmlContent += '</tr></thead><tbody>'
      
      csvData.forEach(row => {
        htmlContent += '<tr>'
        row.forEach(cell => {
          htmlContent += `<td>${cell}</td>`
        })
        htmlContent += '</tr>'
      })
      htmlContent += '</tbody></table>'
    } else {
      htmlContent += `<div class="text-content">${content.replace(/\n/g, '<br>')}</div>`
    }

    htmlContent += '</body></html>'

    // For demo purposes, we'll download as HTML
    // In a real implementation, you'd use a library like jsPDF or Puppeteer
    downloadFile(htmlContent, `${title || 'document'}.html`, 'text/html')
    toast.success('Document generated! (HTML format for demo)')
  }

  const addCSVRow = () => {
    const newRow = new Array(csvHeaders.length).fill('')
    setCsvData(prev => [...prev, newRow])
  }

  const removeCSVRow = (index: number) => {
    setCsvData(prev => prev.filter((_, i) => i !== index))
  }

  const updateCSVCell = (rowIndex: number, colIndex: number, value: string) => {
    setCsvData(prev => prev.map((row, i) => 
      i === rowIndex ? row.map((cell, j) => j === colIndex ? value : cell) : row
    ))
  }

  const addCSVColumn = () => {
    const newHeader = `Column ${csvHeaders.length + 1}`
    setCsvHeaders(prev => [...prev, newHeader])
    setCsvData(prev => prev.map(row => [...row, '']))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Text/CSV to PDF Converter</h1>
        <p className="text-muted-foreground">
          Convert text files and CSV data to PDF format
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Input
            </CardTitle>
            <CardDescription>
              Add your content or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type:</label>
              <div className="flex gap-2">
                <Button
                  variant={fileType === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFileType('text')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Text
                </Button>
                <Button
                  variant={fileType === 'csv' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFileType('csv')}
                >
                  <Table className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>

            {/* Document Title */}
            <div>
              <label className="text-sm font-medium">Document Title:</label>
              <Input
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload File:</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept={fileType === 'csv' ? '.csv' : '.txt'}
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Text Content */}
            {fileType === 'text' && (
              <div>
                <label className="text-sm font-medium">Text Content:</label>
                <Textarea
                  placeholder="Enter your text content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            )}

            {/* CSV Content */}
            {fileType === 'csv' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">CSV Data:</label>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addCSVColumn}>
                      Add Column
                    </Button>
                    <Button size="sm" onClick={addCSVRow}>
                      Add Row
                    </Button>
                  </div>
                </div>

                {csvHeaders.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          {csvHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-300 p-2 bg-gray-100">
                              <Input
                                value={header}
                                onChange={(e) => {
                                  const newHeaders = [...csvHeaders]
                                  newHeaders[index] = e.target.value
                                  setCsvHeaders(newHeaders)
                                }}
                                className="border-0 bg-transparent p-1"
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="border border-gray-300 p-1">
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCSVCell(rowIndex, colIndex, e.target.value)}
                                  className="border-0 bg-transparent p-1"
                                />
                              </td>
                            ))}
                            <td className="border border-gray-300 p-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCSVRow(rowIndex)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <Button onClick={generatePDF} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileDown className="h-5 w-5" />
              Document Preview
            </CardTitle>
            <CardDescription>
              Preview your document before conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            {fileType === 'text' && content ? (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold text-lg mb-2">{title || 'Document'}</h3>
                <div className="whitespace-pre-wrap text-sm">{content}</div>
              </div>
            ) : fileType === 'csv' && csvData.length > 0 ? (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold text-lg mb-2">{title || 'CSV Data'}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {csvHeaders.map((header, index) => (
                          <th key={index} className="text-left p-2 font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {row.map((cell, colIndex) => (
                            <td key={colIndex} className="p-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {csvData.length > 5 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      ... and {csvData.length - 5} more rows
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Add content or upload a file to see the preview here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Format Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Formats</CardTitle>
          <CardDescription>
            File types and features supported by the converter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Text Files</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Plain text (.txt)</li>
                <li>• Markdown formatting</li>
                <li>• Line breaks preserved</li>
                <li>• Custom titles and headers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">CSV Files</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Comma-separated values</li>
                <li>• Table format with headers</li>
                <li>• Editable cells and columns</li>
                <li>• Professional table styling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
