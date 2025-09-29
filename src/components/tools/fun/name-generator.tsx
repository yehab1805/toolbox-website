"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, RefreshCw, Copy, Download, Baby, Wifi, Zap } from 'lucide-react'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function NameGenerator() {
  const [nameType, setNameType] = useState<'baby' | 'wifi' | 'startup'>('baby')
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const babyNames = {
    male: [
      'Alexander', 'Benjamin', 'Christopher', 'Daniel', 'Ethan', 'Felix', 'Gabriel', 'Henry',
      'Isaac', 'Jackson', 'Kai', 'Liam', 'Mason', 'Noah', 'Oliver', 'Parker', 'Quinn', 'Ryan',
      'Sebastian', 'Theo', 'Vincent', 'William', 'Xavier', 'Yusuf', 'Zachary'
    ],
    female: [
      'Amelia', 'Bella', 'Charlotte', 'Diana', 'Emma', 'Fiona', 'Grace', 'Hannah', 'Isabella',
      'Julia', 'Kate', 'Luna', 'Maya', 'Nora', 'Olivia', 'Penelope', 'Quinn', 'Ruby', 'Sophia',
      'Tessa', 'Uma', 'Violet', 'Willow', 'Xara', 'Yara', 'Zoe'
    ]
  }

  const wifiNames = [
    'FBI Surveillance Van', 'Pretty Fly for a WiFi', 'Bill Wi the Science Fi', 'The LAN Before Time',
    'Drop It Like It\'s Hotspot', 'WiFi and Chill', 'The Internet', '404 Network Not Found',
    'This LAN is My LAN', 'Get Off My LAN', 'WiFi Fighter', 'The Promised LAN', 'Silence of the LANs',
    'Game of Thrones', 'House of the Dragon', 'Breaking Bad', 'The Office', 'Friends', 'Stranger Things',
    'The Matrix', 'Star Wars', 'Marvel Universe', 'DC Comics', 'Pokemon', 'Naruto', 'One Piece'
  ]

  const startupNames = [
    'TechFlow', 'DataVibe', 'CloudSync', 'CodeCraft', 'PixelForge', 'ByteBoost', 'SwiftScale',
    'NexusLab', 'QuantumLeap', 'CyberCore', 'DigitalPulse', 'TechTide', 'CodeWave', 'DataStream',
    'CloudVault', 'PixelPro', 'ByteBridge', 'SwiftMind', 'NexusCore', 'QuantumEdge', 'CyberFlow',
    'DigitalEdge', 'TechPulse', 'CodeFlow', 'DataCore', 'CloudMind', 'PixelEdge', 'ByteFlow'
  ]

  const generateNames = () => {
    let names: string[] = []
    
    switch (nameType) {
      case 'baby':
        const maleNames = babyNames.male.sort(() => Math.random() - 0.5).slice(0, 5)
        const femaleNames = babyNames.female.sort(() => Math.random() - 0.5).slice(0, 5)
        names = [...maleNames, ...femaleNames].sort(() => Math.random() - 0.5)
        break
      case 'wifi':
        names = wifiNames.sort(() => Math.random() - 0.5).slice(0, 10)
        break
      case 'startup':
        names = startupNames.sort(() => Math.random() - 0.5).slice(0, 10)
        break
    }
    
    setGeneratedNames(names)
    toast.success(`${names.length} names generated!`)
  }

  const addToFavorites = (name: string) => {
    if (!favorites.includes(name)) {
      setFavorites(prev => [...prev, name])
      toast.success('Added to favorites!')
    } else {
      toast.error('Already in favorites!')
    }
  }

  const removeFromFavorites = (name: string) => {
    setFavorites(prev => prev.filter(fav => fav !== name))
    toast.success('Removed from favorites!')
  }

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    toast.success('Name copied to clipboard!')
  }

  const copyAllNames = () => {
    const allNames = generatedNames.join('\n')
    navigator.clipboard.writeText(allNames)
    toast.success('All names copied to clipboard!')
  }

  const downloadNames = () => {
    const content = generatedNames.join('\n')
    downloadFile(content, `${nameType}-names.txt`, 'text/plain')
    toast.success('Names downloaded!')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'baby': return Baby
      case 'wifi': return Wifi
      case 'startup': return Zap
      default: return Users
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'baby': return 'bg-pink-100 text-pink-800'
      case 'wifi': return 'bg-blue-100 text-blue-800'
      case 'startup': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Random Name Generator</h1>
        <p className="text-muted-foreground">
          Generate baby names, Wi-Fi names, and startup names
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Name Generator
            </CardTitle>
            <CardDescription>
              Choose the type of names to generate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Name Type:</label>
              <div className="space-y-2">
                {[
                  { id: 'baby', label: 'Baby Names', icon: Baby, description: 'Male & female names' },
                  { id: 'wifi', label: 'Wi-Fi Names', icon: Wifi, description: 'Fun network names' },
                  { id: 'startup', label: 'Startup Names', icon: Zap, description: 'Tech company names' }
                ].map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.id}
                      variant={nameType === type.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setNameType(type.id as any)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            <Button onClick={generateNames} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Names
            </Button>

            {generatedNames.length > 0 && (
              <div className="space-y-2">
                <Button onClick={copyAllNames} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button onClick={downloadNames} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Names */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={getTypeColor(nameType)}>
                {nameType.toUpperCase()}
              </Badge>
              Generated Names
            </CardTitle>
            <CardDescription>
              {generatedNames.length} names generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedNames.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Generate Names" to see random names here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {generatedNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyName(name)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToFavorites(name)}
                        disabled={favorites.includes(name)}
                      >
                        ♥
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-red-500">♥</span>
              Favorites
            </CardTitle>
            <CardDescription>
              {favorites.length} favorite names
            </CardDescription>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <span className="text-red-500 text-2xl mb-2 block">♥</span>
                <p>No favorites yet. Click the heart icon to add names to favorites.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyName(name)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromFavorites(name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Name Categories Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Name Categories</CardTitle>
          <CardDescription>
            Understanding different types of generated names
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Baby className="h-4 w-4" />
                Baby Names
              </h4>
              <p className="text-xs text-muted-foreground">
                Popular and modern names for boys and girls. Mix of traditional and contemporary choices.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Wi-Fi Names
              </h4>
              <p className="text-xs text-muted-foreground">
                Creative and humorous network names. Perfect for home or office Wi-Fi networks.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Startup Names
              </h4>
              <p className="text-xs text-muted-foreground">
                Modern tech company names. Great for startups, apps, and digital products.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
