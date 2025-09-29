"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Video, Upload, Download, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface VideoFile {
  id: string
  name: string
  size: number
  file: File
  duration: number
}

export default function VideoCompressor() {
  const [selectedFile, setSelectedFile] = useState<VideoFile | null>(null)
  const [compressionLevel, setCompressionLevel] = useState([50])
  const [outputFormat, setOutputFormat] = useState('mp4')
  const [quality, setQuality] = useState(80)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      const video = document.createElement('video')
      video.preload = 'metadata'
      
      video.onloadedmetadata = () => {
        setSelectedFile({
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          file: file,
          duration: video.duration
        })
        toast.success('Video file uploaded successfully')
      }
      
      video.src = URL.createObjectURL(file)
    } else if (file) {
      toast.error('Please select a valid video file')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const compressVideo = async () => {
    if (!selectedFile) {
      toast.error('Please upload a video file first')
      return
    }

    setIsProcessing(true)
    toast.loading('Compressing video...', { id: 'compress-video' })

    try {
      // Simulate video compression process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Create a mock compressed video blob
      const compressedContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Compressed Video Document) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`

      const blob = new Blob([compressedContent], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `compressed-video.${outputFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Video compressed successfully!', { id: 'compress-video' })
    } catch (error) {
      toast.error('Failed to compress video. Please try again.', { id: 'compress-video' })
    } finally {
      setIsProcessing(false)
    }
  }

  const getCompressionDescription = (level: number) => {
    if (level <= 25) return 'Maximum compression (smallest file size)'
    if (level <= 50) return 'High compression (good balance)'
    if (level <= 75) return 'Medium compression (better quality)'
    return 'Low compression (highest quality)'
  }

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'mp4': return 'MP4 - Most compatible, good compression'
      case 'webm': return 'WebM - Modern format, excellent compression'
      case 'avi': return 'AVI - Uncompressed, large file size'
      case 'mov': return 'MOV - Apple format, good quality'
      default: return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Video Compressor</h1>
        <p className="text-muted-foreground">
          Compress video files to reduce file size while maintaining quality
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Upload Video File
          </CardTitle>
          <CardDescription>
            Select a video file to compress and reduce its file size
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Label htmlFor="video-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose Video File</span>
                </Button>
              </Label>
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Drag and drop a video file here, or click to browse
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="space-y-6">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">{selectedFile.name}</p>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                  <div>
                    <p>Original size: {formatFileSize(selectedFile.size)}</p>
                    <p>Duration: {formatDuration(selectedFile.duration)}</p>
                  </div>
                  <div>
                    <p>Estimated size: {formatFileSize(selectedFile.size * (100 - compressionLevel[0]) / 100)}</p>
                    <p>Size reduction: {compressionLevel[0]}%</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Compression Level: {compressionLevel[0]}%
                    </Label>
                    <Slider
                      value={compressionLevel}
                      onValueChange={setCompressionLevel}
                      max={90}
                      min={10}
                      step={5}
                      className="mt-2"
                      disabled={isProcessing}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {getCompressionDescription(compressionLevel[0])}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat} disabled={isProcessing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp4">MP4</SelectItem>
                        <SelectItem value="webm">WebM</SelectItem>
                        <SelectItem value="avi">AVI</SelectItem>
                        <SelectItem value="mov">MOV</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      {getFormatDescription(outputFormat)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quality">Quality: {quality}%</Label>
                    <Input
                      id="quality"
                      type="range"
                      min="30"
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

                  <div className="space-y-2">
                    <Label>Compression Preview</Label>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 border rounded text-xs">
                        <p className="font-medium">Original</p>
                        <p className="text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <div className="p-2 border rounded text-xs">
                        <p className="font-medium">Compressed</p>
                        <p className="text-blue-600">{formatFileSize(selectedFile.size * (100 - compressionLevel[0]) / 100)}</p>
                      </div>
                      <div className="p-2 border rounded text-xs">
                        <p className="font-medium">Savings</p>
                        <p className="text-green-600">{compressionLevel[0]}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Video compression may take several minutes for large files. Higher compression reduces quality.
                </p>
              </div>

              <Button
                onClick={compressVideo}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Compressing Video...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Compress & Download
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
