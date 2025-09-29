"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Smile, Upload, Download, RefreshCw, Type, Image as ImageIcon } from 'lucide-react'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState(40)
  const [memeHistory, setMemeHistory] = useState<Array<{
    id: string
    image: string
    topText: string
    bottomText: string
    timestamp: string
  }>>([])
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const generateMeme = () => {
    if (!image) {
      toast.error('Please upload an image first')
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw image
      ctx.drawImage(img, 0, 0)

      // Set text properties
      ctx.fillStyle = textColor
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.font = `bold ${textSize}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'

      // Draw top text
      if (topText) {
        const topY = 20
        ctx.strokeText(topText, canvas.width / 2, topY)
        ctx.fillText(topText, canvas.width / 2, topY)
      }

      // Draw bottom text
      if (bottomText) {
        const bottomY = canvas.height - textSize - 20
        ctx.strokeText(bottomText, canvas.width / 2, bottomY)
        ctx.fillText(bottomText, canvas.width / 2, bottomY)
      }

      // Save to history
      const memeData = {
        id: Date.now().toString(),
        image: canvas.toDataURL(),
        topText,
        bottomText,
        timestamp: new Date().toISOString()
      }
      setMemeHistory(prev => [memeData, ...prev.slice(0, 9)]) // Keep last 10
      
      toast.success('Meme generated!')
    }
    img.src = image
  }

  const downloadMeme = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `meme-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    toast.success('Meme downloaded!')
  }

  const copyMeme = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        toast.success('Meme copied to clipboard!')
      }
    })
  }

  const loadFromHistory = (meme: any) => {
    setImage(meme.image)
    setTopText(meme.topText)
    setBottomText(meme.bottomText)
    toast.success('Meme loaded from history!')
  }

  const clearMeme = () => {
    setImage(null)
    setTopText('')
    setBottomText('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.success('Meme cleared!')
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Meme Generator</h1>
        <p className="text-muted-foreground">
          Create memes by adding text to images
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meme Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="h-5 w-5" />
              Meme Settings
            </CardTitle>
            <CardDescription>
              Upload an image and add your text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Image:</label>
              <div className="flex items-center gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Top Text:</label>
                <Input
                  placeholder="Enter top text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Bottom Text:</label>
                <Input
                  placeholder="Enter bottom text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                />
              </div>
            </div>

            {/* Text Styling */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Text Color:</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Text Size: {textSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={textSize}
                  onChange={(e) => setTextSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={generateMeme} className="w-full" size="lg">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Meme
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={downloadMeme} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={copyMeme} variant="outline">
                  <Type className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              
              <Button onClick={clearMeme} variant="outline" className="w-full">
                Clear Meme
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Meme Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Meme Preview
            </CardTitle>
            <CardDescription>
              Your meme will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {image ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border rounded-lg"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  {topText || bottomText ? 'Your meme is ready!' : 'Add text to create your meme'}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to start creating your meme.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meme History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Memes</CardTitle>
            <CardDescription>
              Your recent meme creations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {memeHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Smile className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No memes created yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {memeHistory.map((meme) => (
                  <div
                    key={meme.id}
                    className="p-3 border rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => loadFromHistory(meme)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={meme.image}
                        alt="Meme"
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {meme.topText || 'No top text'}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {meme.bottomText || 'No bottom text'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(meme.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Meme Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Meme Creation Tips</CardTitle>
          <CardDescription>
            Best practices for creating engaging memes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Text Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Keep text short and punchy</li>
                <li>• Use contrasting colors for readability</li>
                <li>• Top text: setup or question</li>
                <li>• Bottom text: punchline or answer</li>
                <li>• Use bold, clear fonts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Image Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Choose high-quality images</li>
                <li>• Ensure good contrast with text</li>
                <li>• Use recognizable images or faces</li>
                <li>• Consider image composition</li>
                <li>• Keep it relevant to your message</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
