"use client"

// Force HMR update - ArrowRight issue fix
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { featuredTools } from '@/lib/tools'
import { Loader2 } from 'lucide-react'

// Lazy load the featured tools section - temporarily disabled for HMR fix
// const FeaturedToolsSection = lazy(() => import('./featured-tools-section'))
import FeaturedToolsSection from './featured-tools-section'

// Featured tool card with loading state
function FeaturedToolCard({ tool }: { tool: any }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
  }

  return (
    <Link href={tool.path} onClick={handleClick}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="text-lg">📊</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{tool.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
            </div>
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Force HMR update - clear any cached ArrowRight references
  console.log('HeroSection loaded - ArrowRight issue should be resolved')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero content */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Professional PDF Tools + 50+ Free Online Utilities
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Your Ultimate
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Digital Toolbox
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional PDF processing tools plus 50+ free online utilities for studying, business, file management, and daily tasks. 
              No registration required, no hidden costs.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* Featured tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {featuredTools.map((tool) => (
              <FeaturedToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="#pdf-tools">
                PDF Tools
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="#tools">
                All Tools
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 text-green-600">
                <Zap className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">50+ Tools</div>
              <div className="text-sm text-muted-foreground">Including PDF processing</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 text-blue-600">
                <Shield className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">100% Secure</div>
              <div className="text-sm text-muted-foreground">No data collection</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 text-purple-600">
                <Globe className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">Always Free</div>
              <div className="text-sm text-muted-foreground">No hidden costs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
