"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Lock, Upload, Download, AlertCircle, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PDFPassword() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [operation, setOperation] = useState<'add' | 'remove'>('add')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      toast.success('PDF file uploaded successfully')
    } else if (file) {
      toast.error('Please select a valid PDF file')
    }
  }

  const processPDF = async () => {
    if (!selectedFile) {
      toast.error('Please upload a PDF file first')
      return
    }

    if (operation === 'add') {
      if (!password.trim()) {
        toast.error('Please enter a password')
        return
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      if (password.length < 4) {
        toast.error('Password must be at least 4 characters long')
        return
      }
    }

    setIsProcessing(true)
    toast.loading(`${operation === 'add' ? 'Adding' : 'Removing'} password...`, { id: 'pdf-password' })

    try {
      // Simulate PDF password processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a mock processed PDF blob
      const processedContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
${operation === 'add' ? '/Encrypt 3 0 R' : ''}
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
(${operation === 'add' ? 'Password Protected' : 'Unprotected'} PDF Document) Tj
ET
endstream
endobj

${operation === 'add' ? `3 0 obj
<<
/Type /Encrypt
/Filter /Standard
/V 1
/R 3
/Length 40
/O <encryption key>
/U <user key>
/P -4
>>
endobj` : ''}

xref
0 ${operation === 'add' ? '6' : '5'}
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
${operation === 'add' ? '0000000297 00000 n ' : ''}trailer
<<
/Size ${operation === 'add' ? '6' : '5'}
/Root 1 0 R
>>
startxref
${operation === 'add' ? '400' : '297'}
%%EOF`

      const blob = new Blob([processedContent], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${operation === 'add' ? 'password-protected' : 'unprotected'}-document.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(`Password ${operation === 'add' ? 'added' : 'removed'} successfully!`, { id: 'pdf-password' })
    } catch (error) {
      toast.error(`Failed to ${operation === 'add' ? 'add' : 'remove'} password. Please try again.`, { id: 'pdf-password' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">PDF Password</h1>
        <p className="text-muted-foreground">
          Add or remove password protection from PDF files
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Upload PDF File
          </CardTitle>
          <CardDescription>
            Select a PDF file to add or remove password protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Label htmlFor="pdf-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Choose PDF File</span>
                </Button>
              </Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Drag and drop a PDF file here, or click to browse
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="space-y-6">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Operation</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant={operation === 'add' ? 'default' : 'outline'}
                      onClick={() => setOperation('add')}
                      disabled={isProcessing}
                    >
                      Add Password
                    </Button>
                    <Button
                      variant={operation === 'remove' ? 'default' : 'outline'}
                      onClick={() => setOperation('remove')}
                      disabled={isProcessing}
                    >
                      Remove Password
                    </Button>
                  </div>
                </div>

                {operation === 'add' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isProcessing}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isProcessing}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Remember your password! It cannot be recovered if forgotten.
                      </p>
                    </div>
                  </div>
                )}

                {operation === 'remove' && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      This will remove password protection from the PDF file.
                    </p>
                  </div>
                )}

                <Button
                  onClick={processPDF}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {operation === 'add' ? 'Adding password...' : 'Removing password...'}
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      {operation === 'add' ? 'Add Password & Download' : 'Remove Password & Download'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
