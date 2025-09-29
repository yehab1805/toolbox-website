"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Image, Upload, Download, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageFile {
  id: string
  name: string
  size: number
  file: File
  preview: string
}

export default function ImageConverter() {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [outputFormat, setOutputFormat] = useState('png')
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const newFiles: ImageFile[] = []
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          newFiles.push({
            id: Date.now().toString() + i,
            name: file.name,
            size: file.size,
            file: file,
            preview: e.target?.result as string
          })
        }
        reader.readAsDataURL(file)
      } else {
        toast.error(`${file.name} is not an image file`)
      }
    }

    setTimeout(() => {
      setFiles(prev => [...prev, ...newFiles])
      toast.success(`${newFiles.length} image(s) added`)
    }, 100)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const convertImages = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsProcessing(true)
    toast.loading('Converting images...', { id: 'convert-images' })

    try {
      // Simulate image conversion process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mock converted images
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new window.Image()
        
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${file.name.split('.')[0]}.${outputFormat}`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
            }
          }, `image/${outputFormat}`, quality / 100)
        }
        
        img.src = file.preview
      }

      toast.success('Images converted successfully!', { id: 'convert-images' })
    } catch (error) {
      toast.error('Failed to convert images. Please try again.', { id: 'convert-images' })
    } finally {
      setIsProcessing(false)
    }
  }

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'png': return 'PNG - Lossless compression, supports transparency'
      case 'jpg': return 'JPEG - Lossy compression, smaller file size'
      case 'webp': return 'WebP - Modern format, excellent compression'
      case 'gif': return 'GIF - Supports animation, limited colors'
      case 'bmp': return 'BMP - Uncompressed bitmap format'
      default: return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Converter</h1>
        <p className="text-muted-foreground">
          Convert images between different formats (JPG, PNG, WebP, GIF, BMP)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Select multiple images to convert to your desired format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose Images</span>
                </Button>
              </Label>
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Drag and drop images here, or click to browse
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Images to Convert ({files.length})</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiles([])}
                  disabled={isProcessing}
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="border rounded-lg p-3 space-y-2">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="output-format">Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat} disabled={isProcessing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPEG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                      <SelectItem value="bmp">BMP</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {getFormatDescription(outputFormat)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality: {quality}%</Label>
                  <Input
                    id="quality"
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher quality = larger file size
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All images will be converted to {outputFormat.toUpperCase()} format with {quality}% quality.
                </p>
              </div>

              <Button
                onClick={convertImages}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Converting Images...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Convert & Download All
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
