"use client"

import { useState, useMemo, lazy, Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ToolCardWithLoading from '@/components/tool-card-with-loading'
import AdSenseAd from '@/components/adsense-ad'
import { 
  Search, 
  Star,
  Calculator,
  GraduationCap,
  FileText,
  CreditCard,
  FunctionSquare,
  Receipt,
  CheckSquare,
  TrendingUp,
  FileDown,
  QrCode,
  FilePlus,
  FileMinus,
  Archive,
  Lock,
  Image,
  Maximize,
  Video,
  Smile,
  Users,
  Key,
  Lightbulb,
  Ruler,
  DollarSign,
  Home,
  Activity,
  Zap,
  Presentation,
  Table,
  Code,
  PenTool,
  EyeOff,
  GitCompare,
  Unlock
} from 'lucide-react'
import { tools } from '@/lib/tools'

const iconMap = {
  Calculator,
  GraduationCap,
  FileText,
  CreditCard,
  FunctionSquare,
  Receipt,
  CheckSquare,
  TrendingUp,
  FileDown,
  QrCode,
  FilePlus,
  FileMinus,
  Archive,
  Lock,
  Image,
  Maximize,
  Video,
  Smile,
  Users,
  Key,
  Lightbulb,
  Ruler,
  DollarSign,
  Home,
  Activity,
  Zap,
  Presentation,
  Table,
  Code,
  PenTool,
  EyeOff,
  GitCompare,
  Unlock
}

export default function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'study', name: 'Study', count: tools.filter(t => t.category === 'study').length },
    { id: 'business', name: 'Business', count: tools.filter(t => t.category === 'business').length },
    { id: 'file', name: 'File', count: tools.filter(t => t.category === 'file').length },
    { id: 'fun', name: 'Fun', count: tools.filter(t => t.category === 'fun').length },
    { id: 'utility', name: 'Utility', count: tools.filter(t => t.category === 'utility').length },
  ]

  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of free online tools
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* AdSense Ad */}
        <AdSenseAd />

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCardWithLoading key={tool.id} tool={tool} iconMap={iconMap} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No tools found matching your search criteria.
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
