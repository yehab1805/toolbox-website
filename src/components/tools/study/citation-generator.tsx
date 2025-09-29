"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FileText, Copy, Download, Book, Globe, File, Newspaper } from 'lucide-react'
import { Citation } from '@/types'
import { downloadFile } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CitationGenerator() {
  const [citationType, setCitationType] = useState<'book' | 'article' | 'website' | 'journal'>('book')
  const [citation, setCitation] = useState<Citation>({
    type: 'book',
    title: '',
    author: '',
    year: '',
    publisher: '',
    url: '',
    volume: '',
    issue: '',
    pages: ''
  })
  const [generatedCitation, setGeneratedCitation] = useState('')

  const updateCitation = (field: keyof Citation, value: string) => {
    setCitation(prev => ({ ...prev, [field]: value }))
  }

  const generateCitation = () => {
    if (!citation.title || !citation.author || !citation.year) {
      toast.error('Please fill in at least title, author, and year')
      return
    }

    let citationText = ''

    if (citationType === 'book') {
      citationText = `${citation.author}. (${citation.year}). ${citation.title}. ${citation.publisher || 'Publisher not specified'}.`
    } else if (citationType === 'article') {
      citationText = `${citation.author}. (${citation.year}). ${citation.title}. ${citation.publisher || 'Journal'}, ${citation.volume || 'Volume'}, ${citation.pages || 'Pages'}.`
    } else if (citationType === 'website') {
      citationText = `${citation.author}. (${citation.year}). ${citation.title}. Retrieved from ${citation.url || 'URL not specified'}`
    } else if (citationType === 'journal') {
      citationText = `${citation.author}. (${citation.year}). ${citation.title}. ${citation.publisher || 'Journal'}, ${citation.volume || 'Volume'}(${citation.issue || 'Issue'}), ${citation.pages || 'Pages'}.`
    }

    setGeneratedCitation(citationText)
    toast.success('Citation generated successfully!')
  }

  const copyCitation = () => {
    navigator.clipboard.writeText(generatedCitation)
    toast.success('Citation copied to clipboard!')
  }

  const downloadCitation = () => {
    downloadFile(generatedCitation, 'citation.txt', 'text/plain')
    toast.success('Citation downloaded!')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return Book
      case 'article': return FileText
      case 'website': return Globe
      case 'journal': return Newspaper
      default: return File
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-800'
      case 'article': return 'bg-green-100 text-green-800'
      case 'website': return 'bg-purple-100 text-purple-800'
      case 'journal': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Citation Generator</h1>
        <p className="text-muted-foreground">
          Generate APA, MLA, and Harvard citations for your academic work
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Citation Details
            </CardTitle>
            <CardDescription>
              Fill in the details to generate your citation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Citation Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Citation Type:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'book', label: 'Book', icon: Book },
                  { id: 'article', label: 'Article', icon: FileText },
                  { id: 'website', label: 'Website', icon: Globe },
                  { id: 'journal', label: 'Journal', icon: Newspaper }
                ].map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.id}
                      variant={citationType === type.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setCitationType(type.id as any)
                        setCitation(prev => ({ ...prev, type: type.id as any }))
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Citation Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="Enter the title"
                  value={citation.title}
                  onChange={(e) => updateCitation('title', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Author *</label>
                <Input
                  placeholder="Enter the author name"
                  value={citation.author}
                  onChange={(e) => updateCitation('author', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Year *</label>
                <Input
                  placeholder="Enter the year"
                  value={citation.year}
                  onChange={(e) => updateCitation('year', e.target.value)}
                />
              </div>

              {citationType === 'book' && (
                <div>
                  <label className="text-sm font-medium">Publisher</label>
                  <Input
                    placeholder="Enter the publisher"
                    value={citation.publisher}
                    onChange={(e) => updateCitation('publisher', e.target.value)}
                  />
                </div>
              )}

              {citationType === 'website' && (
                <div>
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    placeholder="Enter the URL"
                    value={citation.url}
                    onChange={(e) => updateCitation('url', e.target.value)}
                  />
                </div>
              )}

              {(citationType === 'article' || citationType === 'journal') && (
                <>
                  <div>
                    <label className="text-sm font-medium">Journal/Publisher</label>
                    <Input
                      placeholder="Enter journal name"
                      value={citation.publisher}
                      onChange={(e) => updateCitation('publisher', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Volume</label>
                      <Input
                        placeholder="Volume"
                        value={citation.volume}
                        onChange={(e) => updateCitation('volume', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Issue</label>
                      <Input
                        placeholder="Issue"
                        value={citation.issue}
                        onChange={(e) => updateCitation('issue', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pages</label>
                    <Input
                      placeholder="Page numbers"
                      value={citation.pages}
                      onChange={(e) => updateCitation('pages', e.target.value)}
                    />
                  </div>
                </>
              )}

              <Button onClick={generateCitation} className="w-full" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                Generate Citation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={getTypeColor(citationType)}>
                {citationType.toUpperCase()}
              </Badge>
              Generated Citation
            </CardTitle>
            <CardDescription>
              Your formatted citation will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedCitation ? (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <Textarea
                    value={generatedCitation}
                    readOnly
                    className="min-h-[120px] border-0 bg-transparent resize-none"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={copyCitation} variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadCitation} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill in the details and click "Generate Citation" to see your formatted citation here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Citation Format Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Citation Format Guide</CardTitle>
          <CardDescription>
            Understanding different citation styles and their requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">APA Style</h4>
              <p className="text-xs text-muted-foreground">
                Author, A. A. (Year). Title of work. Publisher.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">MLA Style</h4>
              <p className="text-xs text-muted-foreground">
                Author. "Title of Source." Title of Container, Publisher, Date.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Harvard Style</h4>
              <p className="text-xs text-muted-foreground">
                Author, A. (Year) Title of work. Place: Publisher.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
