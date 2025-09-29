"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Receipt, Smile } from 'lucide-react'
import { featuredTools } from '@/lib/tools'

const iconMap = {
  Calculator,
  Receipt,
  Smile
}

export default function FeaturedToolsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredTools.map((tool) => {
        const Icon = iconMap[tool.icon as keyof typeof iconMap]
        
        return (
          <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.category}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tool.description}
              </p>
              <Button asChild size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href={tool.path}>
                  Try Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
