"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface ToolCardContentProps {
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

export default function ToolCardContent({ tool, iconMap }: ToolCardContentProps) {
  const Icon = iconMap[tool.icon as keyof typeof iconMap]

  return (
    <>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {Icon && <Icon className="h-5 w-5" />}
          </div>
          {tool.featured && (
            <Badge variant="default" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
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
          <Button asChild size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Link href={tool.path}>
                        Use Tool
            </Link>
          </Button>
        </div>
      </CardContent>
    </>
  )
}
