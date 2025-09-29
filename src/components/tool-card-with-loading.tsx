"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface ToolCardWithLoadingProps {
  tool: {
    id: string
    name: string
    description: string
    icon: string
    category: string
    path: string
    featured?: boolean
  }
  iconMap: Record<string, any>
}

export default function ToolCardWithLoading({ tool, iconMap }: ToolCardWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const Icon = iconMap[tool.icon as keyof typeof iconMap]

  const handleClick = () => {
    setIsLoading(true)
    // Clear loading state after a delay to show feedback
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {Icon && <Icon className="h-5 w-5" />}
          </div>
          {tool.featured && (
            <Badge variant="default" className="text-xs">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{tool.name}</CardTitle>
        <CardDescription className="text-sm">
          {tool.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {tool.category}
          </Badge>
          <Button 
            asChild 
            size="sm" 
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={handleClick}
            disabled={isLoading}
          >
            <Link href={tool.path}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Loading...
                </>
              ) : (
                'Use Tool'
              )}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
