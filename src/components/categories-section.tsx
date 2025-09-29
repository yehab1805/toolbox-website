"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Briefcase, 
  File, 
  Heart, 
  Settings,
} from 'lucide-react'
import { categories } from '@/lib/tools'

const categoryIcons = {
  study: BookOpen,
  business: Briefcase,
  file: File,
  fun: Heart,
  utility: Settings,
}

const categoryColors = {
  study: 'from-blue-500 to-cyan-500',
  business: 'from-green-500 to-emerald-500',
  file: 'from-purple-500 to-violet-500',
  fun: 'from-pink-500 to-rose-500',
  utility: 'from-orange-500 to-amber-500',
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect tools for your needs, organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
            const colorClass = categoryColors[category.id as keyof typeof categoryColors]
            
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${colorClass} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.tools.length} tools
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-6">
                    {category.tools.slice(0, 3).map((tool) => (
                      <div key={tool.id} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{tool.name}</span>
                      </div>
                    ))}
                    {category.tools.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{category.tools.length - 3} more tools
                      </div>
                    )}
                  </div>
                  
                  <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href={`/category/${category.id}`}>
                      Explore Category
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
