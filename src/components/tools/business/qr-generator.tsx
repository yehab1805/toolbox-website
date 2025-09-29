"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { QrCode, Download, Copy, RefreshCw, Link, Mail, Phone, Wifi } from 'lucide-react'
import QRCode from 'qrcode'
import toast from 'react-hot-toast'

export default function QRGenerator() {
  const [qrType, setQrType] = useState<'text' | 'url' | 'email' | 'phone' | 'wifi'>('text')
  const [qrData, setQrData] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [qrSize, setQrSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M')

  const generateQR = async () => {
    if (!qrData.trim()) {
      toast.error('Please enter some data')
      return
    }

    try {
      let dataToEncode = qrData

      // Format data based on type
      switch (qrType) {
        case 'url':
          dataToEncode = qrData.startsWith('http') ? qrData : `https://${qrData}`
          break
        case 'email':
          dataToEncode = `mailto:${qrData}`
          break
        case 'phone':
          dataToEncode = `tel:${qrData}`
          break
        case 'wifi':
          // WiFi format: WIFI:T:WPA;S:SSID;P:password;H:false;;
          dataToEncode = `WIFI:T:WPA;S:${qrData};P:password;H:false;;`
          break
        default:
          dataToEncode = qrData
      }

      const options = {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: errorCorrection
      }

      const url = await QRCode.toDataURL(dataToEncode, options)
      setQrCodeUrl(url)
      toast.success('QR Code generated!')
    } catch (error) {
      toast.error('Error generating QR code')
    }
  }

  const downloadQR = () => {
    if (!qrCodeUrl) {
      toast.error('No QR code to download')
      return
    }

    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR Code downloaded!')
  }

  const copyQR = () => {
    if (!qrCodeUrl) {
      toast.error('No QR code to copy')
      return
    }

    // Convert data URL to blob and copy to clipboard
    fetch(qrCodeUrl)
      .then(res => res.blob())
      .then(blob => {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        toast.success('QR Code copied to clipboard!')
      })
      .catch(() => {
        toast.error('Failed to copy QR code')
      })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url': return Link
      case 'email': return Mail
      case 'phone': return Phone
      case 'wifi': return Wifi
      default: return QrCode
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'url': return 'bg-blue-100 text-blue-800'
      case 'email': return 'bg-green-100 text-green-800'
      case 'phone': return 'bg-purple-100 text-purple-800'
      case 'wifi': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlaceholder = () => {
    switch (qrType) {
      case 'url': return 'https://example.com or example.com'
      case 'email': return 'user@example.com'
      case 'phone': return '+1234567890'
      case 'wifi': return 'WiFi Network Name'
      default: return 'Enter your text here'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground">
          Generate QR codes for URLs, text, and contact information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Settings
            </CardTitle>
            <CardDescription>
              Configure your QR code content and appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* QR Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'text', label: 'Text', icon: QrCode },
                  { id: 'url', label: 'URL', icon: Link },
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'phone', label: 'Phone', icon: Phone },
                  { id: 'wifi', label: 'WiFi', icon: Wifi }
                ].map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.id}
                      variant={qrType === type.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQrType(type.id as any)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Data Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Content:</label>
              {qrType === 'text' ? (
                <Textarea
                  placeholder={getPlaceholder()}
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  placeholder={getPlaceholder()}
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                />
              )}
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Size (px):</label>
                <Input
                  type="number"
                  min="100"
                  max="1000"
                  value={qrSize}
                  onChange={(e) => setQrSize(parseInt(e.target.value) || 200)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Error Correction:</label>
                <select
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as any)}
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <Button onClick={generateQR} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={getTypeColor(qrType)}>
                {qrType.toUpperCase()}
              </Badge>
              Generated QR Code
            </CardTitle>
            <CardDescription>
              Your QR code will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrCodeUrl ? (
              <>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={downloadQR} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={copyQR} variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Size: {qrSize}px | Error Correction: {errorCorrection}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your data and click "Generate QR Code" to see your QR code here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* QR Code Types Guide */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Types Guide</CardTitle>
          <CardDescription>
            Understanding different QR code content types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                Text
              </h4>
              <p className="text-xs text-muted-foreground">
                Plain text content. Can be any string of characters.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Link className="h-4 w-4" />
                URL
              </h4>
              <p className="text-xs text-muted-foreground">
                Web links. Automatically opens in browser when scanned.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </h4>
              <p className="text-xs text-muted-foreground">
                Email addresses. Opens email client when scanned.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </h4>
              <p className="text-xs text-muted-foreground">
                Phone numbers. Initiates call when scanned.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                WiFi
              </h4>
              <p className="text-xs text-muted-foreground">
                WiFi network credentials. Connects to network when scanned.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
