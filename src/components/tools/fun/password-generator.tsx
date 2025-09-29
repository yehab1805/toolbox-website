"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Key, RefreshCw, Copy, Download, Shield, Eye, EyeOff } from 'lucide-react'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])

  const generatePassword = () => {
    let charset = ''
    
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) charset += '0123456789'
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, '')
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\'",;.<>]/g, '')
    }

    if (charset.length === 0) {
      toast.error('Please select at least one character type')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
    setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)]) // Keep last 10
    toast.success('Password generated!')
  }

  const copyPassword = () => {
    if (!password) {
      toast.error('No password to copy')
      return
    }
    navigator.clipboard.writeText(password)
    toast.success('Password copied to clipboard!')
  }

  const downloadPasswords = () => {
    if (passwordHistory.length === 0) {
      toast.error('No passwords to download')
      return
    }
    
    const content = passwordHistory.join('\n')
    downloadFile(content, 'passwords.txt', 'text/plain')
    toast.success('Passwords downloaded!')
  }

  const getPasswordStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (pwd.length >= 16) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    
    if (score <= 2) return { level: 'Weak', color: 'bg-red-100 text-red-800' }
    if (score <= 4) return { level: 'Fair', color: 'bg-yellow-100 text-yellow-800' }
    if (score <= 6) return { level: 'Good', color: 'bg-blue-100 text-blue-800' }
    return { level: 'Strong', color: 'bg-green-100 text-green-800' }
  }

  const strength = password ? getPasswordStrength(password) : null

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
        <p className="text-muted-foreground">
          Generate secure random passwords with customizable options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generator Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Password Settings
            </CardTitle>
            <CardDescription>
              Configure your password generation options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Length Setting */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Length: {length}</label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Character Types:</label>
              <div className="space-y-2">
                {[
                  { key: 'uppercase', label: 'Uppercase Letters (A-Z)', enabled: options.uppercase },
                  { key: 'lowercase', label: 'Lowercase Letters (a-z)', enabled: options.lowercase },
                  { key: 'numbers', label: 'Numbers (0-9)', enabled: options.numbers },
                  { key: 'symbols', label: 'Symbols (!@#$%^&*)', enabled: options.symbols }
                ].map((option) => (
                  <label key={option.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={options[option.key as keyof typeof options]}
                      onChange={(e) => setOptions(prev => ({
                        ...prev,
                        [option.key]: e.target.checked
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Advanced Options:</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.excludeSimilar}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      excludeSimilar: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-sm">Exclude similar characters (0, O, 1, l, I)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.excludeAmbiguous}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      excludeAmbiguous: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-sm">Exclude ambiguous characters</span>
                </label>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        {/* Generated Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Generated Password
            </CardTitle>
            <CardDescription>
              Your secure password will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {password ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Password:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="font-mono text-lg break-all">
                    {showPassword ? password : '•'.repeat(password.length)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">Strength:</span>
                    <Badge className={strength?.color}>
                      {strength?.level}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyPassword} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={generatePassword} variant="outline" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Generate Password" to create a secure password.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Password History */}
      {passwordHistory.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Password History</CardTitle>
              <Button onClick={downloadPasswords} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
            <CardDescription>
              Your recent passwords (last 10)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {passwordHistory.map((pwd, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">
                      {showPassword ? pwd : '•'.repeat(pwd.length)}
                    </span>
                    <Badge className={getPasswordStrength(pwd).color}>
                      {getPasswordStrength(pwd).level}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(pwd)
                      toast.success('Password copied!')
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Password Security Tips</CardTitle>
          <CardDescription>
            Best practices for creating and managing secure passwords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Do's</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use at least 12 characters</li>
                <li>• Include uppercase, lowercase, numbers, and symbols</li>
                <li>• Use unique passwords for each account</li>
                <li>• Consider using a password manager</li>
                <li>• Change passwords regularly</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Don'ts</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Don't use personal information</li>
                <li>• Don't use common words or patterns</li>
                <li>• Don't reuse passwords across accounts</li>
                <li>• Don't share passwords with others</li>
                <li>• Don't store passwords in plain text</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
