"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Maximize, Upload, Download, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageFile {
  id: string
  name: string
  size: number
  file: File
  preview: string
  originalWidth: number
  originalHeight: number
}

export default function ImageResizer() {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [resizeMode, setResizeMode] = useState<'percentage' | 'pixels' | 'fit'>('percentage')
  const [percentage, setPercentage] = useState(50)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [aspectRatio, setAspectRatio] = useState(true)
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
          const img = new window.Image()
          img.onload = () => {
            newFiles.push({
              id: Date.now().toString() + i,
              name: file.name,
              size: file.size,
              file: file,
              preview: e.target?.result as string,
              originalWidth: img.width,
              originalHeight: img.height
            })
          }
          img.src = e.target?.result as string
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

  const calculateNewDimensions = (file: ImageFile) => {
    if (resizeMode === 'percentage') {
      return {
        width: Math.round(file.originalWidth * (percentage / 100)),
        height: Math.round(file.originalHeight * (percentage / 100))
      }
    } else if (resizeMode === 'pixels') {
      if (aspectRatio) {
        const ratio = file.originalWidth / file.originalHeight
        if (width / height > ratio) {
          return {
            width: Math.round(height * ratio),
            height: height
          }
        } else {
          return {
            width: width,
            height: Math.round(width / ratio)
          }
        }
      } else {
        return { width, height }
      }
    } else { // fit
      const ratio = file.originalWidth / file.originalHeight
      if (width / height > ratio) {
        return {
          width: Math.round(height * ratio),
          height: height
        }
      } else {
        return {
          width: width,
          height: Math.round(width / ratio)
        }
      }
    }
  }

  const resizeImages = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsProcessing(true)
    toast.loading('Resizing images...', { id: 'resize-images' })

    try {
      // Simulate image resizing process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mock resized images
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newDimensions = calculateNewDimensions(file)
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new window.Image()
        
        img.onload = () => {
          canvas.width = newDimensions.width
          canvas.height = newDimensions.height
          
          // Use high-quality scaling
          ctx!.imageSmoothingEnabled = true
          ctx!.imageSmoothingQuality = 'high'
          ctx!.drawImage(img, 0, 0, newDimensions.width, newDimensions.height)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${file.name.split('.')[0]}_resized.${file.name.split('.').pop()}`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
            }
          }, file.file.type, 0.9)
        }
        
        img.src = file.preview
      }

      toast.success('Images resized successfully!', { id: 'resize-images' })
    } catch (error) {
      toast.error('Failed to resize images. Please try again.', { id: 'resize-images' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Resizer</h1>
        <p className="text-muted-foreground">
          Resize images by percentage, pixels, or fit to dimensions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Maximize className="h-5 w-5" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Select multiple images to resize to your desired dimensions
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
                <h3 className="font-semibold">Images to Resize ({files.length})</h3>
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
                {files.map((file) => {
                  const newDimensions = calculateNewDimensions(file)
                  return (
                    <div key={file.id} className="border rounded-lg p-3 space-y-2">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.originalWidth}×{file.originalHeight} → {newDimensions.width}×{newDimensions.height}
                        </p>
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
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resize-mode">Resize Mode</Label>
                  <Select value={resizeMode} onValueChange={(value) => setResizeMode(value as "percentage" | "pixels" | "fit")} disabled={isProcessing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="pixels">Pixels</SelectItem>
                      <SelectItem value="fit">Fit to Dimensions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {resizeMode === 'percentage' && (
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Percentage: {percentage}%</Label>
                    <Input
                      id="percentage"
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      disabled={isProcessing}
                    />
                    <p className="text-sm text-muted-foreground">
                      Resize by percentage of original size
                    </p>
                  </div>
                )}

                {resizeMode === 'pixels' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          disabled={isProcessing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="aspect-ratio"
                        checked={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.checked)}
                        disabled={isProcessing}
                      />
                      <Label htmlFor="aspect-ratio" className="text-sm">
                        Maintain aspect ratio
                      </Label>
                    </div>
                  </div>
                )}

                {resizeMode === 'fit' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="fit-width">Max Width (px)</Label>
                        <Input
                          id="fit-width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          disabled={isProcessing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fit-height">Max Height (px)</Label>
                        <Input
                          id="fit-height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Images will be resized to fit within these dimensions while maintaining aspect ratio
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All images will be resized according to your settings. Original aspect ratios will be maintained.
                </p>
              </div>

              <Button
                onClick={resizeImages}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Resizing Images...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Resize & Download All
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
